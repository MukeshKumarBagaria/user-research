'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'
import { useLanguage } from '@/lib/LanguageContext'

export default function ReviewPage() {
    const { t, language } = useLanguage()

    const themes = [
        { key: 'green' as const, name: language === 'hi' ? 'हरा' : 'Green', pdfUrl: '/pdf/Green_proposal.pdf', color: 'green' as const },
        { key: 'purple' as const, name: language === 'hi' ? 'बैंगनी' : 'Purple', pdfUrl: '/pdf/Purple_proposal.pdf', color: 'purple' as const },
        { key: 'blue' as const, name: language === 'hi' ? 'नीला' : 'Blue', pdfUrl: '/pdf/Blue_proposal.pdf', color: 'blue' as const },
    ]

    const [currentTheme, setCurrentTheme] = useState(0)

    // Preload all PDFs on mount for faster switching
    useEffect(() => {
        themes.forEach((theme) => {
            // Create link elements for preloading
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.href = theme.pdfUrl
            link.as = 'document'
            document.head.appendChild(link)
        })
    }, [])

    return (
        <main className="min-h-screen p-3 sm:p-4 lg:p-8 pb-24">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-1 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                {t('review.backHome')}
                            </Link>
                            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-800">{t('review.title')}</h1>
                        </div>

                        <Link href="/feedback" className="btn-success inline-flex items-center justify-center gap-2 text-sm px-4 py-2.5">
                            {t('review.proceedFeedback')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Theme Tabs - Single Row */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {themes.map((theme, index) => (
                        <button
                            key={theme.key}
                            onClick={() => setCurrentTheme(index)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm ${currentTheme === index
                                ? 'bg-white text-slate-800 border border-slate-200 shadow-md'
                                : 'bg-slate-100 text-slate-500 border border-transparent hover:bg-white hover:shadow-sm'
                                }`}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.color === 'green' ? '#22c55e' : theme.color === 'purple' ? '#a855f7' : '#3b82f6' }}
                            />
                            <span>{theme.name}</span>
                        </button>
                    ))}
                </div>

                {/* PDF Viewer */}
                <div className="animate-fade-in" key={currentTheme}>
                    <PDFViewer
                        pdfUrl={themes[currentTheme].pdfUrl}
                        themeName={themes[currentTheme].name}
                        themeColor={themes[currentTheme].color}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-3 mt-4">
                    <button
                        onClick={() => setCurrentTheme((prev) => Math.max(0, prev - 1))}
                        disabled={currentTheme === 0}
                        className="px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('review.previous')}
                    </button>

                    {currentTheme < themes.length - 1 ? (
                        <button
                            onClick={() => setCurrentTheme((prev) => Math.min(themes.length - 1, prev + 1))}
                            className="px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                        >
                            {t('review.next')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <Link href="/feedback" className="btn-success inline-flex items-center gap-2 text-sm px-4 py-2.5">
                            {t('review.proceedFeedback')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}
