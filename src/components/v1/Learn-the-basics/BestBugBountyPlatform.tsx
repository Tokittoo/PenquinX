'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa'

interface PlatformRow {
  idx: number
  name: string
}

const platforms: PlatformRow[] = [
  { idx: 1, name: 'HackerOne' },
  { idx: 2, name: 'BugCrowd' },
  { idx: 3, name: 'Open Bug Bounty' },
  { idx: 4, name: 'Intigriti' },
  { idx: 5, name: 'Detectify' },
  { idx: 6, name: 'Synack' },
  { idx: 7, name: 'Cobalt' },
  { idx: 8, name: 'Zerocopter' },
  { idx: 9, name: 'YesWeHack' },
  { idx: 10, name: 'KackenProof' },
  { idx: 11, name: 'Vulnerability Lab' },
  { idx: 12, name: 'AntiHack' },
  { idx: 13, name: 'FireBounty' },
  { idx: 14, name: 'BugBounty.jp' },
  { idx: 15, name: 'CyberArmy ID' },
  { idx: 16, name: 'Safe Hats' },
  { idx: 17, name: 'Red Storm' },
  { idx: 18, name: 'Yogosha' },
  { idx: 19, name: 'bugbase' },
]

const getRankBadge = (idx: number) => {
  if (idx === 1) {
    return {
      icon: FaTrophy,
      color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    }
  }
  if (idx === 2) {
    return {
      icon: FaMedal,
      color: 'bg-slate-400/20 text-slate-600 dark:text-slate-400 border-slate-400/30',
      iconColor: 'text-slate-600 dark:text-slate-400',
    }
  }
  if (idx === 3) {
    return {
      icon: FaAward,
      color: 'bg-amber-600/20 text-amber-700 dark:text-amber-500 border-amber-600/30',
      iconColor: 'text-amber-700 dark:text-amber-500',
    }
  }
  return {
    icon: null,
    color: 'bg-muted text-muted-foreground border-border',
    iconColor: '',
  }
}

export function BestBugBountyPlatform() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Top Bug Bounty Platforms</h2>
        <p className="text-sm text-muted-foreground">
          Explore the leading platforms where security researchers and bug bounty hunters collaborate with organizations.
        </p>
      </div>

      {/* Platforms Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {platforms.map((platform, index) => {
          const badge = getRankBadge(platform.idx)
          const IconComponent = badge.icon

          return (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <Card className="group h-full border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-5 space-y-4">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold `}>
                      {IconComponent && (
                        <IconComponent size={12} />
                      )}
                      <span>#{platform.idx}</span>
                    </div>
                    
                  </div>

                  {/* Platform Name */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {platform.name}
                    </h3>
                  </div>

                  {/* Decorative Line */}
                  <div className="border-t border-border/50" />

                  {/* Platform Info Placeholder */}
                  <div className="pt-1">
                    <span className="text-xs text-muted-foreground">
                      Bug Bounty Platform
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}


