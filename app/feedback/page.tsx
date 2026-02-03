'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FeedbackForm from '@/components/FeedbackForm'
import { useLanguage } from '@/lib/LanguageContext'

export default function FeedbackPage() {
    const { t, language } = useLanguage()
    const [viewedThemes, setViewedThemes] = useState({
        green: false,
        purple: false,
        blue: false,
    })
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        // Check if already submitted
        const submitted = localStorage.getItem('feedback_submitted')
        if (submitted) {
            setHasSubmitted(true)
            setIsLoaded(true)
            return
        }

        // Load viewed themes from localStorage
        const saved = localStorage.getItem('viewed_themes')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setViewedThemes(parsed)
            } catch (e) {
                console.error('Failed to parse saved progress', e)
            }
        }
        setIsLoaded(true)
    }, [])

    const allViewed = viewedThemes.green && viewedThemes.purple && viewedThemes.blue

    if (!isLoaded) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-slate-200 border-t-indigo-600"></div>
            </main>
        )
    }

    // Already submitted
    if (hasSubmitted) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
                    <div className="text-5xl sm:text-6xl mb-4">✅</div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{t('feedback.alreadySubmitted')}</h1>
                    <p className="text-slate-500 text-sm sm:text-base mb-5 sm:mb-6">
                        {t('feedback.alreadyDesc')}
                    </p>
                    <Link href="/thank-you" className="btn-primary inline-block text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                        {t('feedback.viewConfirmation')}
                    </Link>
                </div>
            </main>
        )
    }

    // Not all themes viewed
    if (!allViewed) {
        const remainingThemes = []
        if (!viewedThemes.green) remainingThemes.push(t('progress.green'))
        if (!viewedThemes.purple) remainingThemes.push(t('progress.purple'))
        if (!viewedThemes.blue) remainingThemes.push(t('progress.blue'))

        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
                    <div className="text-5xl sm:text-6xl mb-4">🔒</div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{t('feedback.locked')}</h1>
                    <p className="text-slate-500 text-sm sm:text-base mb-3 sm:mb-4">
                        {t('feedback.lockDesc')}
                    </p>
                    <div className="mb-5 sm:mb-6">
                        <p className="text-slate-400 text-xs sm:text-sm mb-2">{t('feedback.remaining')}</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {remainingThemes.map((theme) => (
                                <span key={theme} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm">
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Link href="/review" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('feedback.continueReview')}
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-3 sm:p-4 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <Link href="/review" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-1 sm:mb-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('feedback.backReview')}
                    </Link>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">{t('feedback.title')}</h1>
                    <p className="text-slate-500 text-sm sm:text-base">{t('feedback.subtitle')}</p>
                </div>

                {/* Success Indicator */}
                <div className="glass-card rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 border border-green-200 bg-green-50">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-green-700 text-sm sm:text-base">{t('feedback.allReviewed')}</h3>
                        <p className="text-green-600 text-xs sm:text-sm">{t('feedback.canSubmit')}</p>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
                    <FeedbackForm viewedThemes={viewedThemes} />
                </div>
            </div>
        </main>
    )
}
