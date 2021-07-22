import * as actions from "../../utils/constants/actions";

export function joinCall(channelId, userInfo, peerServer, localStream, participants) {
    return {
        type: actions.JOIN_CALL,
        payload: {channelId, userInfo, peerServer, localStream, participants}
    }
}

export function endCall(channelId) {
    return {
        type: actions.END_CALL,
        payload: channelId
    }
}

export function setLocalStream(stream) {
    return {
        type: actions.SET_LOCAL_STREAM,
        payload: stream
    }
}

export function addPeerCall({participant, peerCall}) {
    return {
        type: actions.ADD_PEER_CALL,
        payload: {participant, peerCall}
    }
}

export function removePeerCall(participantId) {
    return {
        type: actions.REMOVE_PEER_CALL,
        payload: participantId
    }
}

export function addRemoteStream(stream, userId) {
    return {
        type: actions.ADD_REMOTE_STREAM,
        payload: {userId, stream}
    }
}

export function removeRemoteStream(userId) {
    return {
        type: actions.REMOVE_REMOTE_STREAM,
        payload: userId
    }
}

export function toggleSpeaker() {
    return {
        type: actions.TOGGLE_SPEAKER
    }
}

export function toggleMic() {
    return {
        type: actions.TOGGLE_MIC,
    }
}

export function toggleVideo() {
    return {
        type: actions.TOGGLE_VIDEO,
    }
}
