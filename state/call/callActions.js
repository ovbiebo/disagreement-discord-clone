import * as actions from "../../utils/constants/actions";

export function startCall (channelId) {
  return {
    type: actions.START_CALL,
    payload: channelId
  }
}

export function joinCall (channelId) {
  return {
    type: actions.JOIN_CALL,
    payload: channelId
  }
}

export function endCall (channelId) {
  return {
    type: actions.END_CALL,
    payload: channelId
  }
}

export function toggleSpeaker () {
  return {
    type: actions.TOGGLE_SPEAKER
  }
}

export function toggleMic () {
  return {
    type: actions.TOGGLE_MIC,
  }
}

export function toggleVideo () {
  return {
    type: actions.TOGGLE_VIDEO,
  }
}
