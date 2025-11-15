'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFishFins } from 'react-icons/fa6'
import BugHunterCarousel from '@/app/v1/BugHunterCarousel'
import CreditsPurchaseModal from '@/components/v1/CreditsPurchaseModal'

const gettingStartedItems = [
	{
		slug: 'getting-started/index',
		title: 'Introduction',
		description: 'Kick off with the core PenquinX workflow, install prerequisites, and learn how to navigate the toolkit.',
		accent: 'from-primary/40 via-primary/25 to-background',
		indicator: 'bg-primary',
	},
]

export default function Page() {
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
		<section className='min-h-screen bg-background relative'>
			{/* Logo - Top Left (Fixed Position) */}
			<div className='fixed top-10 left-20 z-50 flex items-center'>
				<Link href={'/'} className='flex items-center gap-2'>
					<Image
						src={'/Penquin.png'}
						height={30}
						width={30}
						alt='Logo'
						className='rounded-md invert dark:invert-0'
					/>
					<h1 className='text-xl font-sans font-bold tracking-tight'>PenquinX</h1>
				</Link>
			</div>

			{/* Credits and User Account Info - Top Right (Fixed Position) */}
			<div className='fixed top-10 right-20 z-50 flex items-center gap-4'>
				{/* Credits badge with blue fish icon - Clickable */}
				<button
					onClick={() => setIsCreditsModalOpen(true)}
					className='inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs bg-background/80 backdrop-blur-sm hover:bg-background hover:border-cyan/30 dark:hover:border-cyan/40 transition-all duration-300 cursor-pointer'
				>
					<FaFishFins color="#007FFF" size={16} />
					<span className='font-medium'>{credits}</span>
				</button>

				{/* User account information */}
				<div className='flex items-center gap-2 px-3 py-1.5 '>
					<span className='text-sm font-semibold tracking-wide'>Hi, {username.charAt(0).toUpperCase() + username.slice(1)}</span>
				</div>
			</div>

			<div className='pt-8 pb-16 md:pt-12 md:pb-24'>
				<div className='mx-auto max-w-6xl px-6'>
					

					{/* Hero Section */}
					<div className='text-center mb-0'>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'
						><br />
							Select Where You Want to Redirect
						</motion.h1>
					</div> <br /><br /><br />

					<BugHunterCarousel
						className="mt-12 md:-mt-12"
						singleMode
						items={gettingStartedItems.map((item) => ({
							...item,
							href: `/v1/${item.slug}`,
						}))}
					/>
				</div>
			</div>

			{/* Credits Purchase Modal */}
			<CreditsPurchaseModal
				isOpen={isCreditsModalOpen}
				onClose={() => setIsCreditsModalOpen(false)}
				currentCredits={credits}
				onCreditsUpdate={handleCreditsUpdate}
			/>
		</section>
	)
}

