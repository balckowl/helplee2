"use client"
import React, { useContext, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faStar } from '@fortawesome/free-solid-svg-icons';

const TextShadow = () => {

  const { user } = useContext(AuthContext);

  const [shadowX, setShadowX] = useState<string>("0")
  const [shadowY, setShadowY] = useState<string>("0")
  const [color, setColor] = useState<string>("#000000")
  const [blur, setBlur] = useState<string>("0")
  const textShadowCode: string = `${shadowX}px ${shadowY}px ${blur}px ${color}`

  const sendFavTextShadow = async () => {

    if (user) {
      const { uid, displayName } = user;

      const userDocRef = doc(db, "user", uid);

      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          displayName,
          TextShadow: [`${textShadowCode}`],
        })
        alert('登録されました。')
      } else {
        if (userDocSnap.data().TextShadow?.length >= 3) {
          alert("３つ以上は登録できません。")
        } else {
          await updateDoc(userDocRef, {
            TextShadow: arrayUnion(`${textShadowCode}`),
          })
          alert('登録されました。')
        }
      }
    } else {
      alert('LOGINを行ってください。')
    }
  }

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(textShadowCode);
      alert('コピーされました。');
    } catch (error) {
      console.error('コピーに失敗しました。', error);
    }
  }

  const textShadowStyle = css({
    fontSize: "50px",
    textShadow: textShadowCode,
  })

  return (
    <>
      <section>
        <div className="container">
          <div className="row d-flex justify-content-center g-0">
            <div className="col-lg-11">
              <h2 className='text-white page-title'>Text-Shadow</h2>
              <div className="row d-flex justify-content-center g-0 bg-white py-5 page-base">
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
                              <input type="range" max={50} value={shadowX} onChange={(e) => setShadowX(e.target.value)} />
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
                              <input type="range" max={50} value={shadowY} onChange={(e) => setShadowY(e.target.value)} />
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
                        <p css={textShadowStyle}>Text</p>
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
                      <motion.div whileTap={{ scale: 1.2 }} className='bg-black' onClick={sendFavTextShadow}>
                        <motion.p className='text-center' initial={{ color: 'white' }} whileHover={{ color: user ? 'yellow' : 'red' }}><FontAwesomeIcon icon={faStar} /></motion.p>
                      </motion.div>
                    </div>
                  </div>

                  <SyntaxHighlighter language="css" style={monokaiSublime}>
                    {`text-shadow: ${textShadowCode}`}
                  </SyntaxHighlighter>

                  {/* <div className="code_box_btn my-3">
                    <div className="row g-3 justify-content-end">
                      <div className="col-lg-1 col-2">
                        <div className="code_box_btn_copy" onClick={copyToClipBoard}>
                          <p className='text-center'>コピー</p>
                        </div>
                      </div>
                      <div className="col-lg-1 col-2">
                        <div className="code_box_btn_fav" onClick={sendFavTextShadow}>
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

export default TextShadow