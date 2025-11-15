'use client'

import React from 'react'
import DarkModeToggle from '../DarkModeToggle'
import Image from 'next/image'
import Link from 'next/link'
import { FaFishFins } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import CreditsPurchaseModal from './CreditsPurchaseModal'

const DocsTopbar = () => {
  const [credits, setCredits] = useState<number>(0)
  const [username, setUsername] = useState<string>('Username')
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false)


  useEffect(() => {
    try {
      const storedCredits = Number.parseInt(localStorage.getItem('px_credits') ?? '0', 10)
      if (Number.isFinite(storedCredits)) setCredits(storedCredits)
      const storedName = localStorage.getItem('px_username')
      if (storedName && storedName.trim().length > 0) setUsername(storedName.toUpperCase())

      } catch {
      // ignore read errors; defaults will be used
    }
  }, [])

  const handleCreditsUpdate = (newCredits: number) => {
    setCredits(newCredits)
    localStorage.setItem('px_credits', newCredits.toString())
  }



return (
    <div className='h-16 w-full'>
      <div className='fixed w-full inset-x-0 bg-background border-b border-border top-0 z-50 flex justify-between items-center md:px-20 px-8 py-4'>
        <div className='flex items-center gap-4'>
          
          <Link href={'/'} className='flex items-center gap-2'>
            <Image
              src={'/Penquin.png'}
              height={30}
              width={30}
              alt='Logo'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-xl font-sans font-bold tracking-tight'>PenquinX</h2>
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          {/* Credits badge with fish icon - Clickable */}
          <button
            onClick={() => setIsCreditsModalOpen(true)}
            className='inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs hover:bg-accent hover:border-cyan/30 dark:hover:border-cyan/40 transition-all duration-300 cursor-pointer'
          >
            <FaFishFins color="#007FFF" size={16} />
            <span className='font-medium'>{credits}</span>
          </button>

          {/* User account showcase */}
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold tracking-wide'>Hi,{username.charAt(0).toUpperCase() + username.slice(1)}</span>
          </div>

          <DarkModeToggle />
        </div>
      </div>

      {/* Credits Purchase Modal */}
      <CreditsPurchaseModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        currentCredits={credits}
        onCreditsUpdate={handleCreditsUpdate}
      />
    </div>
  )
}

export default DocsTopbar