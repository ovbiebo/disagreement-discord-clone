import {useContext, useState} from "react";
import Image from "next/image"
import {channelContext} from "../../state/channelContext";

function ChannelsListLoaded({channels}) {
    const {currentChannel, setCurrentChannel} = useContext(channelContext)
    const [hoveredChannel, setHoveredChannel] = useState(null)

    return (
        <div className={"py-2"} onMouseLeave={() => setHoveredChannel(null)}>
            {channels.map((channel) => {
                return (
                    <div
                        key={channel.id}
                        className={"pt-3 w-full relative flex items-center justify-center"}
                        onMouseOver={() => setHoveredChannel(channel)}
                        onClick={() => setCurrentChannel(channel)}
                    >
                        <div
                            className={`bg-white absolute transition-custom opacity-0 left-0 w-0 h-0
                            ${
                                (hoveredChannel === channel) && "-left-1 w-2 h-6 opacity-100"
                            }
                            ${
                                (currentChannel === channel) && "-left-1 w-2 h-10 opacity-100"
                            } 
                            rounded-full`}
                        />
                        <Image
                            src={channel.imageURL}
                            width={52}
                            height={52}
                            className={`bg-gray-600 transition-roundness ease-in-out duration-200 ${(hoveredChannel === channel || currentChannel === channel) ? "rounded-2xl" : "rounded-4xl"}`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function ChannelsListLoading() {
    return (
        <div className={"py-2"}>
            <div className={"pt-3 w-full flex items-center justify-center"}>
                <div
                    className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-3 w-full flex items-center justify-center"}>
                <div
                    className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-3 w-full flex items-center justify-center"}>
                <div
                    className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-3 w-full flex items-center justify-center"}>
                <div
                    className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-3 w-full flex items-center justify-center"}>
                <div
                    className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                />
            </div>
        </div>
    )
}

export {ChannelsListLoaded, ChannelsListLoading}
