import {useContext, useEffect} from "react";
import {serverContext} from "../../state/serverContext";
import {getChannels} from "../../data-sources/fetchers/channels";
import {useStatefulXHR} from "../../utils/xhr/useStatefulXHR";
import {channelContext} from "../../state/channelContext";
import {PlusIcon} from "@heroicons/react/outline";
import {ChannelsListLoaded, ChannelsListLoading} from "./channelsListViews";

function ChannelsList() {
    const {currentServer} = useContext(serverContext)
    const {setCurrentChannel} = useContext(channelContext)
    const {makeRequest, data: channels, error: channelsError} = useStatefulXHR()

    useEffect(() => {
        if (currentServer) {
            makeRequest(() => getChannels(currentServer.id)).then()
        }
    }, [currentServer])

    useEffect(() => {
        channels && setCurrentChannel(channels[0])
    }, [channels])

    const loading = !channels && !channelsError

    return (
        <>
            <div
                className={"w-full h-12 flex items-center border-b border-gray-900 px-4 py-3 text-white"}
            >
                {
                    currentServer
                        ? <div className={"flex w-full items-center"}>
                            <h3 className={"flex-1 text-lg font-medium"}>{currentServer.name}</h3>
                            <PlusIcon className="h-6 w-6 stroke-current text-gray-400"/>
                        </div>
                        : <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>
                }
            </div>
            <div className={"py-4 px-2"}>
                {channelsError && <div>Error fetching channels</div>}
                {loading && <ChannelsListLoading/>}
                {channels && <ChannelsListLoaded channels={channels}/>}
            </div>
        </>
    )
}

export {ChannelsList}
