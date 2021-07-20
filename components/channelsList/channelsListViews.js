import {useContext, useMemo} from "react";
import {channelContext} from "../../state/channelContext";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon, HashtagIcon, PlusIcon} from "@heroicons/react/outline";
import {VolumeUpIcon} from "@heroicons/react/solid";
import {callContext, useCall} from "../../state/call/callContext";
import {useUser} from "../../state/userContext";
import Image from "next/image";

function ChannelsListLoaded({channels, addChannel}) {
    const {currentChannel, setCurrentChannel} = useContext(channelContext)
    const categories = useMemo(() => {
        if (channels && channels.length > 0) {
            let categorizedList = [{category: channels[0].category, channels: []}];
            let currentCategoryIndex = 0;
            channels.forEach((channel, index) => {
                if (channel.category !== categorizedList[currentCategoryIndex].category) {
                    currentCategoryIndex++;
                    categorizedList.push(
                        {category: channels[index].category, channels: []}
                    )
                }
                categorizedList[currentCategoryIndex].channels.push(channel)
            })
            return categorizedList
        } else {
            return null
        }
    }, [channels])

    return (
        <>
            {
                categories && categories.map((category) =>
                    <Disclosure key={category.category} as={"div"} className={"mb-5 text-gray-400"}>
                        {({open}) => (
                            <>
                                <div className={"flex items-center mb-2 hover:text-white"}>
                                    <Disclosure.Button
                                        className={"flex flex-1 w-full h-4 items-center focus:outline-none"}>
                                        <ChevronDownIcon
                                            className={`transition-transform mr-1 h-3 w-3 stroke-current ${!open && "transform -rotate-90"}`}/>
                                        <div
                                            className={"text-current uppercase font-medium text-xs"}>{category.category}</div>
                                    </Disclosure.Button>
                                    <PlusIcon
                                        className={`h-5 w-5 stroke-current`}
                                        onClick={() => addChannel({
                                            name: "New Channel",
                                            category: category.category,
                                            serverId: currentChannel.serverId,
                                            isVoiceChannel: true
                                        })}
                                    />
                                </div>
                                <Disclosure.Panel>
                                    {category.channels.map((channel) => (
                                            channel.isVoiceChannel
                                                ? <VoiceChannelListItem key={channel.id} channel={channel}/>
                                                : <div
                                                    key={channel.id}
                                                    className={`${(currentChannel === channel) && "text-white bg-gray-700"} flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                                                    onClick={() => setCurrentChannel(channel)}
                                                >
                                                    <HashtagIcon className={"w-5 h-5 mr-1"}/>
                                                    {channel.name}
                                                </div>
                                        )
                                    )}
                                </Disclosure.Panel>
                                {
                                    (!open && currentChannel && category.category === currentChannel.category) &&
                                    (
                                        currentChannel.isVoiceChannel
                                            ? <VoiceChannelListItem channel={currentChannel}/>
                                            : <div
                                                className={`text-white bg-gray-700 flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                                            >
                                                <HashtagIcon className={"w-5 h-5 mr-1"}/>
                                                {currentChannel.name}
                                            </div>
                                    )
                                }
                            </>
                        )}
                    </Disclosure>
                )
            }
        </>
    )
}

function VoiceChannelListItem({channel}) {
    const [state, dispatch] = useContext(callContext)
    const {user} = useUser();
    const {initCall} = useCall();

    return (
        <>
            <div
                className={`${(state.channelId === channel) && "text-white bg-gray-700"} flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                onClick={() => initCall(channel.id, {name: user.displayName, imageURL: user.photoURL})}
            >
                <VolumeUpIcon className={"w-4 h-4 mr-2"}/>
                {channel.name}
            </div>
            {(channel.participants && (channel.participants.length > 0)) && channel.participants.map((participant, index) => {
                return <div key={index} className={"flex items-center mb-3 ml-10 pr-4"}>
                    <Image width={24} height={24} src={participant.participantImageURL} className={"rounded-full"}/>
                    <p className={"ml-2 truncate"}>{participant.participantName}</p>
                </div>
            })}
        </>
    )
}

function ChannelsListLoading(
    {
        dummyCount = 12
    }
) {
    return (
        <div className={"flex flex-col"}>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index}
                             className={`${(index % 4 !== 0) && "self-end"} animate-pulse h-4 bg-gray-700 w-11/12 rounded-full mb-4`}/>
                    )
                })
            }
        </div>
    )
}

export
{
    ChannelsListLoaded, ChannelsListLoading
}
