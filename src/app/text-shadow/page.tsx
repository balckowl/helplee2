import React from 'react'
import TextShadow from './TextShadow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text-Shadow| Helplee',
  description: 'CSSのLiner-Gradientをビジュアルを用いての生成が可能となっております。',
  openGraph: {
    title: 'Text-Shadow | Helplee',
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
      <TextShadow />
    </>
  )
}

export default page