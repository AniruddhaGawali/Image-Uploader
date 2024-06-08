'use client';
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

type Props = {};

function Navbar({}: Props) {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header className="fixed top-0 left-0 flex justify-between items-center w-full h-16 bg-white text-black shadow-sm px-10">
      <h1 className="text-2xl font-bold text-black primary-gradient bg-clip-text text-transparent">
        IU
      </h1>

      <nav
        className="flex items-center text-black text-base font-medium space-x-5"
        aria-label="Main navigation"
      >
        <ul className="flex items-center justify-between space-x-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          {auth.user && (
            <li>
              <Link href="/drive"> My Folders</Link>
            </li>
          )}
        </ul>
        {!auth.user ? (
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        ) : (
          <Button onClick={logout}>Sign Out</Button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
