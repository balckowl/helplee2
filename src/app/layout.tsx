"use client"
import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import { useState } from 'react'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="NR7ckILI_D-jmfo6nO6RceBVbruKojRD7UwaHxNb5Xc" />
      </head>
      <body className={`${notoSansJp.className} ${isActive ? 'is-active' : ''}`}>
        <AuthProvider>
          <Header isActive={isActive} setIsActive={setIsActive} />
          <div id="root">
            <main>
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
