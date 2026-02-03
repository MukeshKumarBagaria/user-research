'use client'

import { useState } from 'react'

interface PDFViewerProps {
    pdfUrl: string
    themeName: string
    themeColor: 'green' | 'purple' | 'blue'
    onViewed: () => void
    isViewed: boolean
}

const colorClasses = {
    green: 'border-theme-green',
    purple: 'border-theme-purple',
    blue: 'border-theme-blue',
}

const bgGradients = {
    green: 'from-green-500/20 to-emerald-600/20',
    purple: 'from-purple-500/20 to-violet-600/20',
    blue: 'from-blue-500/20 to-indigo-600/20',
}

export default function PDFViewer({ pdfUrl, themeName, themeColor, onViewed, isViewed }: PDFViewerProps) {
    const [loading, setLoading] = useState(true)

    return (
        <div className={`glass-card rounded-2xl overflow-hidden border-2 ${colorClasses[themeColor]} transition-all duration-500`}>
            {/* Header */}
            <div className={`px-6 py-4 bg-gradient-to-r ${bgGradients[themeColor]} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-${themeColor === 'green' ? 'green' : themeColor === 'purple' ? 'purple' : 'blue'}-500`}
                        style={{ backgroundColor: themeColor === 'green' ? '#22c55e' : themeColor === 'purple' ? '#a855f7' : '#3b82f6' }} />
                    <h3 className="text-xl font-bold text-white">{themeName}</h3>
                </div>
                {isViewed && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Viewed</span>
                    </div>
                )}
            </div>

            {/* PDF Viewer */}
            <div className="pdf-container relative" style={{ height: '500px' }}>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
                    </div>
                )}
                <iframe
                    src={pdfUrl}
                    className="w-full h-full"
                    onLoad={() => setLoading(false)}
                    title={`${themeName} PDF Preview`}
                />
            </div>

            {/* Mark as Viewed Button */}
            {!isViewed && (
                <div className="p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                    <button
                        onClick={onViewed}
                        className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02]"
                        style={{
                            background: themeColor === 'green'
                                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                : themeColor === 'purple'
                                    ? 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
                                    : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            boxShadow: themeColor === 'green'
                                ? '0 4px 15px rgba(34, 197, 94, 0.4)'
                                : themeColor === 'purple'
                                    ? '0 4px 15px rgba(168, 85, 247, 0.4)'
                                    : '0 4px 15px rgba(59, 130, 246, 0.4)',
                        }}
                    >
                        ✓ Mark as Viewed
                    </button>
                </div>
            )}
        </div>
    )
}
