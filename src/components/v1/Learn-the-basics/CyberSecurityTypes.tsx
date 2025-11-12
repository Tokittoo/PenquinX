'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface SecurityType {
  category: string
  description: string
  roles: string
  beginner: string
}

type BeginnerLevel = 'yes' | 'moderate' | 'no'

const types: SecurityType[] = [
  {
    category: 'Network Security',
    description: 'Protects network infrastructure from intrusions and attacks.',
    roles: 'Network Security Engineer, SOC Analyst, Firewall Administrator',
    beginner: 'Yes – Start with basics of networking and firewalls',
  },
  {
    category: 'Web Application Security',
    description: 'Secures websites and web applications from vulnerabilities.',
    roles: 'Web App Pentester, Application Security Engineer, Bug Bounty Hunter',
    beginner: 'Yes – OWASP Top 10 is a good starting point',
  },
  {
    category: 'Endpoint Security',
    description: 'Protects individual devices (PCs, mobiles) from threats.',
    roles: 'Endpoint Security Analyst, IT Security Administrator',
    beginner: 'Yes – Easy to understand via antivirus, EDR tools',
  },
  {
    category: 'Mobile Security (Android/iOS)',
    description: 'Focuses on securing mobile apps and OS against malware and exploitation.',
    roles: 'Mobile Security Researcher, Android Pentester, iOS Security Analyst',
    beginner: 'Moderate – Better after basic pentesting',
  },
  {
    category: 'Cloud Security',
    description: 'Secures cloud platforms like AWS, Azure, and GCP.',
    roles: 'Cloud Security Engineer, Cloud Architect, DevSecOps Engineer',
    beginner: 'No – Requires cloud and networking background',
  },
  {
    category: 'IoT Security',
    description: 'Protects Internet of Things devices from remote attacks.',
    roles: 'IoT Security Analyst, Embedded Security Engineer',
    beginner: 'No – Needs hardware and embedded systems knowledge',
  },
  {
    category: 'Operational Security (OPSEC)',
    description: 'Manages processes and decisions around protecting sensitive data.',
    roles: 'OPSEC Analyst, Risk Management Specialist',
    beginner: 'Yes – Learn basic data handling and privacy',
  },
  {
    category: 'Information Security (InfoSec)',
    description: 'General protection of information assets from unauthorized access.',
    roles: 'InfoSec Analyst, Compliance Officer, ISO Auditor',
    beginner: 'Yes – A good entry point into cybersecurity',
  },
  {
    category: 'Application Security',
    description: 'Involves secure coding, code review, and protecting software during development.',
    roles: 'AppSec Engineer, Secure Code Reviewer, Software Security Consultant',
    beginner: 'No – Requires programming knowledge',
  },
  {
    category: 'Identity and Access Management (IAM)',
    description: 'Controls user access to systems and data.',
    roles: 'IAM Analyst, Identity Governance Engineer',
    beginner: 'Moderate – Learn access control models first',
  },
  {
    category: 'Cryptography',
    description: 'Uses encryption to protect data confidentiality and integrity.',
    roles: 'Cryptographer, Crypto Analyst, PKI Specialist',
    beginner: 'No – Needs strong math background',
  },
  {
    category: 'Incident Response',
    description: 'Detects and responds to security breaches and threats.',
    roles: 'Incident Responder, SOC Analyst, Digital Forensic Expert',
    beginner: 'Yes – Start in SOC roles',
  },
  {
    category: 'Penetration Testing (Red Teaming)',
    description: 'Simulates attacks to find weaknesses before attackers do.',
    roles: 'Penetration Tester, Red Team Operator, Ethical Hacker',
    beginner: 'Yes – With basic hacking knowledge',
  },
  {
    category: 'Blue Teaming',
    description: 'Defends systems and detects attacks in real time.',
    roles: 'Blue Team Analyst, Threat Hunter, SOC Analyst',
    beginner: 'Yes – Good for defense-focused beginners',
  },
  {
    category: 'Digital Forensics',
    description: 'Investigates cybercrimes by analyzing digital evidence.',
    roles: 'Forensic Analyst, Cybercrime Investigator',
    beginner: 'No – Requires forensic tools knowledge',
  },
  {
    category: 'Governance, Risk, and Compliance (GRC)',
    description: 'Ensures security practices comply with legal and regulatory standards.',
    roles: 'GRC Analyst, Compliance Manager, Risk Analyst',
    beginner: 'Yes – Suitable for non-technical entry',
  },
]

