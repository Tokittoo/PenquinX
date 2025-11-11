'use client'

import React from 'react'
import { motion } from 'motion/react'
import BugHunterCarousel from '@/app/v1/BugHunterCarousel'

const toolkitItems = [
	{
		slug: 'arsenal',
		title: 'Arsenal',
		description:
			'Curated list of essential security tools and helper utilities for faster recon and exploitation.',
		accent: 'from-primary/40 via-primary/30 to-primary/10',
		indicator: 'bg-primary',
	},
	{
		slug: 'reconnaissance',
		title: 'Reconnaissance',
		description:
			'Discover, enumerate, and profile targets with practical playbooks and automation tips.',
		accent: 'from-secondary/40 via-secondary/30 to-secondary/10',
		indicator: 'bg-secondary',
	},
	{
		slug: 'methodology',
		title: 'Methodology',
		description:
			'Battle-tested workflows and checklists to stay systematic from scope to reporting.',
		accent: 'from-accent/40 via-accent/30 to-accent/10',
		indicator: 'bg-accent',
	},
	{
		slug: 'extensions',
		title: 'Extensions',
		description:
			'Browser add-ons and helpers that speed up testing, triage, and note-taking.',
		accent: 'from-muted-foreground/40 via-muted-foreground/30 to-muted-foreground/10',
		indicator: 'bg-muted-foreground',
	},
	{
		slug: 'writeups',
		title: 'Writeups',
		description:
			'Hand-picked real-world writeups to learn practical exploitation patterns.',
		accent: 'from-primary/50 via-primary/30 to-primary/15',
		indicator: 'bg-primary',
	},
	{
		slug: 'youtube-channels',
		title: 'YouTube Channels',
		description:
			'High-signal channels to level up faster with demos, streams, and deep dives.',
		accent: 'from-secondary/50 via-secondary/30 to-secondary/15',
		indicator: 'bg-secondary',
	},
]

export default function Page() {
	return (
		<section className='min-h-screen bg-background'>
			<div className='pt-8 pb-16 md:pt-12 md:pb-24'>
				<div className='mx-auto max-w-6xl px-6'>
					{/* Hero Section */}
					<div className='text-center mb-0'>
						<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30 mb-6'>
							<span className='text-sm font-medium text-cyan dark:text-cyan/90'>Bug Hunter&apos;s Toolkit</span>
						</div>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'
						>
							Select Where You Want to Redirect
						</motion.h1>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-0'>
							Essential tools and resources for bug bounty hunters. Everything you need to find and report vulnerabilities.
						</p>
					</div>
					<BugHunterCarousel
						className="-mt-4"
						items={toolkitItems.map((item) => ({
							...item,
							href: `/v1/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}

