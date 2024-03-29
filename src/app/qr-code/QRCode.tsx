"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"

import QRCode from 'qrcode.react'

const QR = () => {

    const [url, setURL] = useState<string>('')
    const [bgColor, setBgColor] = useState<string>("#FFFFFF")
    const [fgColor, setFgColor] = useState<string>("#000000")

    const downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        if (canvas instanceof HTMLCanvasElement) {
            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            console.error("Canvas element not found or not an instance of HTMLCanvasElement");
        }
    };

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>Box-shadow</h2>
                            <div className="row d-flex justify-content-center g-0 bg-white py-5 page-base">
                                <div className="col-lg-10 col-11">

                                    <div className="row justify-content-center align-items-center g-5">
                                        <div className="col-xl-7 order-lg-1 order-2">
                                            <div className="shadow p-4 mb-4">
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>URL</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div>
                                                            <input type="text" placeholder='https://example.com' value={url} onChange={(e) => setURL(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center mb-3">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>前景色</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{fgColor}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row align-items-center">
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <h3>背景色</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <p>{fgColor}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <motion.div className='shadow text-center py-2 dl-btn' onClick={downloadQR} initial={{ backgroundColor: 'black', color: 'white' }} whileHover={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }} transition={{ duration: 1 }}>
                                                download
                                            </motion.div>
                                        </div>
                                        <div className="col-xl-4 order-lg-2 order-1">
                                            <div className='shadow d-flex justify-content-center flex-column p-4'>
                                                <div className='d-flex justify-content-center'>
                                                    <QRCode
                                                        id="qrcode"
                                                        value={url}
                                                        size={250}
                                                        level={"H"}
                                                        bgColor={bgColor}
                                                        fgColor={fgColor}
                                                        includeMargin={true}
                                                    />
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

export default QR