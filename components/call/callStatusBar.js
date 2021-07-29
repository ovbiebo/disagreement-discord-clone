import {useContext} from "react";
import {callContext} from "../../state/call/callContext";
import {MicrophoneIcon, PhoneMissedCallIcon, VideoCameraIcon} from "@heroicons/react/solid"

function CallStatusBar() {
    const [callState] = useContext(callContext)

    return callState.ongoingCallId &&
        <div className={"p-2 bg-gray-900 mb-1"}>
            <div className={"flex w-full items-center mb-2"}>
                <div className={"flex-1 truncate"}>
                    <p>Voice Connected</p>
                    <p className={"text-sm truncate text-gray-400"}>{callState.breadcrumbs}</p>
                </div>
                <PhoneMissedCallIcon className={"h-5 w-5 flex-shrink-0"}/>
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
