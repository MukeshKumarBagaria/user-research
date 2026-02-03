'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'
import ProgressTracker from '@/components/ProgressTracker'

const themes = [
    { key: 'green' as const, name: 'Green Theme', pdfUrl: '/pdf/Green_proposal.pdf', color: 'green' as const },
    { key: 'purple' as const, name: 'Purple Theme', pdfUrl: '/pdf/Purple_proposal.pdf', color: 'purple' as const },
    { key: 'blue' as const, name: 'Blue Theme', pdfUrl: '/pdf/Blue_proposal.pdf', color: 'blue' as const },
]

export default function ReviewPage() {
    const router = useRouter()
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
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">Review Themes</h1>
                    </div>

                    {allViewed && (
                        <Link href="/feedback" className="btn-success inline-flex items-center gap-2">
                            Proceed to Feedback
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Progress Tracker */}
                <ProgressTracker viewedThemes={viewedThemes} />

                {/* Theme Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {themes.map((theme, index) => (
                        <button
                            key={theme.key}
                            onClick={() => setCurrentTheme(index)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${currentTheme === index
                                    ? 'bg-white/10 text-white border border-white/20'
                                    : 'bg-white/5 text-white/60 border border-transparent hover:bg-white/10'
                                }`}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.color === 'green' ? '#22c55e' : theme.color === 'purple' ? '#a855f7' : '#3b82f6' }}
                            />
                            {theme.name}
                            {viewedThemes[theme.key] && (
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Navigation Hints */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setCurrentTheme((prev) => Math.max(0, prev - 1))}
                        disabled={currentTheme === 0}
                        className="px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    {currentTheme < themes.length - 1 ? (
                        <button
                            onClick={() => setCurrentTheme((prev) => Math.min(themes.length - 1, prev + 1))}
                            className="px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                        >
                            Next
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : allViewed ? (
                        <Link href="/feedback" className="btn-success inline-flex items-center gap-2">
                            Proceed to Feedback
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    ) : (
                        <div className="px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm">
                            Please view all themes to continue
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
