import '../styles/globals.css';
import UserProvider from '../state/userContext';
import {ChannelProvider} from "../state/channelContext";

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <ChannelProvider>
                <Component {...pageProps} />
            </ChannelProvider>
        </UserProvider>
    )
}

export default MyApp
