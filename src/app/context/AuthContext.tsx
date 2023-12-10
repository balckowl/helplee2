"use client"
import React, { ReactNode } from 'react'
import { createContext } from 'react'
import { auth } from "@/libs/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = createContext<any>({})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useAuthState(auth)

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }