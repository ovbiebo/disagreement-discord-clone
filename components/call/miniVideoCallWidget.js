import {useCallback, useContext} from "react";
import {callContext} from "../../state/call/callContext";

function MiniVideoCallWidget() {
    const [state, dispatch] = useContext(callContext);

    const refLocalVideo = useCallback(
        (node) => {
            if (node) node.srcObject = state.localStream;
        },
        [state.localStream],
    );

    const refRemoteVideo = useCallback(
        (node) => {
            if (node) node.srcObject = state.remoteStream;
        },
        [state.remoteStream],
    );

    return (
        <div className={"flex"}>
            {state.localStream && <video className={"h-0"} ref={refLocalVideo} autoPlay playsInline muted/>}
            {state.remoteStream && <video className={"h-0"} ref={refRemoteVideo} autoPlay playsInline/>}
        </div>
    )
}

export {MiniVideoCallWidget}
