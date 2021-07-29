import {useContext} from "react";
import {callContext} from "../../state/call/callContext";
import {MicrophoneIcon, PhoneMissedCallIcon, VideoCameraIcon} from "@heroicons/react/solid"

function CallStatusBar() {
    const [callState] = useContext(callContext)

    return callState.ongoingCallId &&
        <div className={"p-2 bg-gray-900 mb-1"}>
            <div className={"flex items-center mb-2"}>
                <div className={"flex-1"}>
                    <p>Voice Connected</p>
                </div>
                <PhoneMissedCallIcon className={"h-5 w-5"}/>
            </div>
            <div className={"flex"}>
                <button className={"bg-gray-800 flex w-full rounded p-1 items-center justify-center mr-1"}>
                    <VideoCameraIcon className={"h-5 w-5 mr-2"}/>
                    <p>Video</p>
                </button>
                <button className={"bg-gray-800 flex w-full rounded p-1 items-center justify-center ml-1"}>
                    <MicrophoneIcon className={"h-5 w-5 mr-2"}/>
                    <p>Voice</p>
                </button>
            </div>
        </div>
}

export {CallStatusBar}
