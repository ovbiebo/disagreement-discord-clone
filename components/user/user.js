import {useUser} from "../../state/userContext";
import Image from "next/image"

function User() {
    const {user} = useUser()

    return (
        <div className={"flex items-center py-3 px-2 bg-gray-900"}>
            {
                user
                    ? <Image width={40} height={40} src={user.photoURL || "/"} className={"rounded-full bg-gray-700"}/>
                    : <div className={"w-10 h-10 rounded-full bg-gray-700 animate-pulse"}/>
            }
            <p className={"ml-3 h-full flex-1 text-sm"}>{user && user.displayName}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="#D1D5DB">
                <path fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="#D1D5DB">
                <path fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"/>
            </svg>
        </div>
    )
}

export {User}
