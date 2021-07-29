import firebase from '../../firebase/clientApp'
import {toast} from "react-toastify";

async function sendMessage(body, channel, user) {
    const db = firebase.firestore()
    try {
        if (!user) throw new Error("Can't send message without signing in")
        if (!channel || channel.isVoiceChannel) throw new Error("Can't send message outside a text channel")
        await db.collection("messages").add({
            body,
            channelId: channel.id,
            senderName: user.displayName,
            senderImageURL: user.photoURL,
            sentAt: firebase.firestore.Timestamp.now()
        })
    } catch (error) {
        toast.error(error.message)
    }
}

export {sendMessage}
