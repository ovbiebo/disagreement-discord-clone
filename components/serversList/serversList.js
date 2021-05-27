import {useContext, useEffect} from "react";
import {serverContext} from "../../state/serverContext";
import {ServersListLoaded, ServersListLoading} from "./serversListLoaded";
import {useStatefulXHR} from "../../utils/xhr/useStatefulXHR";
import {getServers} from "../../data-sources/fetchers/servers";

function ServersList() {
    const {setCurrentServer} = useContext(serverContext)
    const {makeRequest, data: servers, error: serversError} = useStatefulXHR()

    useEffect(() => {
        makeRequest(() => getServers()).then()
    }, [])

    useEffect(() => {
        servers && setCurrentServer(servers[0])
    }, [servers])

    return (
        <>
            {(!servers && !serversError) && <ServersListLoading/>}
            {servers && <ServersListLoaded servers={servers}/>}
        </>
    )
}

export {ServersList}
