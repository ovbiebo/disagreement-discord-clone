import React, {createContext, useContext, useEffect, useReducer} from 'react'
import callReducer from "./callReducer";
import {socket} from "../../call-service/callConfig";
import {addRemoteStream, joinCall, removeRemoteStream, setLocalStream} from "./callActions";

const callContext = createContext()

function CallProvider({children}) {
    const callState = {
        breadCrumbs: null,
        channelId: null,
        peerServer: null,
        peers: {},
        mediaConstraints: {
            audio: true,
            video: true,
        },
        localStream: null,
        remoteStreams: [],
        isSpeakerEnabled: true,
        isMicrophoneEnabled: false,
        isVideoEnabled: false,
    }

    const [state, dispatch] = useReducer(callReducer, callState)

    useEffect(() => {
        if (state.channelId) {
            socket.on('user-disconnected', userId => {
                console.log('Socket event callback: user-disconnected')
                if (state.peers[userId]) {
                    state.peers[userId].off('stream')
                    state.peers[userId].close()
                    state.peers[userId].off('close')
                }
            })

            state.peerServer.on('open', id => {
                console.log('Peer server event callback: open')
                socket.emit('join-room', state.channelId, id)
            })

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                socket.off('user-disconnected')
                state.peerServer.off('open')
                console.log("unsubscribed")
            }
        }
    }, [state.channelId])

    useEffect(() => {
        if (state.localStream) {
            state.peerServer.on('call', call => {
                console.log("Peer server event callback: call")
                state.peers[call.peer] = call
                call.answer(state.localStream)
                call.on('stream', (remoteStream) => {
                    console.log('Peer server call received event callback: stream')
                    dispatch(addRemoteStream(remoteStream))
                })
            })

            socket.on('user-connected', userId => {
                console.log('Socket event callback: user-connected')
                connectToNewUser(userId, state.localStream)
            })

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                socket.off('user-connected');
                state.peerServer.off('call')
                console.log("unsubscribed")
            }
        }
    }, [state.localStream])

    function connectToNewUser(userId, stream) {
        const call = state.peerServer.call(userId, stream)
        call.on('stream', remoteStream => {
            console.log('Peer server call sent event callback: stream')
            dispatch(addRemoteStream(remoteStream, userId))
        })
        call.on('close', () => {
            dispatch(removeRemoteStream(userId))
        })

        state.peers[userId] = call
    }

    return (
        <callContext.Provider value={[state, dispatch]}>
            {children}
        </callContext.Provider>
    )
}

export {CallProvider, callContext}

export function useCall() {
    const [state, dispatch] = useContext(callContext)

    async function initCall(channelId, user) {
        try {
            async function createPeer() {
                const {default: Peer} = await import('peerjs')
                return new Peer()
            }

            state.peerServer = await createPeer()
            console.log(state.peerServer)

            let stream = await navigator.mediaDevices.getUserMedia(state.mediaConstraints)
            dispatch(setLocalStream(stream))

            const emitted = socket.emit('join', channelId)
            emitted && dispatch(joinCall(channelId, user))

        } catch (error) {
            console.error(error)
        }
    }

    return {
        initCall
    }
}
