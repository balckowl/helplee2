import { auth } from '@/libs/firebase'
import React from 'react'

const LogoutBtn = () => {

    const signOutWithGoogle = () => {
        auth.signOut()
    }

    return (
        <div className="align-self-center d-sm-block">
            <p onClick={signOutWithGoogle} className='text-white'>Logout</p>
        </div>
    )
}

export default LogoutBtn