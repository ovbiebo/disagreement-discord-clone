import firebase from '../../firebase/clientApp'

async function getServers() {
    const db = firebase.firestore()
    try {
        let serverCollection = [];
        const channelQuerySnapshot = await db.collection('servers').get()
        channelQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            serverCollection.push({id: doc.id, ...doc.data()})
        });
        if (serverCollection.length <= 0) {
            return null
        }
        return serverCollection
    } catch (error) {
        throw error.message
    }
}

export {getServers}