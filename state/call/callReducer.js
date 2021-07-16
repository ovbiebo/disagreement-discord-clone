const log = console.log
import * as actions from "../../utils/constants/actions";

export default function callReducer(state, action) {
    // log(state)
    log(action)
    switch (action.type) {
        case actions.JOIN_CALL: {
            return {
                ...state,
                channelId: action.payload.channelId,
            }
        }
        case actions.END_CALL: {
            return {...state}
        }
        case actions.SET_LOCAL_STREAM: {
            return {...state, localStream: action.payload}
        }
        case actions.SET_REMOTE_STREAM: {
            return {...state, remoteStream: action.payload}
        }
        case actions.TOGGLE_SPEAKER: {
            return {...state, isSpeakerEnabled: !this.state.isSpeakerEnabled}
        }
        case actions.TOGGLE_MIC: {
            return {...state, isMicEnabled: !this.state.isMicEnabled}
        }
        case actions.TOGGLE_VIDEO: {
            return {...state, isVideoEnabled: !this.state.isVideoEnabled}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
