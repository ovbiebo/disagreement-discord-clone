import React, {createContext, useState} from 'react'

const channelContext = createContext()

function ChannelProvider({children}) {
    const [currentChannel, setCurrentChannel] = useState(null)

    return (
        <channelContext.Provider value={{currentChannel, setCurrentChannel}}>
            {children}
        </channelContext.Provider>
    )
}

export {ChannelProvider, channelContext}
