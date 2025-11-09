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
            link: "/docs/getting-started/index"
        },
        {
            title: "Bug Hunter's Toolkit",
            description: "Essential tools and resources for bug bounty hunters. Everything you need to find and report vulnerabilities.",
            icon: <GiCrossedSwords />,
            link: "/docs/arsenal"
        },
        {
            title: "Learn the Basics",
            description: "Master the fundamentals of cybersecurity, bug hunting, and ethical hacking with structured learning paths.",
            icon: <FaBookOpen />,
            link: "/docs/cyber-security-types"
        },
        {
            title: "Hackers to Follow",
            description: "Connect with top security researchers, bug bounty hunters, and cybersecurity experts across platforms.",
            icon: <FaUserSecret />,
            link: "/docs/twitter"
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
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-muted-foreground mt-6">Connect seamlessly with popular platforms and services to enhance your workflow.</p>
                    </div>

                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        <Card className={`group relative p-6 transition-all duration-300 ease-in-out ${
            comingSoon 
                ? 'cursor-not-allowed opacity-75' 
                : 'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 cursor-pointer'
        }`}>
            <div className="relative">
                <div className={`size-10 flex items-center justify-center [&>svg]:size-10 ${
                    comingSoon 
                        ? '' 
                        : 'transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
                }`}>
                    {children}
                </div>

                <div className="space-y-2 py-6">
                    <h3 className={`text-base font-medium ${
                        comingSoon 
                            ? '' 
                            : 'transition-colors duration-300 group-hover:text-primary'
                    }`}>{title}</h3>
                    <p className={`text-muted-foreground line-clamp-2 text-sm ${
                        comingSoon 
                            ? '' 
                            : 'transition-colors duration-300 group-hover:text-foreground/80'
                    }`}>{description}</p>
                </div>

                <div className={`flex gap-3 border-t border-dashed pt-6 ${
                    comingSoon 
                        ? '' 
                        : 'transition-colors duration-300 group-hover:border-primary/30'
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
                            className="gap-1 pr-2 shadow-none transition-all duration-300 group-hover:bg-white group-hover:text-black dark:group-hover:bg-white dark:group-hover:text-black"
                        >
                            <Link href={link} className="flex items-center gap-1">
                                Get Started
                                <FaChevronRight className="ml-0 !size-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    )
}

