'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFishFins } from 'react-icons/fa6'
import BugHunterCarousel from '@/app/v1/BugHunterCarousel'
import CreditsPurchaseModal from '@/components/v1/CreditsPurchaseModal'

const basicsItems = [
	{
		slug: 'cyber-security-types',
		title: 'Cyber Security Types',
		description: 'Understand the major domains of cyber security to choose your learning path and specialization.',
		accent: 'from-primary/40 via-primary/25 to-background',
		indicator: 'bg-primary',
	},
	{
		slug: 'common-job-roles',
		title: 'Common Job Roles',
		description: 'Break down security career tracks, responsibilities, and core skills every role requires.',
		accent: 'from-secondary/40 via-secondary/25 to-background',
		indicator: 'bg-secondary',
	},
	{
		slug: 'get-started-with-infosec',
		title: 'Get Started with Infosec',
		description: 'Step-by-step onboarding workflow covering mindset, tooling, practice environments, and checklists.',
		accent: 'from-accent/40 via-accent/25 to-background',
		indicator: 'bg-accent',
	},
	{
		slug: 'best-bug-bounty-platform',
		title: 'Best Bug Bounty Platform',
		description: 'Compare top platforms, bounty structures, and program ecosystems to pick where to hunt.',
		accent: 'from-muted-foreground/35 via-muted-foreground/20 to-background',
		indicator: 'bg-muted-foreground',
	},
	{
		slug: 'best-infosec-writeups-website',
		title: 'Best Infosec Writeups Website',
		description: 'Go-to repositories for quality disclosures, research notes, and exploit walkthroughs.',
		accent: 'from-primary/50 via-primary/20 to-background',
		indicator: 'bg-primary',
	},
	{
		slug: 'hacking-books',
		title: 'Hacking Books',
		description: 'Handpicked books that teach offensive fundamentals, methodology, and tooling from the ground up.',
		accent: 'from-secondary/50 via-secondary/20 to-background',
		indicator: 'bg-secondary',
	},
	{
		slug: 'cli-commands',
		title: 'CLI Commands',
		description: 'Essential terminal commands and one-liners you will use in reconnaissance and exploitation.',
		accent: 'from-accent/50 via-accent/20 to-background',
		indicator: 'bg-accent',
	},
	{
		slug: 'learn-wsl',
		title: 'Learn WSL',
		description: 'Configure the Windows Subsystem for Linux for a seamless local hacking environment.',
		accent: 'from-muted-foreground/40 via-muted-foreground/20 to-background',
		indicator: 'bg-muted-foreground',
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
						items={basicsItems.map((item) => ({
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

