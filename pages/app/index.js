import {ChannelsList} from "../../components/channelsList/channelsList";
import {RoomsList} from "../../components/roomsList";
import {Messages} from "../../components/messages/messages";
import {User} from "../../components/user/user";

function App() {
    return (
        <div className={"relative bg-gray-700 overflow-x-scroll scroll-hidden h-full flex scroll-snap-x"}>
            <section className={"scroll-snap-start flex-shrink-0 w-84"}>
                <div className={"fixed left-0 flex h-full w-full"}>
                    <nav className={"w-20 bg-gray-900 h-full"}>
                        <ChannelsList/>
                    </nav>
                    <div className={"w-64 bg-gray-800 h-full flex flex-col"}>
                        <div className={"flex-1"}>
                            <RoomsList/>
                        </div>
                        <User/>
                    </div>
                </div>
            </section>
            <section className={"scroll-snap-start z-20 w-screen bg-gray-700 flex-shrink-0 lg:flex-1"}>
                <Messages/>
            </section>
            <section className={"scroll-snap-start z-10 flex-shrink-0 w-72 bg-gray-800"}>

            </section>
        </div>
    );
}

export default App