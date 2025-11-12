'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface RoleGroup {
  title: string
  level: 'Junior' | 'Senior'
  roles: string[]
}

const groups: RoleGroup[] = [
  {
    title: 'Blue Teaming Roles',
    level: 'Junior',
    roles: [
      'Security Analyst',
      'Security Operations Center (SOC) Analyst',
      'Incident Response Analyst',
      'Network Security Administrator',
    ],
  },
  {
    title: 'Blue Teaming Roles',
    level: 'Senior',
    roles: [
      'Security Engineer',
      'Incident Response Manager',
      'Security Architect',
      'SOC Manager',
    ],
  },
  {
    title: 'Red Teaming Roles',
    level: 'Junior',
    roles: [
      'Penetration Tester',
      'Red Team Operator',
      'Vulnerability Analyst',
      'Ethical Hacker',
    ],
  },
  {
    title: 'Red Teaming Roles',
    level: 'Senior',
    roles: [
      'Senior Penetration Tester',
      'Red Team Lead',
      'Offensive Security Engineer',
      'Threat Hunter',
    ],
  },
]

export function CommonJobRoles() {
  const organizedGroups = useMemo(() => {
    const blueTeam = groups.filter(g => g.title === 'Blue Teaming Roles')
    const redTeam = groups.filter(g => g.title === 'Red Teaming Roles')
    return { blueTeam, redTeam }
  }, [])

  const getTeamInfo = (teamType: 'blueTeam' | 'redTeam') => {
    switch (teamType) {
      case 'blueTeam':
        return {
          title: 'Blue Teaming',
          subtitle: 'Defensive security roles focused on protection and detection',
          color: 'border-primary/30 bg-primary/5 dark:bg-primary/10',
          badgeColor: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
        }
      case 'redTeam':
        return {
          title: 'Red Teaming',
          subtitle: 'Offensive security roles focused on testing and penetration',
          color: 'border-primary/30 bg-primary/5 dark:bg-primary/10',
          badgeColor: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
        }
    }
  }

  const getLevelInfo = (level: 'Junior' | 'Senior') => {
    switch (level) {
      case 'Junior':
        return {
          label: 'Entry Level',
          description: 'Ideal starting positions for newcomers',
          color: 'border-secondary/30 bg-secondary/5 dark:bg-secondary/10',
        }
      case 'Senior':
        return {
          label: 'Advanced Level',
          description: 'Requires experience and expertise',
          color: 'border-muted-foreground/30 bg-muted/5 dark:bg-muted/10',
        }
    }
  }

  const renderTeamSection = (teamType: 'blueTeam' | 'redTeam', teamGroups: RoleGroup[]) => {
    const info = getTeamInfo(teamType)

    return (
      <motion.div
        key={teamType}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Team Header */}
        <div className={`rounded-lg border-2 p-6 ${info.color}`}>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{info.title}</h2>
            <p className="text-sm text-muted-foreground">{info.subtitle}</p>
          </div>
        </div>

        {/* Level Groups Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {teamGroups.map((group, groupIndex) => {
            const levelInfo = getLevelInfo(group.level)
            return (
              <motion.div
                key={`${group.title}-${group.level}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
              >
                <Card className="group h-full border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-6 space-y-5">
                    {/* Level Header */}
                    <div className={`rounded-lg border p-4 ${levelInfo.color}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold tracking-tight">{levelInfo.label}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{levelInfo.description}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${info.badgeColor}`}>
                          {group.roles.length} roles
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border/50" />

                    {/* Roles List */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Job Roles
                      </div>
                      <div className="space-y-2.5">
                        {group.roles.map((role, roleIndex) => (
                          <motion.div
                            key={`${group.title}-${group.level}-${role}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: groupIndex * 0.1 + roleIndex * 0.05 }}
                            className="flex items-start gap-3 group/item"
                          >
                            <div className="mt-1.5 flex-shrink-0">
                              <div className="size-1.5 rounded-full bg-primary group-hover/item:bg-primary group-hover/item:scale-150 transition-all duration-300" />
                            </div>
                            <span className="text-sm text-foreground/90 leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                              {role}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="group p-5 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary transition-transform duration-300">
              {organizedGroups.blueTeam.reduce((acc, g) => acc + g.roles.length, 0)}
            </div>
            <div className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Blue Team Roles</div>
            <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Defensive security positions</div>
          </div>
        </Card>
        <Card className="group p-5 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary transition-transform duration-300">
              {organizedGroups.redTeam.reduce((acc, g) => acc + g.roles.length, 0)}
            </div>
            <div className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Red Team Roles</div>
            <div className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Offensive security positions</div>
          </div>
        </Card>
      </motion.div>

      {/* Team Sections */}
      <div className="space-y-12">
        {renderTeamSection('blueTeam', organizedGroups.blueTeam)}
        {renderTeamSection('redTeam', organizedGroups.redTeam)}
      </div>
    </div>
  )
}