export function CyberSecurityTypes() {
  const categorizedTypes = useMemo(() => {
    const yes: SecurityType[] = []
    const moderate: SecurityType[] = []
    const no: SecurityType[] = []

    types.forEach((type) => {
      const beginner = type.beginner.toLowerCase()
      if (beginner.startsWith('yes')) {
        yes.push(type)
      } else if (beginner.startsWith('moderate')) {
        moderate.push(type)
      } else {
        no.push(type)
      }
    })

    return { yes, moderate, no }
  }, [])

  const getLevelInfo = (level: BeginnerLevel) => {
    switch (level) {
      case 'yes':
        return {
          title: 'Beginner Friendly',
          subtitle: 'Ideal starting points for newcomers',
          count: categorizedTypes.yes.length,
          color: 'border-primary/30 bg-primary/5 dark:bg-primary/10',
          badgeColor: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
        }
      case 'moderate':
        return {
          title: 'Moderate Difficulty',
          subtitle: 'Requires some foundational knowledge',
          count: categorizedTypes.moderate.length,
          color: 'border-secondary/30 bg-secondary/5 dark:bg-secondary/10',
          badgeColor: 'bg-secondary/10 text-secondary-foreground border-secondary/20 dark:bg-secondary/20 dark:text-secondary-foreground dark:border-secondary/30',
        }
      case 'no':
        return {
          title: 'Advanced Level',
          subtitle: 'Requires specialized knowledge and experience',
          count: categorizedTypes.no.length,
          color: 'border-muted-foreground/30 bg-muted/5 dark:bg-muted/10',
          badgeColor: 'bg-muted text-muted-foreground border-border',
        }
    }
  }

  const renderSection = (level: BeginnerLevel, items: SecurityType[]) => {
    const info = getLevelInfo(level)

    return (
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div className={`rounded-lg border-2 p-6 ${info.color}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight">{info.title}</h2>
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-background/50">
                  {info.count} domains
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{info.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, index) => (
            <motion.div
              key={t.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="group h-full border-border/50 hover:border-border hover:shadow-md transition-all duration-300">
                <div className="p-5 space-y-4">
                  {/* Category Title */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {t.category}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/50" />

                  {/* Job Roles */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Career Paths
                    </div>
                    <div className="text-xs text-foreground/80 leading-relaxed">
                      {t.roles}
                    </div>
                  </div>

                  {/* Beginner Badge */}
                  <div className="pt-2">
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${info.badgeColor}`}>
                      {t.beginner}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-5 border-border/50">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{categorizedTypes.yes.length}</div>
            <div className="text-sm font-medium">Beginner Friendly</div>
            <div className="text-xs text-muted-foreground">Great starting points</div>
          </div>
        </Card>
        <Card className="p-5 border-border/50">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-secondary-foreground">{categorizedTypes.moderate.length}</div>
            <div className="text-sm font-medium">Moderate Difficulty</div>
            <div className="text-xs text-muted-foreground">Some experience needed</div>
          </div>
        </Card>
        <Card className="p-5 border-border/50">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-muted-foreground">{categorizedTypes.no.length}</div>
            <div className="text-sm font-medium">Advanced Level</div>
            <div className="text-xs text-muted-foreground">Specialized knowledge</div>
          </div>
        </Card>
      </motion.div>

      {/* Categorized Sections */}
      <div className="space-y-12">
        {renderSection('yes', categorizedTypes.yes)}
        {renderSection('moderate', categorizedTypes.moderate)}
        {renderSection('no', categorizedTypes.no)}
      </div>
    </div>
  )
}


