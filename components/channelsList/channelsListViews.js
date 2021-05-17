import {useContext, useMemo} from "react";
import {channelContext} from "../../state/channelContext";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/outline";

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
                categorizedList[currentCategoryIndex].channels.push(
                    <div key={channel.id} className="pb-2 pl-6 w-full" onClick={() => setCurrentChannel(channel)}>
                        {channel.name}
                    </div>
                )
            })
            return categorizedList
        } else {
            return null
        }
    }, [channels])

    return (
        <div>
            {
                categories && categories.map((category) =>
                    <Disclosure key={category.category}>
                        <Disclosure.Button as={"div"}
                                           className={"flex w-full mb-3 h-4 items-center text-gray-400 cursor-pointer"}>
                            <ChevronDownIcon className={"mr-1 h-4 w-4 stroke-current "}/>
                            <div className={"text-gray-400 uppercase font-medium text-xs"}>{category.category}</div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-400">
                            {category.channels}
                        </Disclosure.Panel>
                    </Disclosure>
                )
            }
        </div>
    )
}

function ChannelsListLoading({dummyCount = 12}) {
    return (
        <div className={"flex flex-col"}>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index}
                             className={`${(index % 4 !== 0) && "self-end"} animate-pulse h-4 bg-gray-700 w-11/12 rounded-full mb-3`}/>
                    )
                })
            }
        </div>
    )
}

export {ChannelsListLoaded, ChannelsListLoading}
