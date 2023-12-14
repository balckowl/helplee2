"use client"
import React, { useContext, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'

import styles from './LinearGradient.module.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faStar } from '@fortawesome/free-solid-svg-icons'

interface colorFiled {
    color: string;
    endPoint: string;
}

const LinerGradient = () => {

    const { user } = useContext(AuthContext);

    const [degree, setDegree] = useState<string>("30")
    const [colorFields, setColorFields] = useState<colorFiled[]>([{ color: "#d17aff", endPoint: "20" }, { color: "#7ae4ff", endPoint: "60" }, { color: "#ffffff", endPoint: "80" }])

    const addColorField = () => {
        setColorFields([...colorFields, { color: "#ffffff", endPoint: "50" }])
    }

    const updateColorField = (index: number, field: "color" | "endPoint", value: string) => {
        const updatedColorFields: colorFiled[] = [...colorFields];
        updatedColorFields[index][field] = value;
        setColorFields(updatedColorFields);
    }

    const removeColorField = () => {
        const updatedColorFields = [...colorFields]

        updatedColorFields.pop()

        setColorFields(updatedColorFields)
    }

    const generateGradientString = () => {
        const baseGradient = `${degree}deg`;
        const colorFieldGradient = colorFields
            .map((field) => `,${field.color} ${field.endPoint}%`)
            .join('');
        console.log(colorFieldGradient)
        console.log(baseGradient + colorFieldGradient)
        return baseGradient + colorFieldGradient;
    };

    const copyToClipBoard = async () => {
        try {
            await navigator.clipboard.writeText(`linear-gradient(${generateGradientString()})`);
            alert('コピーされました。');
        } catch (error) {
            console.error('コピーに失敗しました。', error);
        }
    }

    const sendFavLinerGradient = async () => {

        if (user) {
            const { uid, displayName } = user;

            const userDocRef = doc(db, "user", uid);

            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName,
                    LinerGradient: [`linear-gradient(${generateGradientString()})`],
                })
                alert('登録されました。')
            } else {
                if (userDocSnap.data().LinerGradient?.length >= 5) {
                    alert("３つ以上は登録できません。")
                } else {
                    await updateDoc(userDocRef, {
                        LinerGradient: arrayUnion(`linear-gradient(${generateGradientString()})`),
                    })
                    alert('登録されました。')
                }
            }
        } else {
            alert('LOGINを行ってください。')
        }
    }

    const linerGradientStyle = css({
        width: "100%",
        background: `linear-gradient(${generateGradientString()})`,
    })

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>Linear-Gradinet</h2>
                            <div className="row d-flex justify-content-center g-0 bg-white py-5 page-base" css={linerGradientStyle}>
                                <div className="col-lg-10 col-11">

                                    <div className="row justify-content-end g-0">
                                        <div className='col-xl-10 blank-space'></div>
                                        <div className="col-xl-1 col-2">
                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={copyToClipBoard}>
                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy} /></p>
                                            </motion.div>
                                        </div>
                                        <div className="col-xl-1 col-2">
                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-black' onClick={sendFavLinerGradient}>
                                                <motion.p className='text-center' initial={{ color: 'white' }} whileHover={{ color: user ? 'yellow' : 'red' }}><FontAwesomeIcon icon={faStar} /></motion.p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <SyntaxHighlighter language="css" style={monokaiSublime}>
                                        {`background: linear-gradient(${generateGradientString()})`}
                                    </SyntaxHighlighter>

                                    {/* <div className="code_box_btn my-3">
                                        <div className="row g-3 justify-content-end">
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_copy" onClick={copyToClipBoard}>
                                                    <p className='text-center'>コピー</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-1 col-2">
                                                <div className="code_box_btn_fav" onClick={sendFavLinerGradient}>
                                                    <p className='text-center'>登録</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className={`${styles.degree_box} mb-4 mt-4`}>
                                        <div className='row g-0 justify-content-center py-3'>
                                            <div className="col-lg-3">
                                                <div>
                                                    <p className='text-center'>角度</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div>
                                                    <p className='text-center'>180deg</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                    <input type="range" value={degree} min="-180" max="180" onChange={(e) => setDegree(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="color_filed_btn mb-4">
                                        <div className='row g-0'>
                                            <div className="col-lg-1 col-2">
                                                <motion.div className={`${styles.color_filed_btn_add}`} onClick={addColorField} whileTap={{ scale: 1.2 }}>
                                                    <p className='text-center'>+</p>
                                                </motion.div>
                                            </div>
                                            <div className="col-lg-1 col-2">
                                                <motion.div className={`${styles.color_filed_btn_remove}`} onClick={removeColorField} whileTap={{ scale: 1.2 }}>
                                                    <p className='text-center'>-</p>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='color_filed_list'>
                                        <div className='row g-2'>
                                            {colorFields.map((CF, index) => (
                                                <div className={`col-lg-3`} key={index}>
                                                    <div className={`${styles.color_filed}`}>
                                                        <h3>colorField{index + 1}</h3>
                                                        <div>
                                                            <div>
                                                                <h3>カラー</h3>
                                                                <p>{CF.color}</p>
                                                                <input className='color-input' type="color" value={CF.color} onChange={(e) => updateColorField(index, 'color', e.target.value)} />
                                                            </div>

                                                            <div>
                                                                <h3>終始位置</h3>
                                                                <p>{CF.endPoint}%</p>
                                                                <input type="range" value={CF.endPoint} onChange={(e) => updateColorField(index, 'endPoint', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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

export default LinerGradient