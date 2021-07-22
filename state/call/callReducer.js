const log = console.log
import * as actions from "../../utils/constants/actions";

export default function callReducer(state, action) {
    // log(state)
    log(action)
    switch (action.type) {
        case actions.JOIN_CALL: {
            return {
                ...state,
                participants: [...state.participants, ...action.payload.participants],
                userInfo: action.payload.userInfo,
                channelId: action.payload.channelId,
                peerServer: action.payload.peerServer,
                localStream: action.payload.localStream,
            }
        }
        case actions.END_CALL: {
            return {...state}
        }
        case actions.SET_LOCAL_STREAM: {
            return {...state, localStream: action.payload}
        }
        case actions.ADD_PEER_CALL: {
            return {
                ...state,
                participants: [...state.participants, action.payload.participant && action.payload.participant],
                peerCalls: {...state.peerCalls, [action.payload.peerCall.peer]: action.payload.peerCall}
            }
        }
        case actions.REMOVE_PEER_CALL: {
            const participants = state.participants.filter((participant) => participant.id !== action.payload)
            const peerCalls = {...state.peerCalls}
            delete peerCalls[action.payload]
            return {...state, participants, peerCalls}
        }
        case actions.ADD_REMOTE_STREAM: {
            return {...state, remoteStreams: [...state.remoteStreams, action.payload]}
        }
        case actions.REMOVE_REMOTE_STREAM: {
            const remoteStreamsReducer = (accumulator, currentStream) => {
                currentStream.userId !== action.payload && accumulator.push({...currentStream})
                return accumulator
            }

            return {...state, remoteStreams: state.remoteStreams.reduce(remoteStreamsReducer, [])}
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
