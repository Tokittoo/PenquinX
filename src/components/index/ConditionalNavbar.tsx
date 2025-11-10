'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on all /docs routes
  if (pathname?.startsWith('/docs')) {
    return null
  }
  
  return <Navbar />
}

