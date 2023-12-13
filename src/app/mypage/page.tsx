import React from 'react'
import MyPage from './MyPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My-Page| Helplee',
    description: 'お気に入りに保存したCSSを確認することができます。',
    openGraph: {
        title: 'My-Page | Helplee',
        description: 'お気に入りに保存したCSSを確認することができます。',
        url: "helplee2.vercel.app",
        siteName: 'Helplee',
        images: [
            {
                width: '1200',
                height: '675',
                url: 'https://helplee2.vercel.app/image/ogp-mypage.png'
            }
        ],
        locale: 'jp',
        type: 'article',
    }
}

const page = () => {
    return (
        <>
            <MyPage />
        </>
    )
}

export default page