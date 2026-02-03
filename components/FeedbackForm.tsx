'use client'

import { useState } from 'react'
import { supabase, FeedbackData } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface FeedbackFormProps {
    viewedThemes: {
        green: boolean
        purple: boolean
        blue: boolean
    }
}

const themeOptions = [
    { value: 'green' as const, label: 'Green Theme', color: '#22c55e' },
    { value: 'purple' as const, label: 'Purple Theme', color: '#a855f7' },
    { value: 'blue' as const, label: 'Blue Theme', color: '#3b82f6' },
]

export default function FeedbackForm({ viewedThemes }: FeedbackFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        preferred_color: '' as 'green' | 'purple' | 'blue' | '',
        remark: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const isFormValid = formData.name.trim() && formData.department.trim() && formData.preferred_color

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return

        // Check if already submitted in this session
        const hasSubmitted = localStorage.getItem('feedback_submitted')
        if (hasSubmitted) {
            setError('You have already submitted feedback in this session.')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const feedbackData: FeedbackData = {
                name: formData.name.trim(),
                department: formData.department.trim(),
                preferred_color: formData.preferred_color as 'green' | 'purple' | 'blue',
                remark: formData.remark.trim() || undefined,
                viewed_green: viewedThemes.green,
                viewed_purple: viewedThemes.purple,
                viewed_blue: viewedThemes.blue,
            }

            const { error: supabaseError } = await supabase
                .from('design_feedback')
                .insert([feedbackData])

            if (supabaseError) throw supabaseError

            // Mark as submitted
            localStorage.setItem('feedback_submitted', 'true')

            // Clear progress
            localStorage.removeItem('viewed_themes')

            router.push('/thank-you')
        } catch (err) {
            console.error('Submission error:', err)
            setError('Failed to submit feedback. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Full Name <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter your full name"
                    required
                />
            </div>

            {/* Department Field */}
            <div>
                <label htmlFor="department" className="block text-sm font-medium text-white/80 mb-2">
                    Department <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="input-field"
                    placeholder="Enter your department"
                    required
                />
            </div>

            {/* Preferred Theme Selection */}
            <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                    Preferred Color Theme <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {themeOptions.map((theme) => (
                        <label
                            key={theme.value}
                            className={`radio-card ${formData.preferred_color === theme.value ? 'selected' : ''}`}
                            style={formData.preferred_color === theme.value ? { borderColor: theme.color, background: `${theme.color}20` } : {}}
                        >
                            <input
                                type="radio"
                                name="preferred_color"
                                value={theme.value}
                                checked={formData.preferred_color === theme.value}
                                onChange={(e) => setFormData({ ...formData, preferred_color: e.target.value as 'green' | 'purple' | 'blue' })}
                            />
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-6 h-6 rounded-full ring-2 ring-white/20"
                                    style={{ backgroundColor: theme.color }}
                                />
                                <span className="font-medium text-white">{theme.label}</span>
                            </div>
                            {formData.preferred_color === theme.value && (
                                <div className="absolute top-2 right-2">
                                    <svg className="w-5 h-5" style={{ color: theme.color }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Remarks Field */}
            <div>
                <label htmlFor="remark" className="block text-sm font-medium text-white/80 mb-2">
                    Additional Remarks <span className="text-white/40">(optional)</span>
                </label>
                <textarea
                    id="remark"
                    value={formData.remark}
                    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Share any additional thoughts about the designs..."
                    rows={4}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="btn-success w-full text-lg"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        Submitting...
                    </span>
                ) : (
                    'Submit Feedback'
                )}
            </button>
        </form>
    )
}
