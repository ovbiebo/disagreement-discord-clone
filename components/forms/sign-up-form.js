import {LockClosedIcon} from '@heroicons/react/solid'
import Link from "next/link"
import {Dropdown} from "../common/inputs/dropdown";
import TextField from "../common/inputs/text-field";
import {useRouter} from "next/router";
import {signUp} from "../../data-sources/fetchers/user";

const SignInForm = () => {
    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await signUp(e.target.email.value, e.target.password.value)
            await router.push("/app")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="mt-4" action="#" method="POST" onSubmit={submitForm}>
            <div className="rounded-md shadow-sm">
                <div>
                    <label htmlFor="email-address" className="text-xs font-medium text-gray-400 uppercase">
                        Email address
                    </label>
                    <TextField type={"email"} required/>
                </div>
                <div className={"mt-2"}>
                    <label htmlFor="password" className="text-xs font-medium text-gray-400 uppercase">
                        Password
                    </label>
                    <TextField type={"password"} required/>
                </div>
            </div>
            <div className={"mt-2"}>
                <label htmlFor="username" className="text-xs font-medium text-gray-400 uppercase">
                    Date of birth
                </label>
                <div className={"mt-1 grid grid-cols-3 space-x-3 relative"}>
                    <Dropdown title={"month"} items={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}/>
                    <Dropdown title={"date"} items={Array(31).fill(0).map((e, i) => Number.call(e, i) + 1, Number)}/>
                    <Dropdown title={"year"} items={Array(32).fill(0).map((e, i) => 2021 - Number.call(e, i), Number)}/>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-indigo-400 group-hover:text-indigo-500"
                            aria-hidden="true"
                        />
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