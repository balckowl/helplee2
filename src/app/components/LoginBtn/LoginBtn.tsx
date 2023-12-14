"use client"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider, githubProvider } from "@/libs/firebase"
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useModal } from 'react-hooks-use-modal';

const LoginBtn = () => {

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
    }

    const signInWithGitHub = () => {
        signInWithPopup(auth, githubProvider)
    }

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true //これはオプション。デフォルトはfalse
    });

    return (
        <div className="align-self-center d-sm-block">
            <div>
                <div className='text-white login-btn' onClick={open}>
                    <p><FontAwesomeIcon  icon={faRightToBracket}/></p>
                    <p>LOGIN</p>
                </div>
                <Modal>
                    <div>
                        <div className="modal-inner">
                            <button onClick={close}>
                                <p><FontAwesomeIcon icon={faXmarkCircle} /></p>
                            </button>
                            <div className="d-flex flex-column justify-content-center align-items-center login-btn-group">
                                <div className="google-login-btn" onClick={signInWithGoogle}>
                                    <div className="google-logo-box">
                                        <img src="/image/google-icon.svg" alt="" />
                                    </div>
                                    <p>Sign In With Google</p>
                                </div>
                                <div className="github-login-btn" onClick={signInWithGitHub}>
                                    <div className="github-logo-box">
                                        <img src="/image/github-icon.svg" alt="" />
                                    </div>
                                    <p>Sign In With Github</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div >
    )
}

export default LoginBtn