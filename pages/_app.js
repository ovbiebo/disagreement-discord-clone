import '../styles/globals.css';
import UserProvider from '../state/userContext';
import {ChannelProvider} from "../state/channelContext";
import {RoomProvider} from "../state/roomContext";

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <ChannelProvider>
                <RoomProvider>
                    <Component {...pageProps} />
                </RoomProvider>
            </ChannelProvider>
        </UserProvider>
    )
}

export default MyApp
