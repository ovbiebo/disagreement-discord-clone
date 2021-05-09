// import scrollSnapPolyfill from 'css-scroll-snap-polyfill'
import {useEffect} from "react";

function App() {
    useEffect(() => {
        // scrollSnapPolyfill()
    }, [])

    return (
        <div className={"relative overflow-x-scroll scroll-hidden h-screen flex scroll-snap-x"}>
            <section className={"scroll-snap-start sticky left-0 flex flex-shrink-0"}>
                <nav className={"w-20 bg-gray-900 h-full"}>
                    d
                </nav>
                <div className={"w-64 bg-gray-800 h-full"}>
                    e
                </div>
            </section>
            <section className={"scroll-snap-start z-10 w-screen bg-gray-700 flex-shrink-0 md:flex-1"}>

            </section>
            <section className={"scroll-snap-start flex-shrink-0 w-72 bg-gray-800"}>

            </section>
        </div>
    );
}

export default App