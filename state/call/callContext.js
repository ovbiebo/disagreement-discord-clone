import React, {createContext, useEffect, useReducer} from 'react'
import callReducer from "./callReducer";
import {peerConnection, socket} from "../../call-service/callConfig";
import {dispatchSetRemoteStream, setLocalStream} from "./callActions";

const callContext = createContext()

function CallProvider({children}) {
    const callState = {
        breadCrumbs: null,
        channelId: null,
        mediaConstraints: {
            audio: true,
            video: false,
        },
        localStream: null,
        remoteStream: null,
        isCaller: false,
        isConnected: false,
        isSpeakerEnabled: true,
        isMicrophoneEnabled: false,
        isVideoEnabled: false,
    }

    const [state, dispatch] = useReducer(callReducer, callState)

    useEffect(() => {
        // SOCKET EVENT CALLBACKS
        socket.on('room_created', async () => {
            console.log('Socket event callback: room_created')

            state.isCaller = true
            await setLocalStream(state.mediaConstraints, dispatch).then()
        })

        socket.on('room_joined', async () => {
            console.log('Socket event callback: room_joined')

            await setLocalStream(state.mediaConstraints, dispatch).then()
            socket.emit('start_call', state.channelId)
        })

        socket.on('full_room', () => {
            console.log('Socket event callback: full_room')

            alert('The room is full, please try another one')
        })

        socket.on('start_call', async () => {
                console.log('Socket event callback: start_call')

                if (state.isCaller) {
                    addLocalTracks(peerConnection)
                    peerConnection.ontrack = dispatchSetRemoteStream(dispatch)
                    peerConnection.onicecandidate = sendIceCandidate
                    await createOffer(peerConnection)
                }
            }
        )

        socket.on('webrtc_offer', async (event) => {
            console.log('Socket event callback: webrtc_offer')

            if (!state.isCaller) {
                addLocalTracks(peerConnection)
                peerConnection.ontrack = dispatchSetRemoteStream(dispatch)
                peerConnection.onicecandidate = sendIceCandidate
                peerConnection.setRemoteDescription(new RTCSessionDescription(event)).then()
                await createAnswer(peerConnection)
            }
        })

        socket.on('webrtc_answer', (event) => {
            console.log('Socket event callback: webrtc_answer')

            peerConnection.setRemoteDescription(new RTCSessionDescription(event)).then()
        })

        socket.on('webrtc_ice_candidate', (event) => {
            console.log('Socket event callback: webrtc_ice_candidate')

            // ICE candidate configuration.
            let candidate = new RTCIceCandidate({
                sdpMLineIndex: event.label,
                candidate: event.candidate,
            })
            peerConnection.addIceCandidate(candidate).then()
        })

        // Unsubscribe listeners on unmount
        return function unsubscribe() {
            socket.off('room_created');
            socket.off('room_joined');
            socket.off('full_room');
            socket.off('start_call');
            socket.off('webrtc_offer');
            socket.off('webrtc_answer');
            socket.off('webrtc_ice_candidate');
            console.log("unsubscribed")
        }
    })

    // FUNCTIONS ==================================================================
    function addLocalTracks(rtcPeerConnection) {
        state.localStream.getTracks().forEach((track) => {
            rtcPeerConnection.addTrack(track, state.localStream)
        })
    }

    async function createOffer(rtcPeerConnection) {
        let sessionDescription
        try {
            sessionDescription = await rtcPeerConnection.createOffer()
            rtcPeerConnection.setLocalDescription(sessionDescription).then()
        } catch (error) {
            console.error(error)
        }

        socket.emit('webrtc_offer', {
            type: 'webrtc_offer',
            sdp: sessionDescription,
            channelId: state.channelId,
        })
    }

    async function createAnswer(rtcPeerConnection) {
        let sessionDescription
        try {
            sessionDescription = await rtcPeerConnection.createAnswer()
            rtcPeerConnection.setLocalDescription(sessionDescription).then()
        } catch (error) {
            console.error(error)
        }

        socket.emit('webrtc_answer', {
            type: 'webrtc_answer',
            sdp: sessionDescription,
            channelId: state.channelId,
        })
    }

    function sendIceCandidate(event) {
        console.log("sendIceCandidate called")
        if (event.candidate) {
            socket.emit('webrtc_ice_candidate', {
                channelId: state.channelId,
                label: event.candidate.sdpMLineIndex,
                candidate: event.candidate.candidate,
            })
        }
    }

    return (
        <callContext.Provider value={[state, dispatch]}>
            {children}
        </callContext.Provider>
    )
}

export {CallProvider, callContext}