import firebase from '../../firebase/clientApp'

async function sendMessage(body, channelId, senderName, senderImageURL) {
    const db = firebase.firestore()
    try {
        await db.collection("messages").add({
            body,
            channelId,
            senderName,
            senderImageURL,
            sentAt: firebase.firestore.Timestamp.now()
        })
    } catch (error) {
        throw error.message
    }
}

export {sendMessage}