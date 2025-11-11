import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import * as React from 'react'
import { FaBookOpen, FaChevronRight, FaRocket } from 'react-icons/fa'
import { GiCrossedSwords } from 'react-icons/gi'
import { FaUserSecret } from 'react-icons/fa6'

export default function IntegrationsPage() {
    // Map integration cards to navigation items
    const integrations = [
        {
            title: "Getting Started",
            description: "Start your journey with comprehensive guides and tutorials to get you up and running quickly.",
            icon: <FaRocket />,
            link: "/docs/getting-started"
        },
        {
            title: "Learn the Basics",
            description: "Master the fundamentals of cybersecurity, bug hunting, and ethical hacking with structured learning paths.",
            icon: <FaBookOpen />,
            link: "/docs/learn-the-basics"
        },
        {
            title: "Hackers to Follow",
            description: "Connect with top security researchers, bug bounty hunters, and cybersecurity experts across platforms.",
            icon: <FaUserSecret />,
            link: "/docs/hackers-to-follow"
        },
        {
            title: "Bug Hunter's Toolkit",
            description: "Essential tools and resources for bug bounty hunters. Everything you need to find and report vulnerabilities.",
            icon: <GiCrossedSwords />,
            link: "/docs/bug-hunting-toolkit"
        },
        {
            title: "Advanced Techniques",
            description: "Coming soon: Deep dive into advanced penetration testing, exploit development, and security research methodologies.",
           icon: <FaBookOpen />,
            link: "#",
            comingSoon: true
        },
        {
            title: "Security Labs",
            description: "Coming soon: Practice your skills with hands-on labs, CTF challenges, and vulnerable applications.",
            icon: <FaBookOpen />,
            link: "#",
            comingSoon: true
        }
    ]

    return (
        <section className="min-h-screen bg-background">
            <div className="pt-8 pb-16 md:pt-12 md:pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 dark:bg-cyan/20 border border-cyan/20 dark:border-cyan/30 mb-6">
                            <span className="text-sm font-medium text-cyan dark:text-cyan/90">Documentation Hub</span>
                        </div>
                        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Begin Your PenquinX Experience
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive resources to master cybersecurity, bug hunting, and ethical hacking. Everything you need to start your journey.
                        </p>
                    </div>

                    {/* Integration Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {integrations.map((integration) => (
                            <IntegrationCard
                                key={integration.title}
                                title={integration.title}
                                description={integration.description}
                                link={integration.link}
                                comingSoon={integration.comingSoon}
                            >
                                {integration.icon}
                            </IntegrationCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ 
    title, 
    description, 
    children, 
    link = '#', 
    comingSoon = false 
}: { 
    title: string
    description: string
    children: React.ReactNode
    link?: string
    comingSoon?: boolean
}) => {
    return (
        <Card className={`group relative p-6 transition-all duration-300 ease-in-out overflow-hidden ${
            comingSoon 
                ? 'cursor-not-allowed opacity-75' 
                : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan/5 dark:hover:shadow-cyan/10 hover:border-cyan/30 dark:hover:border-cyan/40 cursor-pointer border-border/50'
        }`}>
            {/* Subtle gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-cyan/0 to-cyan/0 transition-opacity duration-300 pointer-events-none ${
                comingSoon ? '' : 'group-hover:from-cyan/5 group-hover:to-cyan/0 dark:group-hover:from-cyan/10 dark:group-hover:to-cyan/0'
            }`} />
            
            <div className="relative z-10">
                {/* Icon with cyan accent */}
                <div className={`size-12 flex items-center justify-center rounded-lg mb-4 transition-all duration-300 ${
                    comingSoon 
                        ? 'bg-muted' 
                        : 'bg-cyan/10 dark:bg-cyan/20 group-hover:bg-cyan/20 dark:group-hover:bg-cyan/30 [&>svg]:text-cyan dark:[&>svg]:text-cyan/90'
                }`}>
                    <div className={`[&>svg]:size-6 transition-all duration-300 ${
                        comingSoon 
                            ? '' 
                            : 'group-hover:scale-110 group-hover:rotate-3'
                    }`}>
                        {children}
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <h3 className={`text-lg font-semibold tracking-tight ${
                        comingSoon 
                            ? '' 
                            : 'transition-colors duration-300 group-hover:text-cyan dark:group-hover:text-cyan/90'
                    }`}>{title}</h3>
                    <p className={`text-muted-foreground line-clamp-3 text-sm leading-relaxed ${
                        comingSoon 
                            ? '' 
                            : 'transition-colors duration-300 group-hover:text-foreground/90'
                    }`}>{description}</p>
                </div>

                <div className={`flex gap-3 border-t pt-6 ${
                    comingSoon 
                        ? 'border-border/50' 
                        : 'border-border/50 transition-colors duration-300 group-hover:border-cyan/30 dark:group-hover:border-cyan/40'
                }`}>
                    {comingSoon ? (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-2 shadow-none cursor-not-allowed opacity-50"
                            disabled
                        >
                            Coming Soon
                            <FaChevronRight className="ml-0 !size-3.5 opacity-50" />
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-2 shadow-none transition-all duration-300 hover:bg-cyan hover:text-cyan-foreground hover:shadow-md hover:shadow-cyan/20 group-hover:bg-cyan group-hover:text-cyan-foreground group-hover:shadow-md group-hover:shadow-cyan/20"
                        >
                            <Link href={link} className="flex items-center gap-1">
                                Get Started
                                <FaChevronRight className="ml-0 !size-3.5 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 hover:translate-x-1 hover:opacity-100" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    )
}

