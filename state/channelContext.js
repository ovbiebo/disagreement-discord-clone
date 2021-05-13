import React, {createContext, useContext, useEffect, useState} from 'react'
import {getChannels} from "../data-sources/channels";

const channelContext = createContext()

function ChannelProvider({children}) {
    const [channels, setChannels] = useState([])
    const [currentChannel, setCurrentChannel] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getChannels()
            .then((channels) => {
                setChannels(channels)
                setCurrentChannel(channels[0])
            })
            .catch((error) => {
                setError(error)
            })
    }, [])

    return (
        <channelContext.Provider value={{channels, currentChannel, setCurrentChannel, error}}>
            {children}
        </channelContext.Provider>
    )
}

export {ChannelProvider, channelContext}
