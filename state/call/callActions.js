import * as actions from "../../utils/constants/actions";
import {socket} from "../../call-service/callConfig";

export function joinCall(channelId, user) {
    const emitted = socket.emit('join', channelId)
    return emitted && {
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

export async function setLocalStream(mediaConstraints, dispatch) {
    try {
        let stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        dispatch({
            type: actions.SET_LOCAL_STREAM,
            payload: stream
        })
    } catch (error) {
        console.error('Could not get user media', error)
    }
}

export function dispatchSetRemoteStream(dispatch) {
    return function setRemoteStream(event) {
        dispatch({
            type: actions.SET_REMOTE_STREAM,
            payload: event.streams[0]
        })
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
