import React, {createContext, useContext, useEffect, useReducer, useRef, useState} from 'react'
import callReducer from "./callReducer";
import {config, socket} from "../../call-service/callConfig";
import {addPeerCall, addRemoteStream, joinCall, removePeerCall, removeRemoteStream} from "./callActions";
import {useUser} from "../userContext";
import {toast} from "react-toastify";

const callContext = createContext()

function CallProvider({children}) {
    const callState = {
        breadcrumbs: null,
        ongoingCallId: null,
        userInfo: null,
        peerServer: null,
        peerCalls: {},
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

        if (state.ongoingCallId) {
            let onRemoteStreamReceived = () => null
            let onPeerCallClosed = () => null;
            let peerCall = null;

            const onUserConnected = (userId, channelId) => {
                if (state.ongoingCallId === channelId) {
                    console.log('Socket event callback: user-connected')
                    socket.emit('send-details-to-new-user', state.ongoingCallId, userId, state.userInfo)
                }
            }

            const onUserDisconnected = (userId, callId) => {
                console.log(callId)
                if (state.ongoingCallId === callId) {
                    console.log('Socket event callback: user-disconnected')
                    if (state.peerCalls[userId]) state.peerCalls[userId].close()
                    dispatch(removePeerCall(userId))
                }
            }

            const onUserJoinedCall = (user, callId) => {
                if (state.ongoingCallId === callId) {
                    console.log('Socket event callback: user-joined-call')
                    const call = state.peerServer.call(user.id, state.localStream)

                    let streamCount = 0
                    const onRemoteStreamReceived = (remoteStream) => {
                        console.log('Peer server call sent event callback: stream')
                        if (streamCount === 1) dispatch(addRemoteStream(remoteStream, call.peer))
                        streamCount++
                    }
                    const onPeerCallClosed = () => {
                        dispatch(removeRemoteStream(call.peer))
                    }
                    call.on('stream', onRemoteStreamReceived)
                    call.on('close', onPeerCallClosed)

                    dispatch(addPeerCall(call))
                }
            }

            const onUserLeftCall = (userId, callId) => {
                if (state.ongoingCallId === callId) {
                    console.log('Socket event callback: user-left-call')
                    if (state.peerCalls[userId]) state.peerCalls[userId].close()
                    dispatch(removePeerCall(userId))
                }
            }

            socket.on('user-connected', onUserConnected)
            socket.on('user-disconnected', onUserDisconnected)
            socket.on('user-joined-call', onUserJoinedCall)
            socket.on('user-left-call', onUserLeftCall)

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                peerCall && peerCall.off('stream', onRemoteStreamReceived)
                peerCall && peerCall.off('close', onPeerCallClosed)
                socket.off('user-connected', onUserConnected);
                socket.off('user-disconnected', onUserDisconnected)
                socket.off('user-joined-call', onUserJoinedCall)
                socket.off('user-left-call', onUserLeftCall)
            }
        }
    })

    useEffect(() => {
        if (state.localStream && state.peerServer) {
            let onRemoteStreamReceived = () => null
            let onPeerCallClosed = () => null;
            let peerCall = null;

            const onReceivedCall = (call) => {
                let streamCount = 0
                onRemoteStreamReceived = (remoteStream) => {
                    console.log('Peer server call sent event callback: stream')
                    if (streamCount === 1) dispatch(addRemoteStream(remoteStream, call.peer))
                    streamCount++
                }
                onPeerCallClosed = () => {
                    dispatch(removeRemoteStream(call.peer))
                }
                console.log("Peer server event callback: call")
                call.answer(state.localStream)
                call.on('stream', onRemoteStreamReceived)
                call.on('close', onPeerCallClosed)
                peerCall = call;
                dispatch(addPeerCall(call))
            }

            state.peerServer.on('call', onReceivedCall)

            // Unsubscribe listeners on unmount
            return function unsubscribe() {
                peerCall && peerCall.off('stream', onRemoteStreamReceived)
                peerCall && peerCall.off('close', onPeerCallClosed)
                state.peerServer.off('call', onReceivedCall)
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

export function useCall(channelId) {
    const {user} = useUser();
    const [state, dispatch] = useContext(callContext)
    const [participants, setParticipants] = useState([])
    const [socketId, setSocketId] = useState(null)

    const joinedCall = useRef(false)

    useEffect(() => {
        socket.emit('join-channel', channelId)
        const onChannelJoined = (userId) => {
            console.log('Socket event callback: channel-joined')
            setSocketId(userId)
        }
        socket.once('channel-joined', onChannelJoined)
        return () => {
            (state.ongoingCallId !== channelId) && socket.emit('leave-channel', channelId)
            socket.off('channel-joined', onChannelJoined)
        }
    }, [channelId, state.ongoingCallId])

    useEffect(() => {
        if (channelId === state.ongoingCallId) {
            setParticipants(participants => [...participants, state.userInfo])
        }
    }, [channelId, state.userInfo, state.ongoingCallId])

    useEffect(() => {
        const onUserDisconnected = (userId, callId) => {
            if (channelId === callId) {
                console.log('Socket event callback: user-disconnected')
                setParticipants(participants.filter((participant) => participant.id !== userId))
            }
        }

        const onReceivedParticipantDetails = (participant, callId) => {
            if (channelId === callId) {
                console.log('Socket event callback: participant-sent-details')
                setParticipants([...participants, participant])
            }
        }

        const onUserJoinedCall = (participant, callId) => {
            if (channelId === callId) {
                console.log('Socket event callback: user-joined-call')
                setParticipants([...participants, participant])
            }
        }

        socket.on('participant-sent-details', onReceivedParticipantDetails)
        socket.on('user-disconnected', onUserDisconnected)
        socket.on('user-joined-call', onUserJoinedCall)

        return function unsubscribe() {
            socket.off('user-disconnected', onUserDisconnected);
            socket.off('participant-sent-details', onReceivedParticipantDetails);
            socket.off('user-joined-call', onUserJoinedCall);
        }
    })

    async function initCall(serverName, channelName) {
        try {
            if (!user) throw new Error("Can't join voice channel without signing in")

            //local stream
            let stream = await navigator.mediaDevices.getUserMedia(state.mediaConstraints)

            //peer server
            async function createPeer(callerId) {
                const {default: Peer} = await import('peerjs')
                return new Peer(callerId, {config: config})
            }

            const peerServer = await createPeer(socketId)

            peerServer.on('open', id => {
                console.log('Peer server event callback: open')
                const callUser = {
                    id: socketId,
                    name: user.displayName,
                    imageURL: user.photoURL
                }
                const emitted = !state.ongoingCallId && socket.emit('join-call', channelId, callUser)
                joinedCall.current = emitted && true;
                setParticipants([])
                emitted && dispatch(joinCall(channelId, callUser, peerServer, stream, `${serverName}/${channelName}`))
            })

        } catch (error) {
            toast.error(error.message)
        }
    }

    return {
        initCall,
        participants
    }
}
