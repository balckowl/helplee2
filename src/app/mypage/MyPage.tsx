"use client"

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useContext, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { AuthContext } from "../context/AuthContext";
import styles from './MyPage.module.css'
import { DocumentData, arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MyPage = () => {

    const { user } = useContext(AuthContext);
    const [cssData, setCssData] = useState<any>({});
    const [linerGradientList, setLinerGradientList] = useState<string[]>([])
    const [boxShadowList, setBoxShadowList] = useState<string[]>([])
    const [textShadowList, setTextShadowList] = useState<string[]>([])
    const [imgFilterList, setImgFilterList] = useState<string[]>([])
    const [linerGradientNumber, setLinerGradientNumber] = useState<number>(0);
    const [boxShadowNumber, setBoxShadowNumber] = useState<number>(0);
    const [textShadowNumber, setTextShadowNumber] = useState<number>(0);
    const [imgFilterNumber, setImgFilterNumber] = useState<number>(0);
    const [judge, setJudge] = useState<number>(1);

    const getFavCSS = async () => {
        const { uid } = user

        const docRef = doc(db, "user", uid);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // ドキュメントが存在する場合
                const data: DocumentData = docSnap.data();
                setCssData(data)
                setLinerGradientList(data?.LinerGradient)
                setBoxShadowList(data?.BoxShadow)
                setTextShadowList(data?.TextShadow)
                setImgFilterList(data?.ImgFilter)
                console.log(data?.ImgFilter)
            }

        } catch (error) {
            console.error("ドキュメントの取得中にエラーが発生しました:", error);
        }
    }

    const DeleteFavData = async (cssToDelete: string) => {
        const { uid } = user;
        const docRef = doc(db, "user", uid);

        try {
            // Firestoreの配列から要素を削除する

            if (judge == 1) {
                await updateDoc(docRef, {
                    LinerGradient: arrayRemove(cssToDelete),
                });
            }

            if (judge == 2) {
                await updateDoc(docRef, {
                    BoxShadow: arrayRemove(cssToDelete),
                });
            }

            if (judge == 4) {
                await updateDoc(docRef, {
                    TextShadow: arrayRemove(cssToDelete),
                });
            }

            if (judge == 3) {
                await updateDoc(docRef, {
                    ImgFilter: arrayRemove(cssToDelete),
                });
            }
            // 再度データを取得して表示を更新
            getFavCSS();
        } catch (error) {
            console.error("要素の削除中にエラーが発生しました:", error);
        }
    }

    useEffect(() => {
        if (user) {
            getFavCSS()
        }
    }, [user])

    const copyToClipBoard = async (index: number) => {
        try {
            await navigator.clipboard.writeText(
                `${judge == 1 ? `linear-gradient : ${linerGradientList[index]}` 
                : (judge == 2 ? `box-shadow : ${boxShadowList[index]}`
                : (judge == 3 ? `filter : ${imgFilterList[index]} `
                : (judge == 4 ? `text-shadow: ${textShadowList[index]}`: '')))}`
            );
            alert('コピーされました。');
        } catch (error) {
            console.error('コピーに失敗しました。', error);
        }
    }

    const linerGradientStyle = css`
        background: ${linerGradientList?.length > 0 ? linerGradientList[linerGradientNumber] : ''};
    `

    const boxShadowStyle = css`
        box-shadow: ${boxShadowList?.length > 0 ? boxShadowList[boxShadowNumber] : ''};
    `


    const imgFilterStyle = css`
        filter: ${imgFilterList?.length > 0 ? imgFilterList[imgFilterNumber] : ''};
    `

    const textShadowStyle = css`
        text-shadow: ${textShadowList?.length > 0 ? textShadowList[textShadowNumber] : ''};
    `

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>My Page</h2>
                            {user ? (<div className="row d-flex justify-content-center g-0 bg-white py-5 page-base" css={judge == 1 ? linerGradientStyle : ''}>
                                <div className="col-11">

                                    <div className="row justify-content-center g-5">
                                        <div className={`col-xl-3 col-lg-4 ${styles.my_ac}`}>
                                            <div className="text-center select-area">
                                                {/* <div className={`${styles.user_icon_box}`}>
                                                    <img src={user.photoURL} alt="" css={imgFilterStyle} />
                                                </div>
                                                <h3 className='mb-2 mypage-name'>{user.displayName}</h3> */}
                                                <div className="d-flex flex-column gap-3 select-box-list">
                                                    <div className={`select-box ${judge == 1 ? 'isactiveselect' : ''}`} onClick={() => setJudge(1)}>
                                                        <p>Liner-Gradient</p>
                                                    </div>
                                                    <div className={`select-box ${judge == 2 ? 'isactiveselect' : ''}`} onClick={() => setJudge(2)}>
                                                        <p>Box-Shadow</p>
                                                    </div>
                                                    <div className={`select-box ${judge == 3 ? 'isactiveselect' : ''}`} onClick={() => setJudge(3)}>
                                                        <p>Image-Filter</p>
                                                    </div>
                                                    <div className={`select-box ${judge == 4 ? 'isactiveselect' : ''}`} onClick={() => setJudge(4)}>
                                                        <p>Text-Shadow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-9 col-lg-8">
                                            <div>
                                                {judge == 1 ? (
                                                    <div>
                                                        <h2 className='heading'>Liner-Gradient</h2>
                                                        <div>
                                                            <div className='shadow mb-4 preview-area' css={linerGradientStyle}></div>
                                                        </div>
                                                        <div className='linear_gradient'>
                                                            {(cssData?.LinerGradient && cssData?.LinerGradient.length > 0) ? cssData?.LinerGradient?.map((css: string, index: number) => (
                                                                <div key={index}>
                                                                    <div className="row justify-content-end g-0">
                                                                        <div className='col-xl-9 blank-space'></div>
                                                                        <div className='col-xl-1 col-2'>
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => copyToClipBoard(index)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy}/></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faTrash} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className={`${linerGradientNumber === index ? 'selected' : 'notselected'}`} onClick={() => setLinerGradientNumber(index)}>
                                                                                <p className='text-center'><FontAwesomeIcon icon={faEye} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center align-items-center mb-4 g-0">
                                                                        <div className="col-12">
                                                                            <div>
                                                                                <SyntaxHighlighter language="css" style={monokaiSublime}>
                                                                                    {`linear-gradient: ${css}`}
                                                                                </SyntaxHighlighter>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : (
                                                                <div>
                                                                    <p>お気に入りに登録されていません。</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 2 ? (
                                                    <div>
                                                        <h2 className='heading'>Box-Shadow</h2>
                                                        <div>
                                                            <div className='shadow p-5 mb-4'>
                                                                <div className='preview-square' css={boxShadowStyle}></div>
                                                            </div>
                                                        </div>
                                                        <div className='linear_gradient'>
                                                            {(cssData?.BoxShadow && cssData?.BoxShadow.length > 0) ? cssData?.BoxShadow?.map((css: string, index: number) => (
                                                                <div key={index}>
                                                                    <div className="row justify-content-end g-0">
                                                                        <div className='col-xl-9 blank-space'></div>
                                                                        <div className='col-xl-1 col-2'>
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => copyToClipBoard(index)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy}/></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faTrash} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className={`${boxShadowNumber === index ? 'selected' : 'notselected'}`} onClick={() => setBoxShadowNumber(index)}>
                                                                                <p className='text-center'><FontAwesomeIcon icon={faEye} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center align-items-center mb-4 g-0">
                                                                        <div className="col-12">
                                                                            <div>
                                                                                <SyntaxHighlighter language="css" style={monokaiSublime}>
                                                                                    {`box-shadow: ${css}`}
                                                                                </SyntaxHighlighter>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : (
                                                                <div>
                                                                    <p>お気に入りに登録されていません。</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 3 ? (
                                                    <div>
                                                        <h2 className='heading'>Image-Filter</h2>
                                                        <div>
                                                            <div className='shadow mb-4 preview-img-box'>
                                                                <img src="/image/sample-img.jpg" alt="" css={imgFilterStyle} />
                                                            </div>
                                                        </div>
                                                        <div className='linear_gradient'>
                                                            {cssData?.ImgFilter && cssData?.ImgFilter.length > 0 ? cssData?.ImgFilter?.map((css: string, index: number) => (
                                                                <div key={index}>
                                                                    <div className="row justify-content-end g-0">
                                                                        <div className='col-xl-9 blank-space'></div>
                                                                        <div className='col-xl-1 col-2'>
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => copyToClipBoard(index)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy}/></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faTrash} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className={`${imgFilterNumber === index ? 'selected' : 'notselected'}`} onClick={() => setImgFilterNumber(index)}>
                                                                                <p className='text-center'><FontAwesomeIcon icon={faEye} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center align-items-center mb-4 g-0">
                                                                        <div className="col-12">
                                                                            <div>
                                                                                <SyntaxHighlighter language="css" style={monokaiSublime}>
                                                                                    {`filter: ${css}`}
                                                                                </SyntaxHighlighter>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : (
                                                                <div>
                                                                    <p>お気に入りに登録されていません。</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 4 ? (
                                                    <div>
                                                        <h2 className='heading'>Text-Shadow</h2>
                                                        <div>
                                                            <div className='shadow mb-4 p-5 preview-text-box'>
                                                                <p css={textShadowStyle}>激辛フルーツ</p>
                                                            </div>
                                                        </div>
                                                        <div className='linear_gradient'>
                                                            {cssData?.TextShadow && cssData?.TextShadow.length > 0 ? cssData?.TextShadow?.map((css: string, index: number) => (
                                                                <div key={index}>
                                                                    <div className="row justify-content-end g-0">
                                                                        <div className='col-xl-9 blank-space'></div>
                                                                        <div className='col-xl-1 col-2'>
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => copyToClipBoard(index)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faCopy}/></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                                <p className='text-white text-center'><FontAwesomeIcon icon={faTrash} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                        <div className="col-xl-1 col-2">
                                                                            <motion.div whileTap={{ scale: 1.2 }} className={`${textShadowNumber === index ? 'selected' : 'notselected'}`} onClick={() => setTextShadowNumber(index)}>
                                                                                <p className='text-center'><FontAwesomeIcon icon={faEye} /></p>
                                                                            </motion.div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center align-items-center mb-4 g-0">
                                                                        <div className="col-12">
                                                                            <div>
                                                                                <SyntaxHighlighter language="css" style={monokaiSublime}>
                                                                                    {`text-shadow: ${css}`}
                                                                                </SyntaxHighlighter>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : (
                                                                <div>
                                                                    <p>お気に入りに登録されていません。</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (<></>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <div className='user-none-page bg-white page-base d-flex align-items-center justify-content-center'>
                                    <div>
                                        <div className="user-none-img-box">
                                            <img src="/image/user-none.png" alt="" />
                                        </div>
                                        <p className='text-center'>Userがいません。</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default MyPage