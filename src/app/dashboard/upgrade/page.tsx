"use client"
import PaymentButton from '@/components/PaymentButton'
import { useUser } from '@clerk/nextjs';
import React from 'react'

export default function Upgrade() {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <PaymentButton userId={user.id}/>
    </div>
  )
}
