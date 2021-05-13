import firebase from '../firebase/clientApp'

async function getRoomsForChannel(channelId) {
    const db = firebase.firestore()
    try {
        let roomCollection = [];
        // console.info("started fetching rooms")
        const roomQuerySnapshot =
            await db
                .collection('rooms')
                .where("serverId", "==", `${channelId}`)
                .get()
        roomQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            roomCollection.push({id: doc.id, ...doc.data()})
        });
        if (!roomCollection) {
            return null
        }
        return roomCollection
    } catch (error) {
        throw error.message
    }
}

export {getRoomsForChannel}