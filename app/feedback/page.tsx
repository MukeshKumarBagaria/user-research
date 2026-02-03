'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FeedbackForm from '@/components/FeedbackForm'

export default function FeedbackPage() {
    const router = useRouter()
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
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
            </main>
        )
    }

    // Already submitted
    if (hasSubmitted) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Already Submitted</h1>
                    <p className="text-slate-500 mb-6">
                        You have already submitted your feedback in this session.
                    </p>
                    <Link href="/thank-you" className="btn-primary inline-block">
                        View Confirmation
                    </Link>
                </div>
            </main>
        )
    }

    // Not all themes viewed
    if (!allViewed) {
        const remaining: string[] = [
            !viewedThemes.green ? 'Green' : null,
            !viewedThemes.purple ? 'Purple' : null,
            !viewedThemes.blue ? 'Blue' : null,
        ].filter((theme): theme is string => theme !== null)

        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Feedback Locked</h1>
                    <p className="text-slate-500 mb-4">
                        Please review all themes before submitting feedback.
                    </p>
                    <div className="mb-6">
                        <p className="text-slate-400 text-sm mb-2">Remaining themes:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {remaining.map((theme) => (
                                <span key={theme} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Link href="/review" className="btn-primary inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Continue Review
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-4 sm:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/review" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Review
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Submit Your Feedback</h1>
                    <p className="text-slate-500">Thank you for reviewing all themes. Please share your preference below.</p>
                </div>

                {/* Success Indicator */}
                <div className="glass-card rounded-xl p-4 mb-8 flex items-center gap-4 border border-green-200 bg-green-50">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-green-700">All Themes Reviewed</h3>
                        <p className="text-green-600 text-sm">You can now submit your feedback</p>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                    <FeedbackForm viewedThemes={viewedThemes} />
                </div>
            </div>
        </main>
    )
}
