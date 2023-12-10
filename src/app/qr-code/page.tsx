import React from 'react'
import QR from './QRCode'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'QR-Code | Helplee',
    description: 'WebサイトのURLからQRコードを生成することができます。',
    openGraph: {
        title: 'QR-Coode | Helplee',
        description: 'WebサイトのURLからQRコードを生成することができます。',
        url: "helplee.netlify.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee.netlify.app/image/ogp-qrcode.png'
            }
        ],
        locale: 'jp',
        type: 'article',
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