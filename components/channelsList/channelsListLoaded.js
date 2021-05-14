import Image from "next/image"

function ChannelsListLoaded({channels}) {
    return (
        <div>
            {channels.map((channel) => {
                return (
                    <div key={channel.id} className={"pt-4 px-4 w-full"}>
                        <Image
                            src={channel.imageURL}
                            width={48}
                            height={48}
                            className={"bg-gray-600 w-12 h-12 transition-roundness rounded-full hover:rounded-xl"}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function ChannelsListLoading() {
    return (
        <>
            <div className={"pt-4 px-4 w-full"}>
                <div
                    className={"bg-gray-800 w-12 h-12 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-4 px-4 w-full"}>
                <div
                    className={"bg-gray-800 w-12 h-12 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-4 px-4 w-full"}>
                <div
                    className={"bg-gray-800 w-12 h-12 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-4 px-4 w-full"}>
                <div
                    className={"bg-gray-800 w-12 h-12 animate-pulse rounded-full"}
                />
            </div>
            <div className={"pt-4 px-4 w-full"}>
                <div
                    className={"bg-gray-800 w-12 h-12 animate-pulse rounded-full"}
                />
            </div>
        </>
    )
}

export {ChannelsListLoaded, ChannelsListLoading}
