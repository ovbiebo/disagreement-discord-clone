import {useUser} from "../../state/userContext";
import Image from "next/image"
import {CogIcon} from "@heroicons/react/solid"
import {ExclamationCircleIcon} from "@heroicons/react/outline"

function User() {
    const {user, loadingUser} = useUser()

    return (
        <div className={"py-3 px-2 bg-gray-900"}>
            <div className={"flex items-center mb-2"}>
                {
                    user
                        ? <Image
                            width={40}
                            height={40}
                            src={user.photoURL || "/"}
                            className={"rounded-full bg-gray-700"}
                        />
                        : loadingUser
                        ? <div className={"w-10 h-10 rounded-full bg-gray-700 animate-pulse mr-3"}/>
                        : <ExclamationCircleIcon className="h-5 w-5"/>
                }
                <p className={"h-full flex-1 text-sm ml-3"}>{user ? user.displayName : !loadingUser && "Not signed in"}</p>
                {user && <CogIcon className="h-5 w-5"/>}
            </div>
            {
                (!user && !loadingUser)
                && <div className={"flex"}>
                    <button className={"bg-gray-800 flex w-full rounded p-1 items-center justify-center mr-1"}>
                        <p>Sign In</p>
                    </button>
                    <button className={"bg-gray-800 flex w-full rounded p-1 items-center justify-center ml-1"}>
                        <p>Sign Up</p>
                    </button>
                </div>
            }
        </div>
    )
}

export
{
    User
}
