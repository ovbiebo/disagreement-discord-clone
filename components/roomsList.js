import {useContext, useEffect} from "react";
import {channelContext} from "../state/channelContext";
import {getRoomsForChannel} from "../data-sources/rooms";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";

function RoomsList() {
    const {currentChannel, error: channelError} = useContext(channelContext)
    const {makeRequest, data: rooms, error: roomsError} = useStatefulXHR()

    useEffect(() => {
        if (!channelError && currentChannel) {
            makeRequest(() => getRoomsForChannel(currentChannel.id)).then()
        }
    }, [currentChannel])

    const loading = !rooms && !roomsError

    return (
        <div>
            <div className={"w-full border-b font-medium text-md border-gray-900 px-4 py-3 text-white"}>{
                currentChannel ? currentChannel.name : "No server selected"
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
