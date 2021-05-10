import {ServersList} from "../../components/server";

function App() {
    return (
        <div className={"relative bg-gray-700 overflow-x-scroll scroll-hidden h-full flex scroll-snap-x"}>
            <section className={"scroll-snap-start flex-shrink-0 w-84"}>
                <div className={"fixed left-0 flex h-full w-full"}>
                    <nav className={"w-20 bg-gray-900 h-full"}>
                        <ServersList/>
                    </nav>
                    <div className={"w-64 bg-gray-800 h-full"}/>
                </div>
            </section>
            <section className={"scroll-snap-start z-20 w-screen bg-gray-700 flex-shrink-0 lg:flex-1"}>

            </section>
            <section className={"scroll-snap-start z-10 flex-shrink-0 w-72 bg-gray-800"}>

            </section>
        </div>
    );
}

export default App