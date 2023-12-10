import React from 'react'
import ImgFilter from './ImgFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Image-Filter | Helplee',
    description: 'CSSのImage-Filterをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Image-Filter | Helplee',
        description: 'CSSのImage-Filterをビジュアルを用いての生成が可能となっております。',
        url: "helplee.netlify.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee.netlify.app/image/ogp-imagefilter.png',
            }
        ],
        locale: 'jp',
        type: 'article',
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