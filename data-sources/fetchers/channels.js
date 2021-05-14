import firebase from '../../firebase/clientApp'

async function getChannels() {
    const db = firebase.firestore()
    try {
        let channelCollection = [];
        const channelQuerySnapshot = await db.collection('servers').get()
        channelQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            channelCollection.push({id: doc.id, ...doc.data()})
        });
        if (channelCollection.length <= 0) {
            return null
        }
        return channelCollection
    } catch (error) {
        throw error.message
    }
}

export {getChannels}