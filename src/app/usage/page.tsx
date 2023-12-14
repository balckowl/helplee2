import React from 'react'
import Usage from './Usage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Usage | Helplee',
    description: 'Helpleeの利用方法を説明しています。',
    openGraph: {
        title: 'Usage | Helplee',
        description: 'Helpleeの利用方法を説明しています。',
        url: "helplee2.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee2.vercel.app/image/ogp-usage.png'
            }
        ],
        locale: 'jp',
        type: 'article',
    }
}

const page = () => {
    return (
        <>
            <Usage />
        </>
    )
}

export default page