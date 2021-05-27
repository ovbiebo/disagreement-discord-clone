import {useContext, useState} from "react";
import Image from "next/image"
import {serverContext} from "../../state/serverContext";

function ServersListViews({servers}) {
    const {currentServer, setCurrentServer} = useContext(serverContext)
    const [hoveredServer, setHoveredServer] = useState(null)

    return (
        <div className={"py-2"} onMouseLeave={() => setHoveredServer(null)}>
            {servers.map((server) => {
                return (
                    <div
                        key={server.id}
                        className={"pt-3 w-full relative flex items-center justify-center"}
                        onMouseOver={() => setHoveredServer(server)}
                        onClick={() => setCurrentServer(server)}
                    >
                        <div
                            className={`bg-white absolute transition-custom opacity-0 left-0 w-0 h-0
                            ${
                                (hoveredServer === server) && "-left-1 w-2 h-6 opacity-100"
                            }
                            ${
                                (currentServer === server) && "-left-1 w-2 h-10 opacity-100"
                            } 
                            rounded-full`}
                        />
                        <Image
                            src={server.imageURL}
                            width={52}
                            height={52}
                            className={`bg-gray-600 transition-roundness ease-in-out duration-200 ${(hoveredServer === server || currentServer === server) ? "rounded-2xl" : "rounded-4xl"}`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function ServersListLoading({dummyCount = 3}) {
    return (
        <div className={"py-2"}>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index} className={"pt-3 w-full flex items-center justify-center"}>
                            <div
                                className={"bg-gray-800 w-13 h-13 animate-pulse rounded-full"}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export {ServersListViews, ServersListLoading}
