import {LockClosedIcon} from '@heroicons/react/solid'
import Link from "next/link"
import {Dropdown} from "../common/inputs/dropdown";
import TextField from "../common/inputs/text-field";
import {useRouter} from "next/router";
import {signUp} from "../../data-sources/fetchers/user";
import {LoadingSpinner} from "../common/indicators/loadingSpinner";
import {useState} from "react";
import {useUser} from "../../state/userContext";

const SignInForm = () => {
    const router = useRouter()
    const [signingUp, setSigningUp] = useState(false)
    const [error, setError] = useState({email: null, password: null})
    const {setUser} = useUser()

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setSigningUp(true)
            const {uid, displayName, email, photoURL} = await signUp(e.target.email.value, e.target.password.value)
            setUser({uid, displayName, email, photoURL})
            await router.push("/app")
        } catch (error) {
            setSigningUp(false)
            if (error === 'auth/weak-password') {
                setError({...error, password: 'The password is too weak.'})
            } else if (error === 'auth/email-already-in-use') {
                setError({...error, email: 'Email already in use.'})
            } else {
                setError(error)
            }
        }
    }

    return (
        <form className="mt-4" action="#" method="POST" onSubmit={submitForm}>
            <div className="rounded-md shadow-sm">
                <div>
                    <label htmlFor="email-address" className={`text-xs ${!error.email ? "text-gray-400" : "text-red-500"} flex`}>
                        <p className={"font-medium uppercase mr-2"}>Email address</p>
                        {error.email && <p className={"font-light"}>{`- ${error.email}`}</p>}
                    </label>
                    <TextField type={"email"} required/>
                </div>
                <div className={"mt-2"}>
                    <label htmlFor="password" className={`text-xs ${!error.password ? "text-gray-400" : "text-red-500"} flex`}>
                        <p className={"font-medium uppercase mr-2"}>Password</p>
                        {error.password && <p className={"font-light"}>{`- ${error.password}`}</p>}
                    </label>
                    <TextField type={"password"} required/>
                </div>
            </div>
            <div className={"mt-2"}>
                <label htmlFor="username" className="text-xs font-medium text-gray-400 uppercase">
                    Date of birth
                </label>
                <div className={"mt-1 grid grid-cols-3 space-x-3 relative"}>
                    <Dropdown title={"month"}
                              items={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}/>
                    <Dropdown title={"date"} items={Array(31).fill(0).map((e, i) => Number.call(e, i) + 1, Number)}/>
                    <Dropdown title={"year"} items={Array(32).fill(0).map((e, i) => 2021 - Number.call(e, i), Number)}/>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={signingUp}
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {signingUp
                            ? <LoadingSpinner className="h-5 w-5 text-white" aria-hidden="true"/>
                            : <LockClosedIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-500"
                                              aria-hidden="true"/>
                        }
                    </span>
                    Sign Up
                </button>
            </div>

            <p className={"mt-4 text-sm"}>
                <Link href={"/identity/sign-in"}>
                    <a className={"text-indigo-400"}>Already have an account?</a>
                </Link>
            </p>
        </form>
    )
}

export default SignInForm
