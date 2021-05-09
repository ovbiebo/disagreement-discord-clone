import '../styles/globals.css';
import UserProvider from '../state/userContext';

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    )
}

export default MyApp
