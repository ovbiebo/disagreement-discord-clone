import firebase from '../../firebase/clientApp'

const signIn = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            throw error.message
        });
}

const signUp = async (email, password) => {
    try {
        const fakeUserPhoto = await generateRandomPhoto()
        const fakeUsername = await generateRandomName()
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                return userCredentials.user.updateProfile({
                    displayName: fakeUsername,
                    photoURL: fakeUserPhoto
                })
            })
    } catch (error) {
        throw error.message
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