import firebase from '../../firebase/clientApp'
import {channelContext} from "../../state/channelContext";
import {useContext, useEffect, useRef, useState} from "react";

function useMessages() {
    const {currentChannel} = useContext(channelContext)
    const [messages, setMessages] = useState(null)
    const [messagesError, setMessagesError] = useState(false)

    const cache = useRef({})

    useEffect(() => {
        setMessages((currentChannel && currentChannel.id in cache.current) ? cache.current[currentChannel.id] : null)
        if (currentChannel) {
            const unsubscriber = firebase.firestore()
                .collection('messages')
                .where("channelId", "==", `${currentChannel.id}`)
                .orderBy("sentAt", "asc")
                .onSnapshot(async (messages) => {
                    let messagesCollection = [];
                    try {
                        messages.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            messagesCollection.push({id: doc.id, ...doc.data()})
                        });
                        if (messagesCollection.length <= 0) {
                            setMessages([])
                        } else {
                            currentChannel && (cache.current[currentChannel.id] = messagesCollection)
                            setMessages(messagesCollection)
                        }
                    } catch (error) {
                        setMessagesError(error.message)
                    }
                })

            return () => unsubscriber()
        }
    }, [currentChannel])

    return {messages, messagesError}
}

export {useMessages}