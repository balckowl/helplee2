import React from 'react'
import TextShadow from './TextShadow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text-Shadow | Helplee',
  description: 'CSSのText-Shadowをビジュアルを用いての生成が可能となっております。',
  openGraph: {
    title: 'Text-Shadow | Helplee',
    description: 'CSSのText-Shadowをビジュアルを用いての生成が可能となっております。',
    url: "helplee2.vercel.app",
    siteName: 'Helplee',
    images: [
      {
        width: '1200',
        height: '675',
        url: 'https://helplee2.vercel.app/image/ogp-textshadow.png'
      }
    ],
    locale: 'jp',
    type: 'article',
  }
}

const page = () => {
  return (
    <>
      <TextShadow />
    </>
  )
}

export default page