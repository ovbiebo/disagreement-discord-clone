import Head from "next/head";
import ResetPasswordForm from "../../../components/forms/reset-password-form";

export default function ResetPassword() {
    return (
        <>
            <Head>
                <title>Reset Password - Hued Up</title>
            </Head>
            <main className={"page"}>
                <ResetPasswordForm/>
            </main>
        </>
    )
}