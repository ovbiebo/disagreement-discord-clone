import {useContext} from "react";
import {useMessages} from "../../data-sources/subscribers/messages";
import {roomContext} from "../../state/roomContext";

function Messages() {
    const {currentRoom} = useContext(roomContext)
    const {messages, messagesError} = useMessages();

    const loading = !messages && !messagesError

    return (
        <div>
            <div
                className={"w-full h-12 flex items-center border-b font-medium text-lg border-gray-800 px-4 py-3 text-white"}>{
                currentRoom
                    ? <div className={"flex"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="gray">
                            <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                        </svg>
                        {currentRoom.name}
                    </div>
                    : <div className="animate-pulse h-4 bg-gray-600 rounded-full w-full max-w-xl"/>
            }</div>
            {messagesError && <div>Error fetching rooms</div>}
            {loading && <div>loading...</div>}
            {messages && messages.map((message) => {
                return (
                    <div key={message.id} className={"pt-4 px-4 w-full"}>
                        <div>{message.body}</div>
                    </div>
                )
            })}
        </div>
    )
}

export {Messages}
