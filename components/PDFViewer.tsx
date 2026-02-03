'use client'

import { useState, useRef } from 'react'

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
    green: 'from-green-100 to-emerald-100',
    purple: 'from-purple-100 to-violet-100',
    blue: 'from-blue-100 to-indigo-100',
}

export default function PDFViewer({ pdfUrl, themeName, themeColor, onViewed, isViewed }: PDFViewerProps) {
    const [loading, setLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Hide toolbar by appending parameters to PDF URL
    const pdfUrlWithParams = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`

    const toggleFullscreen = async () => {
        if (!containerRef.current) return

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen()
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    return (
        <div
            ref={containerRef}
            className={`glass-card rounded-2xl overflow-hidden border-2 ${colorClasses[themeColor]} transition-all duration-500 ${isFullscreen ? 'rounded-none bg-white' : ''}`}
        >
            {/* Header */}
            <div className={`px-6 py-4 bg-gradient-to-r ${bgGradients[themeColor]} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: themeColor === 'green' ? '#22c55e' : themeColor === 'purple' ? '#a855f7' : '#3b82f6' }} />
                    <h3 className="text-xl font-bold text-slate-800">{themeName}</h3>
                </div>
                <div className="flex items-center gap-3">
                    {/* Fullscreen Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 hover:bg-white text-slate-600 transition-all duration-300"
                        title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                    >
                        {isFullscreen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        )}
                        <span className="text-sm font-medium hidden sm:inline">
                            {isFullscreen ? 'Exit' : 'Fullscreen'}
                        </span>
                    </button>
                    {isViewed && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium">Viewed</span>
                        </div>
                    )}
                </div>
            </div>

            {/* PDF Viewer */}
            <div className="pdf-container relative" style={{ height: isFullscreen ? 'calc(100vh - 140px)' : '500px' }}>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
                    </div>
                )}
                <iframe
                    src={pdfUrlWithParams}
                    className="w-full h-full"
                    onLoad={() => setLoading(false)}
                    title={`${themeName} PDF Preview`}
                />
            </div>

            {/* Mark as Viewed Button */}
            {!isViewed && (
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100">
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
