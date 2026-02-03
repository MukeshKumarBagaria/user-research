'use client'

interface ProgressTrackerProps {
    viewedThemes: {
        green: boolean
        purple: boolean
        blue: boolean
    }
}

const themes = [
    { key: 'green' as const, label: 'Green', color: '#22c55e' },
    { key: 'purple' as const, label: 'Purple', color: '#a855f7' },
    { key: 'blue' as const, label: 'Blue', color: '#3b82f6' },
]

export default function ProgressTracker({ viewedThemes }: ProgressTrackerProps) {
    const viewedCount = Object.values(viewedThemes).filter(Boolean).length

    return (
        <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Review Progress</h3>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {viewedCount}/3
                </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center mb-6">
                {themes.map((theme, index) => (
                    <div key={theme.key} className="flex items-center flex-1">
                        <div
                            className={`progress-step ${viewedThemes[theme.key] ? 'completed' : ''}`}
                            style={viewedThemes[theme.key] ? { background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}dd 100%)`, borderColor: theme.color } : {}}
                        >
                            {viewedThemes[theme.key] ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <span className="text-white/60">{index + 1}</span>
                            )}
                        </div>
                        {index < themes.length - 1 && (
                            <div className={`progress-line ${viewedThemes[theme.key] ? 'completed' : ''}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Theme Labels */}
            <div className="flex justify-between">
                {themes.map((theme) => (
                    <div key={theme.key} className="flex flex-col items-center gap-1">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: theme.color }}
                        />
                        <span className={`text-sm ${viewedThemes[theme.key] ? 'text-white' : 'text-white/50'}`}>
                            {theme.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Status Message */}
            <div className="mt-4 pt-4 border-t border-white/10">
                {viewedCount === 3 ? (
                    <p className="text-green-400 text-center font-medium">
                        ✓ All themes reviewed! You can now proceed to feedback.
                    </p>
                ) : (
                    <p className="text-white/60 text-center">
                        Please review all {3 - viewedCount} remaining theme{3 - viewedCount !== 1 ? 's' : ''} to unlock the feedback form.
                    </p>
                )}
            </div>
        </div>
    )
}
