'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar only on the main /docs index page (integrations page)
  if (pathname === '/docs') {
    return null
  }
  
  return <Navbar />
}

