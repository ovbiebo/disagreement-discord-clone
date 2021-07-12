import firebase from '../../firebase/clientApp'

async function createChannel(name, category, isVoiceChannel, serverId) {
    const db = firebase.firestore()
    try {
        await db
            .collection('channels')
            .add(
                {
                    name,
                    category,
                    isVoiceChannel,
                    serverId
                }
            )
    } catch (error) {
        throw error.message
    }
}

export {createChannel}
