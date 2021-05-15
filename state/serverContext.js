import React, {createContext, useState} from 'react'

const serverContext = createContext()

function ServerProvider({children}) {
    const [currentServer, setCurrentServer] = useState(null)

    return (
        <serverContext.Provider value={{currentServer, setCurrentServer}}>
            {children}
        </serverContext.Provider>
    )
}

export {ServerProvider, serverContext}
