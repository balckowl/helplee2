import React from 'react'
import BoxShadow from './Boxshadow'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Box-Shadow| Helplee',
    description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Box-Shadow | Helplee',
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
            <BoxShadow />
        </>
    )
}

export default page