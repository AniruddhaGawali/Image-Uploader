"use client"

import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    redirect('/login');
  }

  return <main>{children}</main>;
}

export default Layout;
