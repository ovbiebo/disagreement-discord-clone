import {auth} from '../../firebase/nodeApp'

export default async function getAllUsers(req, res) {
    const userRecords = (await auth.listUsers(100)).users
    const users = [];

    userRecords.forEach((user) => {
        const {displayName, photoURL} = user.toJSON()
        users.push({displayName, photoURL})
    });

    return res.json(users)
}
