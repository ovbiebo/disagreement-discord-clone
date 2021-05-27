import {ServersList} from "../../components/serversList/serversList";
import {ChannelsList} from "../../components/channelsList/channelsList";
import {Messages} from "../../components/messages/messages";
import {User} from "../../components/user/user";
import {UsersList} from "../../components/usersList/usersList";
import Head from "next/head";
import {ServerProvider} from "../../state/serverContext";
import {ChannelProvider} from "../../state/channelContext";

function App() {
    return (
        <ServerProvider>
            <ChannelProvider>
                <div className={"bg-gray-700 overflow-x-scroll scroll-hidden h-full flex scroll-snap-x"}>
                    <Head>
                        <meta name="viewport"
                              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                        <title>Disagreement</title>
                    </Head>
                    <section className={"scroll-snap-start flex-shrink-0 w-84"}>
                        <div className={"absolute left-0 flex h-full w-full"}>
                            <nav className={"w-20 bg-gray-900 h-full"}>
                                <ServersList/>
                            </nav>
                            <div className={"w-64 bg-gray-800 h-full flex flex-col"}>
                                <div className={"flex-1"}>
                                    <ChannelsList/>
                                </div>
                                <User/>
                            </div>
                        </div>
                    </section>
                    <div className={"h-full relative z-10 messages-users-container flex-shrink-0 lg:flex-shrink flex"}>
                        <section
                            className={"scroll-snap-start h-full z-20 bg-gray-700 lg:flex-1"}>
                            <Messages/>
                        </section>
                        <section className={"h-full bg-gray-800 sticky right-0 w-72 flex-shrink-0"}>
                            <UsersList/>
                        </section>
                        <div className={"absolute lg:hidden right-0 scroll-snap-start w-72"}/>
                    </div>
                </div>
            </ChannelProvider>
        </ServerProvider>
    );
}

export default App