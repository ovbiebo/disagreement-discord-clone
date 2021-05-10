import '../styles/globals.css';
import UserProvider from '../state/userContext';
import {ServerProvider} from "../state/server-context";

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <ServerProvider>
                <Component {...pageProps} />
            </ServerProvider>
        </UserProvider>
    )
}

export default MyApp
