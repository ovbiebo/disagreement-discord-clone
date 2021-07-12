// const log = console.log
import * as actions from "../../utils/constants/actions";

export default function callReducer(state, action) {
    switch (action.type) {
        case actions.START_CALL: {
            return {...state, channelId: action.payload}
        }
        case actions.JOIN_CALL: {
            return {...state}
        }
        case actions.END_CALL: {
            return {...state}
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
