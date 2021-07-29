import {Fragment, useContext, useMemo, useRef, useState} from "react";
import {channelContext} from "../../state/channelContext";
import {Dialog, Disclosure, Transition} from "@headlessui/react";
import {ChevronDownIcon, HashtagIcon, PlusIcon} from "@heroicons/react/outline";
import {VolumeUpIcon} from "@heroicons/react/solid";
import {useCall} from "../../state/call/callContext";
import Image from "next/image";
import {NewChannelForm} from "../forms/new-channel-form";

function ChannelsListLoaded({channels, server}) {
    const {currentChannel, setCurrentChannel} = useContext(channelContext)
    let [isOpen, setIsOpen] = useState(false)
    const newChannel = useRef(null)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

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
                                        onClick={() => {
                                            newChannel.current = {
                                                category: category.category,
                                                serverId: currentChannel.serverId,
                                            }
                                            openModal()
                                        }}
                                    />
                                </div>
                                <Disclosure.Panel>
                                    {category.channels.map((channel) => (
                                            channel.isVoiceChannel
                                                ? <VoiceChannelListItem key={channel.id} channel={channel} server={server}/>
                                                : <div
                                                    key={channel.id}
                                                    className={`${(currentChannel === channel) && "text-white bg-gray-700"} flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                                                    onClick={() => setCurrentChannel(channel)}
                                                >
                                                    <HashtagIcon className={"w-5 h-5 mr-1 flex-shrink-0"}/>
                                                    <p className={"truncate"}>{channel.name}</p>
                                                </div>
                                        )
                                    )}
                                </Disclosure.Panel>
                                {
                                    (!open && currentChannel && category.category === currentChannel.category) &&
                                    (
                                        currentChannel.isVoiceChannel
                                            ? <VoiceChannelListItem channel={currentChannel} server={server}/>
                                            : <div
                                                className={`truncate text-white bg-gray-700 flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white`}
                                            >
                                                <HashtagIcon className={"w-5 h-5 mr-1 flex-shrink-0"}/>
                                                <p className={"truncate"}>{currentChannel.name}</p>
                                            </div>
                                    )
                                }
                            </>
                        )}
                    </Disclosure>
                )
            }
            <CreateChannelDialog isOpen={isOpen} onClose={closeModal} newChannel={newChannel.current}/>
        </>
    )
}

function VoiceChannelListItem({channel, server}) {
    const {initCall, participants} = useCall(channel.id);

    return (
        <>
            <div
                className={`flex items-center mb-1 pl-4 h-8 rounded-md cursor-pointer w-full hover:bg-gray-700 hover:text-white truncate`}
                onClick={() => initCall(server.name, channel.name)}
            >
                <VolumeUpIcon className={"w-4 h-4 mr-2 flex-shrink-0"}/>
                <p className={"truncate"}>{channel.name}</p>
            </div>
            {(participants && (participants.length > 0)) && participants.map((participant) => {
                return <div key={participant.id} className={"flex items-center mb-3 ml-10 pr-4"}>
                    <Image width={24} height={24} src={participant.imageURL} className={"rounded-full"}/>
                    <p className={"ml-2 truncate"}>{participant.name}</p>
                </div>
            })}
        </>
    )
}

function CreateChannelDialog({isOpen, onClose, newChannel}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                open={isOpen}
                className="fixed inset-0 z-30 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={"div"}
                        enter="transition-opacity ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-80"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="mt-4 text-2xl text-center font-bold leading-6"
                            >
                                Create New Channel
                            </Dialog.Title>
                            <NewChannelForm onChannelAdded={onClose} newChannel={newChannel}/>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
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

export
{
    ChannelsListLoaded, ChannelsListLoading
}
