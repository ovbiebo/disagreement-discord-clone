import {useContext, useEffect} from "react";
import {serverContext} from "../state/serverContext";
import {getChannelsForServer} from "../data-sources/fetchers/channels";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {channelContext} from "../state/channelContext";

function ChannelsList() {
    const {currentServer} = useContext(serverContext)
    const {setCurrentChannel} = useContext(channelContext)
    const {makeRequest, data: channels, error: channelsError} = useStatefulXHR()

    useEffect(() => {
        if (currentServer) {
            makeRequest(() => getChannelsForServer(currentServer.id)).then()
        }
    }, [currentServer])

    useEffect(() => {
        channels && setCurrentChannel(channels[0])
    }, [channels])

    const loading = !channels && !channelsError

    return (
        <>
            <div
                className={"w-full h-12 flex items-center border-b font-medium text-lg border-gray-900 px-4 py-3 text-white"}
            >
                {
                    currentServer
                        ? <div className={"flex w-full items-center"}>
                            <div className={"flex-1"}>{currentServer.name}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="#9CA3AF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </div>
                        : <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>
                }
            </div>
            <div className={"p-4"}>
                {channelsError && <div>Error fetching channels</div>}
                {loading && <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>}
                {channels && channels.map((channel) => {
                    return (
                        <div key={channel.id} className={"pb-2 w-full"}>
                            <div>{channel.name}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export
{
    ChannelsList
}
