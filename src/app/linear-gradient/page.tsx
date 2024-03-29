import React from 'react'
import LinearGradient from './LinearGradient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Linear-Gradient | Helplee',
    description: 'CSSのLinear-Gradientをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Linear-Gradient | Helplee',
        description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
        url: "helplee2.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee2.vercel.app/image/ogp-lineargradient.png'
            }
        ],
        locale: 'jp',
        type: 'article',
    }
}

const page = () => {
    return (
        <>
            <LinearGradient />
        </>
    )
}

export default page