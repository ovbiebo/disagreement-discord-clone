import {useContext, useMemo} from "react";
import {channelContext} from "../../state/channelContext";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon, HashtagIcon} from "@heroicons/react/outline";

function ChannelsListLoaded({channels}) {
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
                    <Disclosure key={category.category} as={"div"} className={"mb-6 text-gray-400"}>
                        <Disclosure.Button className={"flex w-full mb-2 h-4 items-center focus:outline-none"}>
                            <ChevronDownIcon className={"mr-1 h-4 w-4 stroke-current "}/>
                            <div className={"text-gray-400 uppercase font-medium text-sm"}>{category.category}</div>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            {category.channels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className={`${(currentChannel === channel) && "text-white bg-gray-700"} flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                                    onClick={() => setCurrentChannel(channel)}
                                >
                                    <HashtagIcon className={"w-5 h-5 mr-1"}/>
                                    {channel.name}
                                </div>
                            ))}
                        </Disclosure.Panel>
                    </Disclosure>
                )
            }
        </>
    )
}

function ChannelsListLoading({dummyCount = 12}) {
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

export {ChannelsListLoaded, ChannelsListLoading}
