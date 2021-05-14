import firebase from '../../firebase/clientApp'
import {roomContext} from "../../state/roomContext";
import {useContext, useEffect, useState} from "react";

function useMessages() {
    const {currentRoom} = useContext(roomContext)
    const [messages, setMessages] = useState(null)
    const [messagesError, setMessagesError] = useState(false)

    useEffect(() => {
        if (currentRoom) {
            let messagesCollection = [];
            const unsubscriber = firebase.firestore().collection('messages')
                .where("roomId", "==", `${currentRoom.id}`)
                .onSnapshot(async (messages) => {
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
    }, [currentRoom])

    return {messages, messagesError}
}

export {useMessages}