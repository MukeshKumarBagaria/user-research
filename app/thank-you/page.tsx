'use client'

import Link from 'next/link'

export default function ThankYouPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Success Animation */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center animate-pulse-slow">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-green-500/30 animate-ping"></div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-8 animate-slide-up">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Thank You! 🎉
                    </h1>

                    <p className="text-xl text-white/70 mb-6">
                        Your feedback has been submitted successfully.
                    </p>

                    <p className="text-white/50 mb-8">
                        We appreciate you taking the time to review our design themes.
                        Your input will help us create a better user experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Fun fact */}
                <p className="text-white/30 text-sm mt-8">
                    💡 Your response is anonymous and helps shape our product design.
                </p>
            </div>
        </main>
    )
}
