import firebase from '../../firebase/clientApp'

async function getChannels(serverId) {
    const db = firebase.firestore()
    try {
        let channelCollection = [];
        // console.info("started fetching channels")
        const channelQuerySnapshot =
            await db
                .collection('channels')
                .where("serverId", "==", `${serverId}`)
                .orderBy('category', 'asc')
                .get()
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