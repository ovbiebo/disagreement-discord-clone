import {useContext, useEffect} from "react";
import {channelContext} from "../state/channelContext";
import {getRoomsForChannel} from "../data-sources/fetchers/rooms";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {roomContext} from "../state/roomContext";

function RoomsList() {
    const {currentChannel} = useContext(channelContext)
    const {setCurrentRoom} = useContext(roomContext)
    const {makeRequest, data: rooms, error: roomsError} = useStatefulXHR()

    useEffect(() => {
        if (currentChannel) {
            makeRequest(() => getRoomsForChannel(currentChannel.id)).then()
        }
    }, [currentChannel])

    useEffect(() => {
        rooms && setCurrentRoom(rooms[0])
    }, [rooms])

    const loading = !rooms && !roomsError

    return (
        <>
            <div
                className={"w-full h-12 flex items-center border-b font-medium text-lg border-gray-900 px-4 py-3 text-white"}
            >
                {
                    currentChannel
                        ? <div>{currentChannel.name}</div>
                        : <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>
                }
            </div>
            <div className={"p-4"}>
                {roomsError && <div>Error fetching rooms</div>}
                {loading && <div className="animate-pulse h-4 bg-gray-700 rounded-full w-full"/>}
                {rooms && rooms.map((room) => {
                    return (
                        <div key={room.id} className={"pb-2 w-full"}>
                            <div>{room.name}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export {RoomsList}
