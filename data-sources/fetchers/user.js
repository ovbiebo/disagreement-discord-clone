import firebase from '../../firebase/clientApp'

const signIn = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            throw error.code
        });
}

const signUp = async (email, password) => {
    try {
        const fakeUserPhoto = await generateRandomPhoto()
        const fakeUsername = await generateRandomName()
        const userCredentials = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
        await userCredentials.user.updateProfile({
            displayName: fakeUsername,
            photoURL: fakeUserPhoto
        })
        return userCredentials.user
    } catch (error) {
        throw error.code
    }
}

async function generateRandomName() {
        return fetch("https://api.fungenerators.com/name/generate?category=superhero&limit=1")
            .then(response => response.json())
            .then(data => data.contents.names[0])
}

async function generateRandomPhoto(){
    return fetch(`https://api.unsplash.com/photos/random/?query='art'&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
        .then(response => response.json())
        .then(data => data["urls"]["thumb"])
}

export {signIn, signUp}
