import firebase from "../../firebase/clientApp";
import {useContext, useEffect, useRef, useState} from "react";
import {serverContext} from "../../state/serverContext";

function useChannels() {
    const {currentServer} = useContext(serverContext)
    const [channels, setChannels] = useState(null)
    const [channelsError, setChannelsError] = useState(false)

    const cache = useRef({})

    useEffect(() => {
        setChannels((currentServer && currentServer.id in cache.current) ? cache.current[currentServer.id] : null)
        if (currentServer) {
            const unsubscriber = firebase.firestore()
                .collection('channels')
                .where("serverId", "==", `${currentServer.id}`)
                .orderBy('category', 'desc')
                .onSnapshot(async (channels) => {
                    let channelsCollection = [];
                    try {
                        channels.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            channelsCollection.push({id: doc.id, ...doc.data()})
                        });
                        if (channelsCollection.length <= 0) {
                            setChannels([])
                        } else {
                            currentServer && (cache.current[currentServer.id] = channelsCollection)
                            setChannels(channelsCollection)
                        }
                    } catch (error) {
                        setChannelsError(error.message)
                    }
                })

            return () => unsubscriber()
        }
    }, [currentServer])

    return {channels, channelsError}
}

export {useChannels};
