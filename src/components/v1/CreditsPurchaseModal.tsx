'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FaFishFins } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react'
import { useState, useEffect } from 'react'

interface CreditsPurchaseModalProps {
    isOpen: boolean
    onClose: () => void
    currentCredits: number
    onCreditsUpdate?: (newCredits: number) => void
}

export default function CreditsPurchaseModal({
    isOpen,
    onClose,
    currentCredits
}: CreditsPurchaseModalProps) {
    const [selectedPackage, setSelectedPackage] = useState<{ credits: number; price: number } | null>(null)

    // Reset selection when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedPackage(null)
        }
    }, [isOpen])

    const handleClose = () => {
        setSelectedPackage(null)
        onClose()
    }

    const handlePurchase = () => {
        if (selectedPackage) {
            // TODO: Implement payment integration
            console.log('Purchase credits:', selectedPackage)
            // After successful payment, you would update credits:
            // const newCredits = currentCredits + selectedPackage.credits
            // if (onCreditsUpdate) {
            //     onCreditsUpdate(newCredits)
            // }
            // localStorage.setItem('px_credits', newCredits.toString())
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    
                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl max-h-[90vh] overflow-y-auto px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Card className="bg-background border-border shadow-2xl p-6 md:p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 flex items-center justify-center rounded-lg bg-cyan/10 dark:bg-cyan/20">
                                        <FaFishFins color="#007FFF" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">Buy Credits</h2>
                                        <p className="text-sm text-muted-foreground">Choose a package to get started</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="size-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
                                    aria-label="Close modal"
                                >
                                    <FaTimes size={14} />
                                </button>
                            </div>

                            {/* Credit Packages */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {[
                                    { credits: 100, price: 99, popular: false },
                                    { credits: 500, price: 449, popular: true },
                                    { credits: 1000, price: 799, popular: false },
                                ].map((pkg) => {
                                    const isSelected = selectedPackage?.credits === pkg.credits && selectedPackage?.price === pkg.price
                                    return (
                                        <button
                                            key={pkg.credits}
                                            onClick={() => setSelectedPackage({ credits: pkg.credits, price: pkg.price })}
                                            className={`relative p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                                                isSelected
                                                    ? 'border-cyan bg-cyan/10 dark:bg-cyan/20 shadow-lg shadow-cyan/20'
                                                    : pkg.popular
                                                    ? 'border-cyan/50 bg-cyan/5 dark:bg-cyan/10 hover:border-cyan hover:bg-cyan/10 dark:hover:bg-cyan/20'
                                                    : 'border-border hover:border-cyan/30 dark:hover:border-cyan/40 hover:bg-accent/50'
                                            }`}
                                        >
                                            {pkg.popular && (
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-cyan text-cyan-foreground text-xs font-semibold rounded-full">
                                                    Popular
                                                </div>
                                            )}
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 size-5 flex items-center justify-center rounded-full bg-cyan text-cyan-foreground">
                                                    <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaFishFins color="#007FFF" size={20} />
                                                <span className="text-2xl font-bold">{pkg.credits}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">Credits</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold">₹{pkg.price}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                ₹{(pkg.price / pkg.credits).toFixed(2)} per credit
                                            </p>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Additional Packages */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {[
                                    { credits: 2500, price: 1799 },
                                    { credits: 5000, price: 3299 },
                                ].map((pkg) => {
                                    const isSelected = selectedPackage?.credits === pkg.credits && selectedPackage?.price === pkg.price
                                    return (
                                        <button
                                            key={pkg.credits}
                                            onClick={() => setSelectedPackage({ credits: pkg.credits, price: pkg.price })}
                                            className={`relative p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                                                isSelected
                                                    ? 'border-cyan bg-cyan/10 dark:bg-cyan/20 shadow-lg shadow-cyan/20'
                                                    : 'border-border hover:border-cyan/30 dark:hover:border-cyan/40 hover:bg-accent/50'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 size-5 flex items-center justify-center rounded-full bg-cyan text-cyan-foreground">
                                                    <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <FaFishFins color="#007FFF" size={18} />
                                                    <span className="text-xl font-bold">{pkg.credits}</span>
                                                </div>
                                                <span className="text-xl font-bold">₹{pkg.price}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                ₹{(pkg.price / pkg.credits).toFixed(2)} per credit
                                            </p>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Current Balance */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border mb-6">
                                <span className="text-sm font-medium text-muted-foreground">Current Balance</span>
                                <div className="flex items-center gap-2">
                                    <FaFishFins color="#007FFF" size={16} />
                                    <span className="text-lg font-bold">{currentCredits}</span>
                                </div>
                            </div>

                            {/* Selected Package Summary */}
                            {selectedPackage && (
                                <div className="mb-6 p-4 rounded-lg bg-cyan/5 dark:bg-cyan/10 border border-cyan/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Selected Package</p>
                                            <div className="flex items-center gap-2">
                                                <FaFishFins color="#007FFF" size={18} />
                                                <span className="text-lg font-bold">{selectedPackage.credits} Credits</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                            <span className="text-2xl font-bold">₹{selectedPackage.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-cyan hover:bg-cyan/90 text-cyan-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePurchase}
                                    disabled={!selectedPackage}
                                >
                                    {selectedPackage ? `Pay ₹${selectedPackage.price}` : 'Select a Package'}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

