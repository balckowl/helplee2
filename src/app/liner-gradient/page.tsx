import React from 'react'
import LinerGradient from './LinerGradient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Liner-Gradient | Helplee',
    description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Linear-Gradient | Helplee',
        description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
        url: "helplee.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee.vercel.app/image/ogp-lineargradient.png'
            }
        ],
    }
}

const page = () => {
    return (
        <>
            <LinerGradient />
        </>
    )
}

export default page