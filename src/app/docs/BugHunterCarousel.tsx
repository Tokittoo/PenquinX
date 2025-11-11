'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
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

	const goTo = (next: number) => {
		setIndex((next + items.length) % items.length)
	}

	const getCardStyle = (cardIndex: number) => {
		const diff = cardIndex - index
		let transform = ""
		let zIndex = 0
		let opacity = 1
		let scale = 1

		if (diff === 0) {
			// Current card - center
			transform = "translateX(0px) translateZ(0px) rotateY(0deg)"
			zIndex = 10
			opacity = 1
			scale = 1
		} else if (diff === 1 || (diff === -(items.length - 1))) {
			// Next card - right side
			transform = "translateX(350px) translateZ(-100px) rotateY(-15deg)"
			zIndex = 8
			opacity = 0.8
			scale = 0.9
		} else if (diff === -1 || (diff === items.length - 1)) {
			// Previous card - left side
			transform = "translateX(-350px) translateZ(-100px) rotateY(15deg)"
			zIndex = 8
			opacity = 0.8
			scale = 0.9
		} else if (Math.abs(diff) === 2) {
			// Second layer
			transform = "translateX(0px) translateZ(-200px) rotateY(0deg)"
			zIndex = 5
			opacity = 0.3
			scale = 0.85
		} else {
			// Far cards
			transform = "translateX(0px) translateZ(-400px) rotateY(0deg)"
			zIndex = 1
			opacity = 0
			scale = 0.8
		}

		return {
			transform: `${transform} scale(${scale})`,
			zIndex,
			opacity,
		}
	}

	return (
		<div className={cn('relative w-full', className)}>
			{label ? (
				<div className='flex justify-center'>
					<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30'>
						<span className='text-sm font-medium text-cyan dark:text-cyan/90'>{label}</span>
					</div>
				</div>
			) : null}

			<div 
				className='relative h-[420px] sm:h-[520px] flex items-center justify-center'
				style={{ perspective: "1200px" }}
			>

				{isSingle ? (
					<div className='relative w-[320px] sm:w-[500px]'>
						<SlideCard item={items[0]} active />
					</div>
				) : (
					<div className='relative w-full h-full flex items-center justify-center' style={{ transformStyle: "preserve-3d" }}>
						{items.map((item, cardIndex) => {
							const style = getCardStyle(cardIndex)
							const isActive = cardIndex === index
							
							return (
								<motion.div
									key={`${item.href}-${cardIndex}`}
									className='absolute top-1/2 left-1/2 w-[320px] sm:w-[500px]'
									style={{
										transform: `translate(-50%, -50%) ${style.transform}`,
										zIndex: style.zIndex,
										opacity: style.opacity,
									}}
									animate={{
										transform: `translate(-50%, -50%) ${style.transform}`,
										zIndex: style.zIndex,
										opacity: style.opacity,
									}}
									transition={{
										duration: 0.6,
										ease: [0.25, 0.25, 0.25, 1],
									}}
								>
									<SlideCard item={item} active={isActive} />
								</motion.div>
							)
						})}
					</div>
				)}
			</div>

			{!isSingle && items.length > 1 ? (
				<div className='-mt-20 flex flex-wrap items-center justify-center gap-5 relative z-50'>
					<button
						type='button'
						onClick={() => goTo(index - 1)}
						className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-cyan/10 hover:border-cyan/30 hover:text-cyan dark:hover:bg-cyan/20 dark:hover:border-cyan/40 relative z-50'
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
										'h-3 w-3 rounded-full border border-border transition-all relative z-50',
										active
											? 'bg-cyan border-cyan scale-125 shadow-[0_0_0_6px] shadow-cyan/25'
											: 'hover:bg-cyan/20 hover:border-cyan/40',
									)}
									aria-label={`Go to slide ${i + 1}`}
								/>
							)
						})}
					</div>

					<button
						type='button'
						onClick={() => goTo(index + 1)}
						className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-cyan/10 hover:border-cyan/30 hover:text-cyan dark:hover:bg-cyan/20 dark:hover:border-cyan/40 relative z-50'
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
					'absolute inset-4 rounded-[2.5rem] bg-muted/60 transition-opacity duration-300 pointer-events-none',
					active ? 'opacity-100' : 'opacity-0',
				)}
				aria-hidden='true'
			/>
			<Card className='group relative p-6 -mt-20 transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan/5 dark:hover:shadow-cyan/10 hover:border-cyan/30 dark:hover:border-cyan/40 cursor-pointer border-border/50'>
				{/* Subtle gradient overlay on hover */}
				<div className='absolute inset-0 bg-gradient-to-br from-cyan/0 to-cyan/0 transition-opacity duration-300 pointer-events-none group-hover:from-cyan/5 group-hover:to-cyan/0 dark:group-hover:from-cyan/10 dark:group-hover:to-cyan/0' />
				
				<div className='relative z-10'>
					{/* Icon with cyan accent */}
					<div className='size-12 flex items-center justify-center rounded-lg mb-4 transition-all duration-300 bg-cyan/10 dark:bg-cyan/20 group-hover:bg-cyan/20 dark:group-hover:bg-cyan/30 [&>svg]:text-cyan dark:[&>svg]:text-cyan/90 [&>svg]:size-6'>
						<Icon />
					</div>
					<div className='space-y-3 mb-6'>
						<h3 className='text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-cyan dark:group-hover:text-cyan/90'>{item.title}</h3>
						<p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/90'>{item.description}</p>
					</div>
					<div className='flex gap-3 border-t pt-6 border-border/50 transition-colors duration-300 group-hover:border-cyan/30 dark:group-hover:border-cyan/40'>
						<Button
							asChild
							variant='secondary'
							size='sm'
							className='gap-1 pr-2 shadow-none transition-all duration-300 hover:bg-cyan hover:text-cyan-foreground hover:shadow-md hover:shadow-cyan/20 group-hover:bg-cyan group-hover:text-cyan-foreground group-hover:shadow-md group-hover:shadow-cyan/20'
						>
							<Link href={item.href} className='flex items-center gap-1'>
								Get Started
								<FaChevronRight className='ml-0 !size-3.5 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 hover:translate-x-1 hover:opacity-100' />
							</Link>
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}