'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaChevronLeft } from 'react-icons/fa'
import BugHunterCarousel from '@/app/v1/BugHunterCarousel'

const hackersItems = [
	{
		slug: 'twitter',
		title: 'Twitter',
		description: 'Follow top bug bounty hunters and researchers sharing live findings, payloads, and reporting tactics.',
		accent: 'from-primary/40 via-primary/25 to-background',
		indicator: 'bg-primary',
	},
	{
		slug: 'medium',
		title: 'Medium',
		description: 'Deep-dive technical writeups covering exploitation walkthroughs, disclosure reports, and remediation paths.',
		accent: 'from-accent/40 via-accent/25 to-background',
		indicator: 'bg-accent',
	},
	{
		slug: 'youtube',
		title: 'YouTube',
		description: 'Video content, livestreams, and conference talks to watch real reconnaissance and exploitation in action.',
		accent: 'from-secondary/40 via-secondary/25 to-background',
		indicator: 'bg-secondary',
	},
	{
		slug: 'discord',
		title: 'Discord',
		description: 'Join active bug hunting servers, collaborate on targets, and get live feedback from the community.',
		accent: 'from-muted-foreground/35 via-muted-foreground/20 to-background',
		indicator: 'bg-muted-foreground',
	},
	{
		slug: 'security-gitbooks',
		title: 'Security GitBooks',
		description: 'Curated GitBooks full of methodology notes, payload collections, and test case templates.',
		accent: 'from-primary/50 via-primary/20 to-background',
		indicator: 'bg-primary',
	},
]

export default function Page() {
	return (
		<section className='min-h-screen bg-background'>
			<div className='pt-8 pb-16 md:pt-12 md:pb-24'>
				<div className='mx-auto max-w-6xl px-6'>
					{/* Back Button */}
					<div className='mb-8'>
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="group gap-2 text-muted-foreground hover:text-cyan hover:bg-cyan/10 dark:hover:bg-cyan/20 transition-all duration-300"
						>
							<Link href="/v1" className="flex items-center gap-2">
								<FaChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
								Back to Docs
							</Link>
						</Button>
					</div>

					{/* Hero Section */}
					<div className='text-center mb-0'>
						<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30 mb-6'>
							<span className='text-sm font-medium text-cyan dark:text-cyan/90'>Hackers to Follow</span>
						</div>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'
						>
							Select Where You Want to Redirect
						</motion.h1>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-0'>
							Connect with top security researchers, bug bounty hunters, and cybersecurity experts across platforms.
						</p>
					</div>

					<BugHunterCarousel
						className="mt-12 md:-mt-12"
						items={hackersItems.map((item) => ({
							...item,
							href: `/v1/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}

