"use client"
import React, { useContext, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { AuthContext } from '../context/AuthContext';

const BoxShadow = () => {

    const { user } = useContext(AuthContext);

    const [shadowX, setShadowX] = useState<string>("0")
    const [shadowY, setShadowY] = useState<string>("0")
    const [blur, setBlur] = useState<string>("0")
    const [color, setColor] = useState<string>('#000000')
    const boxShadowCode: string = `${shadowX}px ${shadowY}px ${blur}px ${color}`

    const copyToClipBoard = async () => {
        try {
            await navigator.clipboard.writeText(`box-shadow: ${boxShadowCode}`);
            alert('コピーされました。');
        } catch (error) {
            console.error('コピーに失敗しました。', error);
        }
    }

    const sendFavBoxShadow = async () => {
        if (user) {
            const { uid, displayName } = user;

            const userDocRef = doc(db, "user", uid);

            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName,
                    BoxShadow: [`${boxShadowCode}`],
                })
                alert('登録されました。')
            } else {
                if (userDocSnap.data().BoxShadow?.length >= 3) {
                    alert("３つ以上は登録できません。")
                } else {
                    await updateDoc(userDocRef, {
                        BoxShadow: arrayUnion(`${boxShadowCode}`),
                    })
                    alert('登録されました。')
                }
            }
        } else {

        }
    }

    const boxShadowStyle = css({
        width: "170px",
        height: "170px",
        border: "1px solid black",
        backgroundColor: "white",
        boxShadow: boxShadowCode,
    })

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>Box-shadow</h2>
                            <div className="row d-flex justify-content-center g-0 bg-white py-5">
                                <div className="col-lg-10 col-11">

                                    <div className="row justify-content-center align-items-center g-5 mb-5">
                                        <div className="col-xl-7 order-lg-1 order-2">
                                            <div className='shadow p-4'>
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>横の影</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{shadowX}px</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" min={-50} max={50} value={shadowX} onChange={(e) => setShadowX(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>縦の影</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{shadowY}px</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" min={-50} max={50} value={shadowY} onChange={(e) => setShadowY(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>ぼかし</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{blur}px</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={blur} onChange={(e) => setBlur(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>カラー</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{color}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 order-lg-2 order-1">
                                            <div className='shadow d-flex justify-content-center p-5'>
                                                <div css={boxShadowStyle}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <SyntaxHighlighter language="css" style={monokaiSublime}>
                                        {`box-shadow: ${boxShadowCode}`}
                                    </SyntaxHighlighter>

                                    <div className="code_box_btn my-3">
                                        <div className="row g-3 justify-content-end">
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_copy" onClick={copyToClipBoard}>
                                                    <p className='text-center'>コピー</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_fav" onClick={sendFavBoxShadow}>
                                                    <p className='text-center'>登録</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BoxShadow