'use client'

import React from 'react'
import { motion } from 'motion/react'
import BugHunterCarousel from '@/app/docs/BugHunterCarousel'

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
			<div className='py-20'>
				<div className='mx-auto max-w-5xl px-6'>
					<div className='text-center mb-12'>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-3xl font-semibold md:text-4xl'
						>
						Select Where You Want to Redirect
						</motion.h1>
					</div>

					<BugHunterCarousel
						label='Hackers to Follow'
						items={hackersItems.map((item) => ({
							...item,
							href: `/docs/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}


