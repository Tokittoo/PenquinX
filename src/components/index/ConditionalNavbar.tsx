'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on all /docs and /v1 routes (including carousel pages)
  if (pathname?.startsWith('/docs') || pathname?.startsWith('/v1')) {
    return null
  }
  
  return <Navbar />
}

