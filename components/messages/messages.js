import {useContext} from "react";
import {useMessages} from "../../data-sources/subscribers/messages";
import {channelContext} from "../../state/channelContext";
import {MessagesLoaded, MessagesLoading} from "./messagesViews";
import {HashtagIcon, MenuIcon} from "@heroicons/react/outline";
import TextField from "../common/inputs/text-field";
import {UserGroupIcon} from "@heroicons/react/solid";
import {sendMessage} from "../../data-sources/fetchers/messages";
import {useUser} from "../../state/userContext";

function Messages() {
    const {currentChannel} = useContext(channelContext)
    const {user} = useUser()
    const {messages, messagesError} = useMessages();

    const loading = !messages && !messagesError

    function submitMessage(e) {
        e.preventDefault()
        e.target.message.value && sendMessage(e.target.message.value, currentChannel.id, user.displayName, user.photoURL).then()
        e.target.reset();
    }

    return (
        <div className={"h-full flex flex-col"}>
            <div
                className={"w-full h-12 flex items-center border-b font-medium text-lg border-gray-800 px-4 py-3 text-white"}
            >
                <MenuIcon className={"w-6 h-6 mr-2 text-gray-300 lg:hidden"}/>
                {
                    currentChannel
                        ? <div className={"flex flex-1 items-center"}>
                            <HashtagIcon className={"w-6 h-6 mr-1 text-gray-400"}/>
                            {currentChannel.name}
                        </div>
                        : <div className="animate-pulse h-4 bg-gray-600 rounded-full w-full max-w-xl"/>
                }
                <UserGroupIcon className={"w-6 h-6 text-gray-300 lg:hidden"}/>
            </div>
            <div className={"p-4 pb-0 overflow-y-auto flex-1"}>
                {messagesError && <div>Error loading messages</div>}
                {loading && <MessagesLoading/>}
                {messages && <MessagesLoaded messages={messages}/>}
            </div>
            <div className={"p-4 pt-0 z-10"}>
                <form onSubmit={submitMessage}>
                    <TextField placeholder={"say something"} required type={"message"}/>
                </form>
            </div>
        </div>
    )
}

export {Messages}
