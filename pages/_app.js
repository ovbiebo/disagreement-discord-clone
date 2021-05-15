import '../styles/globals.css';
import UserProvider from '../state/userContext';
import {ServerProvider} from "../state/serverContext";
import {ChannelProvider} from "../state/channelContext";

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <ServerProvider>
                <ChannelProvider>
                    <Component {...pageProps} />
                </ChannelProvider>
            </ServerProvider>
        </UserProvider>
    )
}

export default MyApp
