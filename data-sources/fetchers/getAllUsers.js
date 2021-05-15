export const getAllUsers = async () => {
    try {
        const res = await fetch("/api/getAllUsers")
        const users = await res.json()
        if (users.length > 0) {
            return users
        }
        return null
    } catch (error) {
        console.error(error.message);
    }
}
