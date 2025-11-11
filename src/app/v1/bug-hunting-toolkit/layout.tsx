'use client'

import type { ReactNode } from 'react'

// Override the default /v1 layout to hide the sidebar for this hub page.
export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>
}

