"use client"

import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function Home() {

  const {auth} = useContext(AuthContext)

  return (
    <main className="flex h-screen w-full flex-col items-center  min-h-screen">
      <div className="flex flex-col items-center justify-center gap-10 mt-5 h-full">
        <h1 className="text-6xl font-bold text-center">
          <span className="primary-gradient bg-clip-text text-transparent">
            I
          </span>
          mage{' '}
          <span className="primary-gradient bg-clip-text text-transparent">
            U
          </span>
          ploader
        </h1>

        <p className="text-xl  text-center w-2/3">
          Welcome to the Image Uploader! This is a simple image uploader that
          allows you to upload images and share them with others.
        </p>

        <Link
          href={auth.user ? "/drive" : "/register"}
        >
          <Button className=" px-16 py-6 rounded-md text-xl hover:opacity-85 border-2 hover:border-black">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
