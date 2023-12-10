import React from 'react'
import ImgFilter from './ImgFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Image-Filter | Helplee',
    description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Liner-Gradient | Helplee',
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
            <ImgFilter />
        </>
    )
}

export default page