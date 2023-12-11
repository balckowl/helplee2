"use client"
import React, { ChangeEvent, useContext, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faStar } from '@fortawesome/free-solid-svg-icons';

const ImgFilter = () => {

    const { user } = useContext(AuthContext);

    const [blur, setBlur] = useState<string>("0")
    const [grayScale, setGrayScale] = useState<string>("0")
    const [sepia, setSepia] = useState<string>("0")
    const [brightness, setBrightness] = useState<string>("100")
    const [hueRotate, setHueRotate] = useState<string>("0")
    const [saturate, setSaturate] = useState<string>("100")
    const [opacity, setOpacity] = useState<string>("100")
    const [contrast, setContrast] = useState<string>("100")
    const [invert, setInvert] = useState<string>("0")

    const imgFilterString = () => {
        const updateValueFuncs = []

        // if (Number(blur) > 0) {
        updateValueFuncs.push(`blur(${blur}px)`)
        // }

        if (Number(grayScale) > 0) {
            updateValueFuncs.push(`grayscale(${grayScale}%)`)
        }

        if (Number(sepia) > 0) {
            updateValueFuncs.push(`sepia(${sepia}%)`)
        }

        if (Number(brightness) != 100) {
            updateValueFuncs.push(`brightness(${brightness}%)`)
        }

        if (Number(hueRotate) > 0) {
            updateValueFuncs.push(`hue-rotate(${hueRotate}deg)`)
        }

        if (Number(saturate) != 100) {
            updateValueFuncs.push(`saturate(${saturate}%)`)
        }

        if (Number(opacity) < 100) {
            updateValueFuncs.push(`opacity(${opacity}%)`)
        }

        if (Number(contrast) != 100) {
            updateValueFuncs.push(`contrast(${contrast}%)`)
        }

        if (Number(invert) > 0) {
            updateValueFuncs.push(`invert(${invert}%)`)
        }

        // if (updateValueFuncs.length === 0) {
        //     return;
        // } else {
        return `${updateValueFuncs.map((func) => func).join(' ')}`
        // }

    }

    const sendFavImgFilter = async () => {
        if (user) {
            const { uid, displayName } = user;

            const userDocRef = doc(db, "user", uid);

            const userDocSnap = await getDoc(userDocRef);

            if (!imgFilterString()) {
                alert('パラメータが変更されていません。')
            }

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName,
                    ImgFilter: [imgFilterString()],
                })
                alert('登録されました。')
            } else {
                if (userDocSnap.data().ImgFilter?.length >= 3) {
                    alert("３つ以上は登録できません。")
                } else {
                    await updateDoc(userDocRef, {
                        ImgFilter: arrayUnion(imgFilterString()),
                    })
                    alert('登録されました。')
                }
            }
        } else {

        }
    }

    const copyToClipBoard = async () => {
        if (!imgFilterString()) {
            alert('パラメータがデフォルトのままです。')
        }

        try {
            await navigator.clipboard.writeText(imgFilterString());
            alert('コピーされました。');
        } catch (error) {
            console.error('コピーに失敗しました。', error);
        }
    }


    const imgFilterStyle = css({
        border: "1px solid black",
        filter: `blur(${blur}px) grayscale(${grayScale}%) sepia(${sepia}) brightness(${brightness}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) opacity(${opacity}%) contrast(${contrast}%) invert(${invert}%)`,
    })

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>Image-Filter</h2>
                            <div className="row d-flex justify-content-center g-0 bg-white py-5 page-base">
                                <div className="col-lg-10 col-11">

                                    <div className="row justify-content-center align-items-center g-5 mb-5">
                                        <div className="col-xl-6 order-lg-1 order-2">
                                            <div className='shadow p-4'>
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
                                                            <input type="range" value={blur} onChange={(e: ChangeEvent<HTMLInputElement>) => setBlur(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>グレー</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{grayScale}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={grayScale} onChange={(e: ChangeEvent<HTMLInputElement>) => setGrayScale(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>セピア</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{sepia}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={sepia} onChange={(e: ChangeEvent<HTMLInputElement>) => setSepia(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>明るさ</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{brightness}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={brightness} min="0" max="200" onChange={(e) => setBrightness(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>色相</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{hueRotate}°</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={hueRotate} min="0" max="360" onChange={(e) => setHueRotate(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>彩度</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{saturate}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={saturate} min="0" max="1000" onChange={(e) => setSaturate(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>透明度</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{opacity}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={opacity} onChange={(e) => setOpacity(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>コントラスト</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{contrast}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={contrast} onChange={(e) => setContrast(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>反転</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{invert}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="range" value={invert} onChange={(e) => setInvert(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 order-lg-2 order-1">
                                            <div className='shadow d-flex justify-content-center p-2'>
                                                <div className="img-style-box p-4">
                                                    <img src="/image/sample-img.jpg" alt="" css={imgFilterStyle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-end g-0">
                                        <div className='col-xl-10 blank-space'></div>
                                        <div className="col-xl-1 col-2">
                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={copyToClipBoard}>
                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy} /></p>
                                            </motion.div>
                                        </div>
                                        <div className="col-xl-1 col-2">
                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-black' onClick={sendFavImgFilter}>
                                                <motion.p className='text-center' initial={{ color: 'white' }} whileHover={{ color: 'yellow' }}><FontAwesomeIcon icon={faStar} /></motion.p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <SyntaxHighlighter language="css" style={monokaiSublime}>
                                        {`filter: ${imgFilterString()}`}
                                    </SyntaxHighlighter>

                                    {/* <div className="code_box_btn my-3">
                                        <div className="row g-3 justify-content-end">
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_copy" onClick={copyToClipBoard}>
                                                    <p className='text-center'>コピー</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_fav" onClick={sendFavImgFilter}>
                                                    <p className='text-center'>登録</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ImgFilter