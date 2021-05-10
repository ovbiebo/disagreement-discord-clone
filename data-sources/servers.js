import firebase from '../firebase/clientApp'

async function getServers() {
    const db = firebase.firestore()
    try {
        let serverCollection = [];
        const serverQuerySnapshot = await db.collection('servers').get()
        serverQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            serverCollection.push({id: doc.id, ...doc.data()})
        });
        if (!serverCollection) {
            return null
        }
        return serverCollection
    } catch (error) {
        throw error.message
    }
}

export {getServers}