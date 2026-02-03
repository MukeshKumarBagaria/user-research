'use client'

import { useLanguage } from '@/lib/LanguageContext'

interface ProgressTrackerProps {
    viewedThemes: {
        green: boolean
        purple: boolean
        blue: boolean
    }
}

export default function ProgressTracker({ viewedThemes }: ProgressTrackerProps) {
    const { t } = useLanguage()

    const themes = [
        { key: 'green' as const, label: t('progress.green'), color: '#22c55e' },
        { key: 'purple' as const, label: t('progress.purple'), color: '#a855f7' },
        { key: 'blue' as const, label: t('progress.blue'), color: '#3b82f6' },
    ]

    const viewedCount = Object.values(viewedThemes).filter(Boolean).length

    return (
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-700">{t('progress.title')}</h3>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {viewedCount}/3
                </span>
            </div>

            {/* Progress Bar with Labels - Fixed Alignment */}
            <div className="flex items-start justify-between mb-4">
                {themes.map((theme, index) => (
                    <div key={theme.key} className="flex flex-col items-center" style={{ flex: '1 1 0' }}>
                        {/* Step Circle */}
                        <div className="flex items-center w-full">
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 mx-auto ${viewedThemes[theme.key] ? '' : 'bg-slate-100 border-2 border-slate-200 text-slate-400'
                                    }`}
                                style={viewedThemes[theme.key] ? { background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}dd 100%)`, borderColor: theme.color, color: 'white' } : {}}
                            >
                                {viewedThemes[theme.key] ? (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                        </div>

                        {/* Theme Label - Properly Centered */}
                        <div className="flex flex-col items-center mt-2">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mb-1"
                                style={{ backgroundColor: theme.color }}
                            />
                            <span className={`text-xs sm:text-sm text-center ${viewedThemes[theme.key] ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                                {theme.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Connecting Lines - Positioned separately */}
            <div className="relative -mt-[4.5rem] sm:-mt-[5rem] mb-12 px-8 sm:px-12">
                <div className="flex items-center h-1">
                    <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${viewedThemes.green ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-slate-200'}`} />
                    <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${viewedThemes.purple ? 'bg-gradient-to-r from-purple-500 to-purple-400' : 'bg-slate-200'}`} />
                </div>
            </div>

            {/* Status Message */}
            <div className="pt-2 sm:pt-4 border-t border-slate-200">
                {viewedCount === 3 ? (
                    <p className="text-green-600 text-center font-medium text-sm sm:text-base">
                        ✓ {t('progress.complete')}
                    </p>
                ) : (
                    <p className="text-slate-500 text-center text-sm sm:text-base">
                        {t('progress.remaining')}
                    </p>
                )}
            </div>
        </div>
    )
}
