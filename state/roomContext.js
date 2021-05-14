import React, {createContext, useState} from 'react'

const roomContext = createContext()

function RoomProvider({children}) {
    const [currentRoom, setCurrentRoom] = useState(null)

    return (
        <roomContext.Provider value={{currentRoom, setCurrentRoom}}>
            {children}
        </roomContext.Provider>
    )
}

export {RoomProvider, roomContext}
