'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	FaRocket,
	FaChevronRight,
	FaSearch,
	FaPuzzlePiece,
	FaFileAlt,
	FaYoutube,
	FaTwitter,
	FaMedium,
	FaDiscord,
	FaBookOpen,
	FaShieldAlt,
	FaUsers,
	FaTrophy,
	FaTerminal,
	FaWindows,
} from 'react-icons/fa'
import { GiCrossedSwords } from 'react-icons/gi'

type CarouselItem = {
	title: string
	description: string
	href: string
	accent: string
	indicator: string
}

type BugHunterCarouselProps = {
	items: CarouselItem[]
	className?: string
	singleMode?: boolean
	label?: string
}

export default function BugHunterCarousel({ items, className, label, singleMode }: BugHunterCarouselProps) {
	const [index, setIndex] = React.useState(0)

	if (items.length === 0) return null

	const isSingle = singleMode || items.length <= 1

	const prevIndex = (index - 1 + items.length) % items.length
	const nextIndex = (index + 1) % items.length

	const goTo = (next: number) => {
		setIndex((next + items.length) % items.length)
	}

	const slides: Array<{ position: 'prev' | 'current' | 'next'; item: CarouselItem }> = [
		{ position: 'prev', item: items[prevIndex] },
		{ position: 'current', item: items[index] },
		{ position: 'next', item: items[nextIndex] },
	]

	return (
		<div className={cn('relative w-full', className)}>
			{label ? (
				<div className='flex justify-center mb-6'>
					<div className='inline-flex items-center gap-2 rounded-full bg-muted/60 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground'>
						{label}
					</div>
				</div>
			) : null}

			<div className='relative h-[360px] sm:h-[440px] flex items-center justify-center'>
				<div className='absolute inset-x-8 bottom-12 h-32 rounded-[3rem] bg-gradient-to-b from-muted/40 via-background/80 to-background blur-2xl -z-10' />
				<div className='absolute inset-x-16 bottom-8 h-4 rounded-full bg-black/20 dark:bg-white/10 blur-md -z-10' />

				{isSingle ? (
					<div className='relative w-[260px] sm:w-[420px]'>
						<SlideCard item={items[0]} active />
					</div>
				) : (
					<AnimatePresence initial={false} mode='wait'>
						{slides.map(({ position, item }) => {
							const isActive = position === 'current'
							const baseX =
								position === 'prev' ? '-115%' : position === 'next' ? '15%' : '-50%'
							const exitX =
								position === 'prev' ? '-140%' : position === 'next' ? '40%' : '-50%'

							return (
								<motion.div
									key={`${position}-${item.href}-${index}`}
									initial={{
										x: baseX,
										y: '-55%',
										opacity: 0,
										scale: position === 'current' ? 1 : 0.9,
										rotateY: position === 'prev' ? 18 : position === 'next' ? -18 : 0,
									}}
									animate={{
										x: baseX,
										y: '-55%',
										opacity: position === 'current' ? 1 : 0.75,
										scale: position === 'current' ? 1 : 0.92,
										rotateY: position === 'prev' ? 12 : position === 'next' ? -12 : 0,
										zIndex: position === 'current' ? 30 : 20,
									}}
									exit={{
										x: exitX,
										y: '-55%',
										opacity: 0,
										scale: 0.88,
										rotateY: position === 'prev' ? 18 : position === 'next' ? -18 : 0,
									}}
									transition={{ duration: 0.45, ease: 'easeOut' }}
									className='absolute top-1/2 left-1/2 w-[260px] sm:w-[420px]'
								>
									<SlideCard item={item} active={isActive} />
								</motion.div>
							)
						})}
					</AnimatePresence>
				)}
			</div>

			{!isSingle && items.length > 1 ? (
				<div className='mt-10 flex flex-wrap items-center justify-center gap-5'>
					<button
						type='button'
						onClick={() => goTo(index - 1)}
						className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent'
						aria-label='Previous slide'
					>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
							<path d='M15 18l-6-6 6-6' />
						</svg>
					</button>

					<div className='flex items-center gap-4'>
						{items.map((item, i) => {
							const active = i === index
							return (
								<button
									key={item.href}
									type='button'
									onClick={() => goTo(i)}
									className={cn(
										'h-3 w-3 rounded-full border border-border transition-all',
										active
											? 'bg-primary border-primary scale-125 shadow-[0_0_0_6px] shadow-primary/25'
											: 'hover:bg-accent',
									)}
									aria-label={`Go to slide ${i + 1}`}
								/>
							)
						})}
					</div>

					<button
						type='button'
						onClick={() => goTo(index + 1)}
						className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent'
						aria-label='Next slide'
					>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
							<path d='M9 6l6 6-6 6' />
						</svg>
					</button>
				</div>
			) : null}
		</div>
	)
}

