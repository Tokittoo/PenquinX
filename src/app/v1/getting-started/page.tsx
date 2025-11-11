'use client'

import React from 'react'
import { motion } from 'motion/react'
import BugHunterCarousel from '@/app/v1/BugHunterCarousel'

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
	return (
		<section className='min-h-screen bg-background'>
			<div className='pt-8 pb-16 md:pt-12 md:pb-24'>
				<div className='mx-auto max-w-6xl px-6'>
					{/* Hero Section */}
					<div className='text-center mb-0'>
						<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30 mb-6'>
							<span className='text-sm font-medium text-cyan dark:text-cyan/90'>Getting Started</span>
						</div>
						<motion.h1
							initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }}
							className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'
						>
							Select Where You Want to Redirect
						</motion.h1>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-0'>
							Kick off with the core PenquinX workflow, install prerequisites, and learn how to navigate the toolkit.
						</p>
					</div>

					<BugHunterCarousel
						className="-mt-4"
						singleMode
						items={gettingStartedItems.map((item) => ({
							...item,
							href: `/v1/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}

