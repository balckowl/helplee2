"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <html lang="en">
      <body className={`inter.className ${isActive ? 'is-active' : ''}`}>
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
