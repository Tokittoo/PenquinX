'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

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
	label?: string
}

export default function BugHunterCarousel({ items, className, label }: BugHunterCarouselProps) {
	const [index, setIndex] = React.useState(0)

	if (items.length === 0) return null

	const prevIndex = (index - 1 + items.length) % items.length
	const nextIndex = (index + 1) % items.length

	const goTo = (next: number) => {
		setIndex((prev) => {
			const total = items.length
			return (next + total) % total
		})
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
			</div>

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
		</div>
	)
}

function SlideCard({ item, active }: { item: CarouselItem; active: boolean }) {
	return (
		<div className={cn('relative transition-opacity duration-300', active ? 'opacity-100' : 'opacity-90')}>
			<div
				className={cn(
					'absolute inset-4 rounded-[2.5rem] bg-muted/60 blur-2xl transition-opacity duration-300 pointer-events-none',
					active ? 'opacity-100' : 'opacity-0',
				)}
				aria-hidden='true'
			/>
			<div
				className={cn(
					'rounded-[2rem] border border-border bg-gradient-to-br shadow-2xl transition-all duration-300',
					item.accent,
					active ? '' : 'opacity-80',
				)}
			>
				<div className='relative m-3 rounded-[1.5rem] border border-border/60 bg-background/80 backdrop-blur-sm p-6 sm:p-8 h-[220px] sm:h-[280px] flex flex-col justify-between overflow-hidden'>
					<div className='space-y-3'>
						<h3 className='text-xl sm:text-3xl font-semibold tracking-tight'>{item.title}</h3>
						<p className='text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-4'>
							{item.description}
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<Link
							href={item.href}
							className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-accent'
						>
							Open
							<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
								<path d='M7 17L17 7' />
								<path d='M7 7h10v10' />
							</svg>
						</Link>

						{active && (
							<div className='flex flex-col gap-2'>
								<span className={cn('h-2 w-2 rounded-full border border-border', item.indicator)} />
								<span className='h-2 w-2 rounded-full border border-border bg-muted/80' />
								<span className='h-2 w-2 rounded-full border border-border bg-muted/50' />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='absolute left-1/2 -bottom-6 h-4 w-[70%] -translate-x-1/2 rounded-full bg-black/30 dark:bg-white/10 blur-md' />
		</div>
	)
}