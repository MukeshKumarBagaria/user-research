'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'
import ProgressTracker from '@/components/ProgressTracker'
import { useLanguage } from '@/lib/LanguageContext'

export default function ReviewPage() {
    const { t, language } = useLanguage()

    const themes = [
        { key: 'green' as const, name: language === 'hi' ? 'हरी थीम' : 'Green Theme', pdfUrl: '/pdf/Green_proposal.pdf', color: 'green' as const },
        { key: 'purple' as const, name: language === 'hi' ? 'बैंगनी थीम' : 'Purple Theme', pdfUrl: '/pdf/Purple_proposal.pdf', color: 'purple' as const },
        { key: 'blue' as const, name: language === 'hi' ? 'नीली थीम' : 'Blue Theme', pdfUrl: '/pdf/Blue_proposal.pdf', color: 'blue' as const },
    ]

    const [viewedThemes, setViewedThemes] = useState({
        green: false,
        purple: false,
        blue: false,
    })
    const [currentTheme, setCurrentTheme] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load progress from localStorage
    useEffect(() => {
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

    // Save progress to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('viewed_themes', JSON.stringify(viewedThemes))
        }
    }, [viewedThemes, isLoaded])

    const handleMarkViewed = (themeKey: 'green' | 'purple' | 'blue') => {
        setViewedThemes((prev) => ({ ...prev, [themeKey]: true }))

        // Auto-advance to next theme if not last
        if (currentTheme < themes.length - 1) {
            setTimeout(() => {
                setCurrentTheme((prev) => prev + 1)
            }, 300)
        }
    }

    const allViewed = viewedThemes.green && viewedThemes.purple && viewedThemes.blue

    if (!isLoaded) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-slate-200 border-t-indigo-600"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-3 sm:p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-1 sm:mb-2 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                {t('review.backHome')}
                            </Link>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">{t('review.title')}</h1>
                        </div>

                        {allViewed && (
                            <Link href="/feedback" className="btn-success inline-flex items-center justify-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                                {t('review.proceedFeedback')}
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Progress Tracker */}
                <ProgressTracker viewedThemes={viewedThemes} />

                {/* Theme Tabs */}
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {themes.map((theme, index) => (
                        <button
                            key={theme.key}
                            onClick={() => setCurrentTheme(index)}
                            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${currentTheme === index
                                ? 'bg-white text-slate-800 border border-slate-200 shadow-md'
                                : 'bg-slate-100 text-slate-500 border border-transparent hover:bg-white hover:shadow-sm'
                                }`}
                        >
                            <div
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: theme.color === 'green' ? '#22c55e' : theme.color === 'purple' ? '#a855f7' : '#3b82f6' }}
                            />
                            <span className="hidden xs:inline">{theme.name}</span>
                            <span className="xs:hidden">{index + 1}</span>
                            {viewedThemes[theme.key] && (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                {/* PDF Viewer */}
                <div className="animate-fade-in" key={currentTheme}>
                    <PDFViewer
                        pdfUrl={themes[currentTheme].pdfUrl}
                        themeName={themes[currentTheme].name}
                        themeColor={themes[currentTheme].color}
                        onViewed={() => handleMarkViewed(themes[currentTheme].key)}
                        isViewed={viewedThemes[themes[currentTheme].key]}
                    />
                </div>

                {/* Navigation Buttons - More Visible */}
                <div className="flex justify-between gap-3 mt-4 sm:mt-6">
                    <button
                        onClick={() => setCurrentTheme((prev) => Math.max(0, prev - 1))}
                        disabled={currentTheme === 0}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('review.previous')}
                    </button>

                    {currentTheme < themes.length - 1 ? (
                        <button
                            onClick={() => setCurrentTheme((prev) => Math.min(themes.length - 1, prev + 1))}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                        >
                            {t('review.next')}
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : allViewed ? (
                        <Link href="/feedback" className="btn-success inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                            {t('review.proceedFeedback')}
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    ) : (
                        <div className="px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 text-xs sm:text-sm font-medium">
                            {t('review.viewAll')}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
