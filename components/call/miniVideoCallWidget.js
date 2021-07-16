import {useCallback, useContext} from "react";
import {callContext} from "../../state/call/callContext";

function MiniVideoCallWidget() {
    const [state, dispatch] = useContext(callContext);

    const refVideo = useCallback(
        (node) => {
            if (node) node.srcObject = state.localStream;
        },
        [state.localStream],
    );

    return state.localStream && <video className={"h-0"} ref={refVideo} autoPlay playsInline muted/>
}

export {MiniVideoCallWidget}
