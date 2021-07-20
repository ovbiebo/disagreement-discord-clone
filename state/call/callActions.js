import * as actions from "../../utils/constants/actions";

export function joinCall(channelId, user) {
    return {
        type: actions.JOIN_CALL,
        payload: {channelId, user}
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

export function addCall(stream, userId) {
    return {
        type: actions.ADD_REMOTE_STREAM,
        payload: {userId, stream}
    }
}

export function removeCall(userId) {
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
