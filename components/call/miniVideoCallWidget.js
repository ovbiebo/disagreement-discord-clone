import {useContext} from "react";
import {callContext} from "../../state/call/callContext";
import {Video} from "./video";

function MiniVideoCallWidget() {
    const [state, dispatch] = useContext(callContext);

    return (
        <div className={"fixed z-30 p-16 bottom-0 right-0"}>
            {state.localStream
            && <Video
                srcObject={state.localStream}
                className={"rounded-xl h-48 transform -scale-x-100"}
                autoPlay
                playsInline
                muted
            />}
            {state.remoteStreams && state.remoteStreams.map(
                (remoteStream, index) => <Video
                    key={index}
                    srcObject={remoteStream.stream}
                    className={"rounded-xl h-48 transform -scale-x-100 mt-8"}
                    autoPlay
                    playsInline/>
            )}
        </div>
    )
}

export {MiniVideoCallWidget}
