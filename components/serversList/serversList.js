import {useContext, useEffect} from "react";
import {serverContext} from "../../state/serverContext";
import {ServersListViews, ServersListLoading} from "./serversListViews";
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
            {servers && <ServersListViews servers={servers}/>}
        </>
    )
}

export {ServersList}