import "react-toastify/dist/ReactToastify.css"
import '../styles/globals.css';
import UserProvider from '../state/userContext';
import {ToastContainer} from "react-toastify";

function MyApp({Component, pageProps}) {
    return (
        <UserProvider>
            <Component {...pageProps} />
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                position="top-right"
                newestOnTop
                closeOnClick={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </UserProvider>
    )
}

export default MyApp
