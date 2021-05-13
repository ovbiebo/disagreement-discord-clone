import {useContext, useEffect} from "react";
import {channelContext} from "../state/channelContext";

function ChannelsList() {
    const {channels, currentChannel, setCurrentChannel, error} = useContext(channelContext)

    // useEffect(() => {
    //     console.info(channels)
    //     console.info(currentChannel)
    // }, [channels])

    return (
        <div>
            {channels.map((channel) => {
                return (
                    <div key={channel.id} className={"pt-4 px-4 w-full"}>
                        <img
                            src={channel.imageURL}
                            className={"bg-gray-600 w-12 h-12 transition-roundness rounded-full hover:rounded-xl"}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export {ChannelsList}
