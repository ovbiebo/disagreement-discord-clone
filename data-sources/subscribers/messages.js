import firebase from '../../firebase/clientApp'
import {channelContext} from "../../state/channelContext";
import {useContext, useEffect, useState} from "react";

function useMessages() {
    const {currentChannel} = useContext(channelContext)
    const [messages, setMessages] = useState(null)
    const [messagesError, setMessagesError] = useState(false)

    useEffect(() => {
        setMessages(null)
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