function SlideCard({ item, active }: { item: CarouselItem; active: boolean }) {
	const getIcon = (): React.ComponentType<{ className?: string }> => {
		const href = item.href || ''
		if (href.includes('/arsenal')) return GiCrossedSwords
		if (href.includes('/reconnaissance')) return FaSearch
		if (href.includes('/methodology')) return FaBookOpen
		if (href.includes('/extensions')) return FaPuzzlePiece
		if (href.includes('/writeups')) return FaFileAlt
		if (href.includes('/youtube-channels')) return FaYoutube
		if (href.includes('/twitter')) return FaTwitter
		if (href.includes('/medium')) return FaMedium
		if (href.includes('/discord')) return FaDiscord
		if (href.includes('/security-gitbooks')) return FaBookOpen
		if (href.includes('/cyber-security-types')) return FaShieldAlt
		if (href.includes('/common-job-roles')) return FaUsers
		if (href.includes('/get-started-with-infosec')) return FaRocket
		if (href.includes('/best-bug-bounty-platform')) return FaTrophy
		if (href.includes('/best-infosec-writeups-website')) return FaFileAlt
		if (href.includes('/hacking-books')) return FaBookOpen
		if (href.includes('/cli-commands')) return FaTerminal
		if (href.includes('/learn-wsl')) return FaWindows
		if (href.includes('/getting-started')) return FaRocket
		if (href.includes('/youtube')) return FaYoutube
		if (href.includes('/')) return FaRocket
		return FaBookOpen
	}
	const Icon = getIcon()

	return (
		<div className={cn('relative transition-opacity duration-300', active ? 'opacity-100' : 'opacity-90')}>
			<div
				className={cn(
					'absolute inset-4 rounded-[2.5rem] bg-muted/60 blur-2xl transition-opacity duration-300 pointer-events-none',
					active ? 'opacity-100' : 'opacity-0',
				)}
				aria-hidden='true'
			/>
			<Card className='group relative p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 cursor-pointer'>
				<div className='relative'>
					<div className='size-10 flex items-center justify-center [&>svg]:size-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
						<Icon />
					</div>
					<div className='space-y-2 py-6'>
						<h3 className='text-base font-medium transition-colors duration-300 group-hover:text-primary'>{item.title}</h3>
						<p className='text-muted-foreground line-clamp-2 text-sm transition-colors duration-300 group-hover:text-foreground/80'>{item.description}</p>
					</div>
					<div className='flex gap-3 border-t border-dashed pt-6 transition-colors duration-300 group-hover:border-primary/30'>
						<Button
							asChild
							variant='secondary'
							size='sm'
							className='gap-1 pr-2 shadow-none transition-all duration-300 group-hover:bg-white group-hover:text-black dark:group-hover:bg-white dark:group-hover:text-black'
						>
							<Link href={item.href} className='flex items-center gap-1'>
								Get Started
								<FaChevronRight className='ml-0 !size-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100' />
							</Link>
						</Button>
					</div>
				</div>
			</Card>
			<div className='absolute left-1/2 -bottom-6 h-4 w-[70%] -translate-x-1/2 rounded-full bg-black/30 dark:bg-white/10 blur-md' />
		</div>
	)
}