import {useContext, useEffect} from "react";
import {serverContext} from "../../state/serverContext";
import {channelContext} from "../../state/channelContext";
import {ChannelsListLoaded, ChannelsListLoading} from "./channelsListViews";
import {useChannels} from "../../data-sources/subscribers/channels";

function ChannelsList() {
    const {currentServer} = useContext(serverContext)
    const {setCurrentChannel} = useContext(channelContext)
    const {channels, channelsError} = useChannels()

    const loading = !channels && !channelsError

    useEffect(() => {
        channels ? setCurrentChannel(channels[0]) : setCurrentChannel(null)
    }, [channels])

    return (
        <>
            <div
                className={"w-full h-12 flex items-center border-b border-gray-900 px-4 py-3 text-white"}
            >
                {
                    currentServer
                        ? <div className={"flex w-full items-center"}>
                            <h3 className={"flex-1 text-lg font-medium"}>{currentServer.name}</h3>
                        </div>
                        : <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>
                }
            </div>
            <div className={"py-4 px-2 flex-1 overflow-y-auto"}>
                {channelsError && <div>Error fetching channels</div>}
                {loading && <ChannelsListLoading/>}
                {channels && <ChannelsListLoaded channels={channels} server={currentServer}/>}
            </div>
        </>
    )
}

export {ChannelsList}
