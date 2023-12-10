"use client"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/libs/firebase"

const LoginBtn = () => {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    return (
        <div className="align-self-center d-sm-block">
            <p onClick={signInWithGoogle} className="text-white">Login</p>
        </div>
    )
}

export default LoginBtn