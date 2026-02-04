'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

interface ImageViewerProps {
    imageUrl: string
    themeName: string
    themeColor: 'green' | 'purple' | 'blue'
}

const bgGradients = {
    green: 'from-green-100 to-emerald-100',
    purple: 'from-purple-100 to-violet-100',
    blue: 'from-blue-100 to-indigo-100',
}

const borderColors = {
    green: '#22c55e',
    purple: '#a855f7',
    blue: '#3b82f6',
}

export default function ImageViewer({ imageUrl, themeName, themeColor }: ImageViewerProps) {
    const { language } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isZoomed, setIsZoomed] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)

    // Reset loading state when image changes
    useEffect(() => {
        setLoading(true)
        setIsZoomed(true)
    }, [imageUrl])

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

    const toggleZoom = () => {
        setIsZoomed(!isZoomed)
    }

    const zoomText = language === 'hi' ? (isZoomed ? 'ज़ूम आउट' : 'ज़ूम इन') : (isZoomed ? 'Zoom Out' : 'Zoom In')
    const fullscreenText = language === 'hi' ? 'पूर्ण स्क्रीन' : 'Fullscreen'
    const loadingText = language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'

    return (
        <div
            ref={containerRef}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${isFullscreen ? 'rounded-none bg-white' : ''}`}
            style={{ borderColor: borderColors[themeColor], borderWidth: '2px' }}
        >
            {/* Header */}
            <div className={`px-3 sm:px-6 py-2.5 sm:py-4 bg-gradient-to-r ${bgGradients[themeColor]} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: borderColors[themeColor] }} />
                    <h3 className="text-sm sm:text-xl font-bold text-slate-800">{themeName}</h3>
                </div>
                <div className="flex items-center gap-2">
                    {/* Zoom Button */}
                    <button
                        onClick={toggleZoom}
                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isZoomed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            )}
                        </svg>
                        <span className="hidden sm:inline">{zoomText}</span>
                    </button>

                    {/* Fullscreen Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span className="hidden sm:inline">{fullscreenText}</span>
                    </button>
                </div>
            </div>

            {/* Image Viewer Container */}
            <div
                ref={imageContainerRef}
                className={`relative bg-slate-50 overflow-auto transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                style={{
                    height: isFullscreen ? 'calc(100vh - 80px)' : '70vh',
                    minHeight: '350px'
                }}
                onClick={toggleZoom}
            >
                {/* Loading Indicator */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-indigo-600"></div>
                            <p className="text-slate-500 text-sm">{loadingText}</p>
                        </div>
                    </div>
                )}

                {/* Image */}
                <div className={`w-full flex items-start justify-center ${isZoomed ? 'p-4' : 'p-0'}`}>
                    <Image
                        src={imageUrl}
                        alt={`${themeName} Color Proposal`}
                        width={1920}
                        height={2400}
                        className="transition-all duration-500 w-full h-auto"
                        style={{
                            maxWidth: isZoomed ? 'none' : '100%',
                            width: isZoomed ? '150%' : '100%',
                        }}
                        onLoad={() => setLoading(false)}
                        priority
                        quality={90}
                    />
                </div>
            </div>
        </div>
    )
}
