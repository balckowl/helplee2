import { auth } from '@/libs/firebase'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LogoutBtn = () => {

    const signOutWithGoogle = () => {
        auth.signOut()
    }

    return (
        <div className="align-self-center d-sm-block">
            <div onClick={signOutWithGoogle} className='text-white logout-btn'>
                <p><FontAwesomeIcon icon={faRightFromBracket}/></p>
                <p>LOGOUT</p>
            </div>
        </div>
    )
}

export default LogoutBtn