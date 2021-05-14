import {useContext, useEffect} from "react";
import {channelContext} from "../state/channelContext";
import {getRoomsForChannel} from "../data-sources/rooms";
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
        <div>
            <div className={"w-full h-12 flex items-center border-b font-medium text-md border-gray-900 px-4 py-3 text-white"}>{
                currentChannel
                    ? <div>{currentChannel.name}</div>
                    : <div className="animate-pulse h-4 bg-gray-700 rounded w-full"/>
            }</div>
            {roomsError && <div>Error fetching rooms</div>}
            {loading && <div>loading...</div>}
            {rooms && rooms.map((room) => {
                return (
                    <div key={room.id} className={"pt-4 px-4 w-full"}>
                        <div>{room.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

export {RoomsList}
