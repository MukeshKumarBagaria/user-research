'use client'

import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-3xl w-full">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 text-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        User Research Survey
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                        Theme Preference Survey
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Help us choose the perfect color theme for our application.
                        Your feedback is invaluable in creating the best user experience.
                    </p>
                </div>

                {/* Info Card */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        How It Works
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Review Three Themes</h3>
                                <p className="text-slate-500">View our carefully designed color themes: Green, Purple, and Blue</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Mark Each as Viewed</h3>
                                <p className="text-slate-500">Take your time to evaluate each design before marking it as viewed</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Submit Your Feedback</h3>
                                <p className="text-slate-500">After viewing all themes, share your preference with us</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Themes Preview */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-lg font-semibold text-slate-600 mb-4">Themes You'll Review</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-green-50 border border-green-200">
                            <div className="w-6 h-6 rounded-full bg-green-500"></div>
                            <span className="text-green-700 font-medium">Green Theme</span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-purple-50 border border-purple-200">
                            <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                            <span className="text-purple-700 font-medium">Purple Theme</span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-50 border border-blue-200">
                            <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                            <span className="text-blue-700 font-medium">Blue Theme</span>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <Link href="/review" className="btn-primary inline-flex items-center gap-3 text-lg">
                        Start Review
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <p className="text-slate-400 text-sm mt-4">Takes approximately 5 minutes</p>
                </div>
            </div>
        </main>
    )
}
