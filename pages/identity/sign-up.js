import Head from "next/head";
import SignupForm from "../../components/forms/signup-form";

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Sign Up - Hued Up</title>
            </Head>
            <main className={"page"}>
                <SignupForm/>
            </main>
        </>
    )
}