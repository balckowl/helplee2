"use client"
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { AuthContext } from '@/app/context/AuthContext';
import LogoutBtn from '../LogoutBtn/Logout';
import LoginBtn from '../LoginBtn/LoginBtn';
import Link from 'next/link';

interface headerProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const Header = ({ isActive, setIsActive }: headerProps) => {

  const { user } = useContext(AuthContext);

  return (
    <header>
      <div className="container d-flex align-items-center justify-content-between">
        <div className='brand'>
          <Link href="/">
            <div className='logo-box'>
              <img src="/image/logo.png" alt="" />
            </div>
            <h1>Helplee</h1>
          </Link>
        </div>
        <nav>
          <ul className={`menu ${isActive ? 'is-active' : ''}`}>
            <li><Link href="/">Usage</Link></li>
            <li><Link href="/mypage">MyPage</Link></li>
            <li>{user ? <LogoutBtn /> : <LoginBtn />}</li>
            <li className='guest-icon'>
              {user ? <img src={user.photoURL} alt="" /> : <img src='/image/guest-icon.png' alt="" />}
            </li>
          </ul>
          <div className="ham" onClick={() => setIsActive(!isActive)}>
            <img src="/image/hamburger-icon.svg" alt="" />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header