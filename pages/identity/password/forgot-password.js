import Head from "next/head";
import ForgotPasswordForm from "../../../components/forms/forgot-password-form";

export default function ForgotPassword() {
    return (
        <>
            <Head>
                <title>Forgot Password - Hued Up</title>
            </Head>
            <main className={"page"}>
                <ForgotPasswordForm/>
            </main>
        </>
    )
}