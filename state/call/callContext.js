import React, {createContext, useContext, useEffect, useReducer, useState} from 'react'
import callReducer from "./callReducer";
import {socket} from "../../call-service/callConfig";
import {addPeerCall, addRemoteStream, joinCall, removePeerCall, removeRemoteStream} from "./callActions";
import {useUser} from "../userContext";

const callContext = createContext()

function CallProvider({children}) {
    const callState = {
        breadCrumbs: null,
        channelId: null,
        userInfo: null,
        channels: {},
        peerServer: null,
        peerCalls: {},
        participants: [],
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
            socket.on('user-connected', userId => {
                console.log('Socket event callback: user-connected')
                //sendDetailsToNewUser
                socket.emit('send-details-to-new-user', state.channelId, userId, state.userInfo)
            })

            socket.on('user-disconnected', userId => {
                console.log('Socket event callback: user-disconnected')
                if (state.peerCalls[userId]) state.peerCalls[userId].close()
                dispatch(removePeerCall(userId))
            })

            socket.on('user-joined-call', user => {
                console.log('Socket event callback: user-joined-call')
                const call = state.peerServer.call(user.id, state.localStream)
                console.log(call)
                dispatch(addPeerCall({participant: user, peerCall: call}))
            })

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                socket.off('user-connected');
                socket.off('user-disconnected')
                socket.off('user-joined-call')
            }
        }
    })

    useEffect(() => {
        const peerCalls = Object.entries(state.peerCalls)
        peerCalls.forEach(([userId, peerCall]) => {
            peerCall.on('stream', remoteStream => {
                console.log('Peer server call sent event callback: stream')
                dispatch(addRemoteStream(remoteStream, peerCall.peer))
            })
            peerCall.on('close', () => {
                dispatch(removeRemoteStream(peerCall.peer))
            })
        })
        return () => peerCalls.forEach(([userId, peerCall]) => {
            peerCall.off('stream')
            peerCall.off('close')
        })
    }, [state.peerCalls])

    useEffect(() => {
        if (state.localStream && state.peerServer) {
            state.peerServer.on('call', call => {
                console.log("Peer server event callback: call")
                call.answer(state.localStream)
                dispatch(addPeerCall({participant: null, peerCall: call}))
            })

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                state.peerServer.off('call')
            }
        }
    }, [state.localStream, state.peerServer])

    return (
        <callContext.Provider value={[state, dispatch]}>
            {children}
        </callContext.Provider>
    )
}

export {CallProvider, callContext}

export function useCallWithoutParticipating(channelId) {
    const {user} = useUser();
    const [state, dispatch] = useContext(callContext)
    const [participants, setParticipants] = useState([])
    const [callerId, setCallerId] = useState(null)

    useEffect(() => {
        if (channelId !== state.channelId) {
            socket.emit('join-channel', channelId)
            socket.on('channel-joined', async (userId) => {
                console.log('Socket event callback: channel-joined')
                setCallerId(userId)
            })
        }
        return () => {
            socket.emit('leave-channel', channelId)
            socket.off('channel-joined')
        }
    }, [])

    useEffect(() => {
        socket.on('user-disconnected', userId => {
            console.log('Socket event callback: user-disconnected')
            setParticipants(participants.filter((participant) => participant.id !== userId))
        })

        socket.on('participant-sent-details', (participant) => {
            console.log('Socket event callback: participant-sent-details')
            setParticipants([...participants, participant])
        })

        socket.on('user-joined-call', participant => {
            console.log('Socket event callback: user-joined-call')
            setParticipants([...participants, participant])
        })

        return function unsubscribe() {
            socket.off('user-disconnected');
            socket.off('participant-sent-details');
            socket.off('user-joined-call');
        }
    })

    async function initCall(channelId) {
        try {
            //user info for joining call
            const callUser = {
                id: callerId,
                name: user.displayName,
                imageURL: user.photoURL
            }

            //local stream
            let stream = await navigator.mediaDevices.getUserMedia(state.mediaConstraints)

            //peer server
            async function createPeer(callerId) {
                const {default: Peer} = await import('peerjs')
                return new Peer(callerId)
            }

            const peerServer = await createPeer(callerId)

            peerServer.on('open', id => {
                console.log('Peer server event callback: open')
                const emitted = !state.channelId && socket.emit('join-call', channelId, callUser)
                emitted && dispatch(joinCall(channelId, callUser, peerServer, stream, participants))
            })

        } catch (error) {
            console.error(error)
        }
    }

    return {
        initCall,
        participants
    }
}
