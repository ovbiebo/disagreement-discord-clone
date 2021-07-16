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
        if (state.channelId) {
            // SOCKET EVENT CALLBACKS =====================================================
            socket.on('room_created', async () => {
                console.log('Socket event callback: room_created')

                state.isCaller = true
                setLocalStream(state.mediaConstraints, dispatch).then()
            })

            socket.on('room_joined', async () => {
                console.log('Socket event callback: room_joined')

                setLocalStream(state.mediaConstraints, dispatch).then()
                socket.emit('start_call', state.channelId)
            })

            socket.on('full_room', () => {
                console.log('Socket event callback: full_room')

                alert('The room is full, please try another one')
            })

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                socket.on('room_created', null)
                socket.on('room_joined', null)
                socket.on('full_room', null)
            }

        }
    }, [state.channelId])

    useEffect(() => {
        if (state.channelId) {
            console.log(state)
            // SOCKET EVENT CALLBACKS =====================================================
            socket.on('start_call', async () => {
                    console.log('Socket event callback: start_call')
                    console.log(state.isCaller)

                    if (state.isCaller) {
                        state.localStream && addLocalTracks(peerConnection)
                        peerConnection.ontrack = dispatchSetRemoteStream(dispatch)
                        peerConnection.onicecandidate = sendIceCandidate
                        await createOffer(peerConnection)
                    }
                }
            )

            socket.on('webrtc_offer', async (event) => {
                console.log('Socket event callback: webrtc_offer')

                if (!state.isCaller) {
                    state.localStream && addLocalTracks(peerConnection)
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
                socket.on('start_call', null)
                socket.on('webrtc_offer', null)
                socket.on('webrtc_answer', null)
                socket.on('webrtc_ice_candidate', null)
                peerConnection.onicecandidate = null
            }
        }
    }, [state.localStream, state.remoteStream])


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
