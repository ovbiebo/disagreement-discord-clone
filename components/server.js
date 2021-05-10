import {useContext} from "react";
import {serverContext} from "../state/server-context";

function ServersList() {
    const {servers, currentServer, setCurrentServer, error} = useContext(serverContext)

    return (
        <div>
            {servers.map((server) => {
                return (
                    <div key={server.id} className={"pt-4 px-4 w-full"}>
                        <img src={server.imageURL} className={"bg-gray-600 w-12 h-12 transition-roundness rounded-full hover:rounded-none"}/>
                    </div>
                )
            })}
        </div>
    )
}

export {ServersList}
