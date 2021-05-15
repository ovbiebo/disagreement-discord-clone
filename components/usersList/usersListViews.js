import Image from "next/image"

function UsersListLoaded({users}) {
    return (
        <>
                {
                    users && users.map((user, index) => {
                        return (
                            <div key={index} className={"flex items-center mb-3"}>
                                <Image width={36} height={36} src={user.photoURL} className={"rounded-full"}/>
                                <p className={"ml-3 text-md"}>{user.displayName}</p>
                            </div>
                        )
                    })
                }
        </>
    )
}

function UsersListLoading({dummyCount = 1}) {
    return (
        <>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index} className={"flex items-center mb-3"}>
                            <div className={"rounded-full bg-gray-700 h-9 w-9 animate-pulse"}/>
                            <div className={"ml-3 h-4 bg-gray-700 rounded-full flex-1 animate-pulse"}/>
                        </div>
                    )
                })
            }
        </>
    )
}

export {UsersListLoaded, UsersListLoading}
