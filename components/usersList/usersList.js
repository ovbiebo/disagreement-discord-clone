import {useEffect} from "react";
import {useStatefulXHR} from "../../utils/xhr/useStatefulXHR";
import {getAllUsers} from "../../data-sources/fetchers/getAllUsers";
import {UsersListLoaded, UsersListLoading} from "./usersListViews";

function UsersList() {
    const {makeRequest, data: users, error: usersError} = useStatefulXHR();

    useEffect(() => {
        makeRequest(getAllUsers).then()
    }, [])

    return (
        <div className={"flex flex-col h-full"}>
            <div
                className={"w-full h-12 flex items-center border-b bg-gray-700 font-medium text-lg border-gray-800 px-4 py-3 text-white"}
            >
                All Users
            </div>
            <div className={"p-4 flex-1 overflow-y-auto"}>
                {usersError && <div>Error</div>}
                {(!usersError && !users) && <UsersListLoading dummyCount={8}/>}
                {users && <UsersListLoaded users={users}/>}
            </div>
        </div>
    )
}

export {UsersList}
