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

    const linerGradientStyle = css({
        background: 'red',
        // background: linerGradientList[linerGradientNumber],
    })

    const boxShadowStyle = css({
        boxShadow: boxShadowList[boxShadowNumber],
    })

    const imgFilterStyle = css({
        filter: imgFilterList[imgFilterNumber],
    });

    const textShadowStyle = css({
        textShadow: textShadowList[textShadowNumber],
    })

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white'>My Page</h2>
                            {user ? (<div className="row d-flex justify-content-center g-0 bg-white py-5">
                                <div className="col-11">

                                    <div className="row justify-content-center g-5">
                                        <div className={`col-xl-3 col-lg-4 ${styles.my_ac}`}>
                                            <div className="text-center select-area">
                                                <div className={`${styles.user_icon_box}`}>
                                                    <img src={user.photoURL} alt="" css={imgFilterStyle} />
                                                </div>
                                                <h3 className='mb-2 mypage-name'>{user.displayName}</h3>
                                                <div className="d-flex flex-column gap-3 select-box-list">
                                                    <div className={`select-box ${judge == 1 ? 'isactiveselect' : ''}`} onClick={() => setJudge(1)}>
                                                        <p>Liner-Gradient</p>
                                                    </div>
                                                    <div className={`select-box ${judge == 2 ? 'isactiveselect' : ''}`} css={boxShadowStyle} onClick={() => setJudge(2)}>
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
                                                    <div className='linear_gradient'>
                                                        <h2 className='heading'>Liner-Gradient</h2>
                                                        {cssData?.LinerGradient != '' ? cssData?.LinerGradient?.map((css: string, index: number) => (
                                                            <div className="row justify-content-center align-items-center mb-4" key={index}>
                                                                <div className="col-10">
                                                                    <div>
                                                                        <SyntaxHighlighter language="css" style={monokaiSublime}>
                                                                            {css}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                        <p className='text-white text-center'>削除</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <motion.div whileTap={{ scale: 1.2 }} className={`${linerGradientNumber === index ? 'selected' : 'notselected'}`} onClick={() => setLinerGradientNumber(index)}>
                                                                        <p className='text-center'>選択</p>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        )) : (
                                                            <div>
                                                                <p>お気に入りに登録されていません。</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 2 ? (
                                                    <div className='linear_gradient'>
                                                        <h2 className='heading'>Box-Shadow</h2>
                                                        {cssData?.BoxShadow != '' ? cssData?.BoxShadow?.map((css: string, index: number) => (
                                                            <div className="row justify-content-center align-items-center mb-4" key={index}>
                                                                <div className="col-10">
                                                                    <div>
                                                                        <SyntaxHighlighter language="css">
                                                                            {css}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                        <p className='text-white text-center'>削除</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <motion.div whileTap={{ scale: 1.2 }} className={`${boxShadowNumber === index ? 'selected' : 'notselected'}`} onClick={() => setBoxShadowNumber(index)}>
                                                                        <p className='text-center'>選択</p>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        )) : (
                                                            <div>
                                                                <p>お気に入りに登録されていません。</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 3 ? (
                                                    <div className='linear_gradient'>
                                                        <h2 className='heading'>Image-Filter</h2>
                                                        {cssData?.ImgFilter != '' ? cssData?.ImgFilter?.map((css: string, index: number) => (
                                                            <div className="row justify-content-center align-items-center mb-4" key={index}>
                                                                <div className="col-10">
                                                                    <div>
                                                                        <SyntaxHighlighter language="css">
                                                                            {css}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                        <p className='text-white text-center'>削除</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <motion.div whileTap={{ scale: 1.2 }} className={`${imgFilterNumber === index ? 'selected' : 'notselected'}`} onClick={() => setImgFilterNumber(index)}>
                                                                        <p className='text-center'>選択</p>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        )) : (
                                                            <div>
                                                                <p>お気に入りに登録されていません。</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (<></>)}
                                                {judge == 4 ? (
                                                    <div className='linear_gradient'>
                                                        <h2 className='heading' css={textShadowStyle}>Text-Shadow</h2>
                                                        {cssData?.TextShadow != '' ? cssData?.TextShadow?.map((css: string, index: number) => (
                                                            <div className="row justify-content-center align-items-center mb-4" key={index}>
                                                                <div className="col-10">
                                                                    <div>
                                                                        <SyntaxHighlighter language="css">
                                                                            {css}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className='bg-dark' onClick={() => DeleteFavData(css)}>
                                                                        <p className='text-white text-center'>削除</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <motion.div whileTap={{ scale: 1.2 }} className={`${textShadowNumber === index ? 'selected' : 'notselected'}`} onClick={() => setTextShadowNumber(index)}>
                                                                        <p className='text-center'>選択</p>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        )) : (
                                                            <div>
                                                                <p>お気に入りに登録されていません。</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (<></>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (<></>)}
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default MyPage