import React, {createContext, useEffect, useState} from 'react'
import {getServers} from "../data-sources/servers";

const serverContext = createContext()

function ServerProvider({children}) {
    const [servers, setServers] = useState([])
    const [currentServer, setCurrentServer] = useState()
    const [error, setError] = useState([])

    useEffect(() => {
        getServers()
            .then((servers) => {
                setServers(servers)
            })
            .catch((error) => {
                setError(error)
            })
    }, [])

    return (
        <serverContext.Provider value={{servers, currentServer, setCurrentServer, error}}>
            {children}
        </serverContext.Provider>
    )
}

export {ServerProvider, serverContext}
