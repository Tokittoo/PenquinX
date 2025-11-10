'use client'

import React from 'react'
import { motion } from 'motion/react'
import BugHunterCarousel from '@/app/docs/BugHunterCarousel'

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
						label='Getting Started'
						singleMode
						items={gettingStartedItems.map((item) => ({
							...item,
							href: `/docs/${item.slug}`,
						}))}
					/>
				</div>
			</div>
		</section>
	)
}


