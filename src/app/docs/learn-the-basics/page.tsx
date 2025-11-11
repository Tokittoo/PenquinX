'use client'

import React from 'react'
import { motion } from 'motion/react'
import BugHunterCarousel from '@/app/docs/BugHunterCarousel'

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
	return (
		<section className='min-h-screen bg-background'>
			<div className='pt-8 pb-16 md:pt-12 md:pb-24'>
				<div className='mx-auto max-w-6xl px-6'>
					{/* Hero Section */}
					<div className='text-center mb-0'>
						<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30 mb-6'>
							<span className='text-sm font-medium text-cyan dark:text-cyan/90'>Learn the Basics</span>
						</div>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'
						>
							Select Where You Want to Redirect
						</motion.h1>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-0'>
							Master the fundamentals of cybersecurity, bug hunting, and ethical hacking with structured learning paths.
						</p>
					</div>

					<BugHunterCarousel
						className="-mt-4"
						items={basicsItems.map((item) => ({
							...item,
							href: `/docs/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}


