import React from 'react'
import ImageFilter from './ImageFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Image-Filter | Helplee',
    description: 'CSSのImage-Filterをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Image-Filter | Helplee',
        description: 'CSSのImage-Filterをビジュアルを用いての生成が可能となっております。',
        url: "helplee2.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee2.vercel.app/image/ogp-imagefilter.png',
            }
        ],
        locale: 'jp',
        type: 'article',
    }
}

const page = () => {
    return (
        <>
            <ImageFilter />
        </>
    )
}

export default page