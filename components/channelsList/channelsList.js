import {useContext, useEffect} from "react";
import {channelContext} from "../../state/channelContext";
import {ChannelsListLoaded, ChannelsListLoading} from "./channelsListLoaded";
import {useStatefulXHR} from "../../utils/xhr/useStatefulXHR";
import {getChannels} from "../../data-sources/fetchers/channels";

function ChannelsList() {
    const {setCurrentChannel} = useContext(channelContext)
    const {makeRequest, data: channels, error: channelsError} = useStatefulXHR()

    useEffect(() => {
        makeRequest(() => getChannels()).then()
    }, [])

    useEffect(() => {
        channels && setCurrentChannel(channels[0])
    }, [channels])

    return (
        <>
            {(!channels && !channelsError) && <ChannelsListLoading/>}
            {channels && <ChannelsListLoaded channels={channels}/>}
        </>
    )
}

export {ChannelsList}
