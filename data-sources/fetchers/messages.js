import firebase from '../../firebase/clientApp'

async function sendMessage(body, channelId, senderId) {
    const db = firebase.firestore()
    try {
        await db.collection("messages").add({
            body,
            channelId,
            senderId,
            sentAt: firebase.firestore.Timestamp.fromDate(new Date())
        })
    } catch (error) {
        throw error.message
    }
}

export {sendMessage}