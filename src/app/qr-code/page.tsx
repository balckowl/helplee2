import React from 'react'
import QR from './QRCode'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'QRCode | Helplee',
    description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'QRCoode | Helplee',
        description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
        url: "helplee.vercel.app",
        siteName: 'Helplee',
        images: [
        ]
    }
}


const page = () => {
    return (
        <>
            <QR />
        </>
    )
}

export default page