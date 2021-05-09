import {LockClosedIcon} from '@heroicons/react/solid'
import Link from "next/link"
import {useRouter} from "next/router";
import TextField from "../inputs/text-field";
import {signIn} from "../../data-sources/user";
import firebase from "../../firebase/clientApp";

const SignInForm = () => {
    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await signIn(e.target.email.value, e.target.password.value)
            await router.push("/app")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="mt-4" action="#" method="POST" onSubmit={submitForm}>
            <div className="rounded-md shadow-sm">
                <div>
                    <label htmlFor="email" className="text-xs font-medium text-gray-400 uppercase">
                        Email address
                    </label>
                    <TextField type={"email"} placeholder={"Email address"} required/>
                </div>
                <div className={"mt-2"}>
                    <label htmlFor="password" className="text-xs font-medium text-gray-400 uppercase">
                        Password
                    </label>
                    <TextField type={"password"} placeholder={"Password"} required/>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-400">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="text-indigo-400 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true"/>
              </span>
                    Sign in
                </button>
            </div>

            <p className={"mt-4 text-gray-400 text-sm"}>Need an account? <Link href={"/identity/sign-up"}><a
                className={"text-indigo-400"}>Register</a></Link></p>
        </form>
    )
}

export default SignInForm