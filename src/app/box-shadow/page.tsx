import React from 'react'
import BoxShadow from './Boxshadow'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Box-Shadow | Helplee',
    description: 'CSSのBox-Shadowをビジュアルを用いての生成が可能となっております。',
    openGraph: {
        title: 'Box-Shadow | Helplee',
        description: 'CSSのBox-Shadowをビジュアルを用いての生成が可能となっております。',
        url: "helplee2.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee2.vercel.app/image/ogp-boxshadow.png'
            }
        ],
        locale: 'jp',
        type: 'article',
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