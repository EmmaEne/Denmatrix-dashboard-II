import React from 'react'
import { Building2, MapPin, Users, Target, Volume2 } from 'lucide-react'

const inputBaseClass = "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-500"

const selectBaseClass = "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-500 appearance-none cursor-pointer"

const labelClass = "flex items-center gap-2 mb-2"
const labelTextClass = "text-xs font-semibold text-gray-600 dark:text-gray-400"

export default function ContentForm({ inputs, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...inputs, [field]: value })
  }

  return (
    <div className="space-y-4">
      {/* Clinic Name */}
      <div>
        <div className={labelClass}>
          <Building2 size={14} className="text-gray-400" />
          <span className={labelTextClass}>Clinic Name</span>
        </div>
        <input
          type="text"
          value={inputs.clinicName}
          onChange={(e) => handleChange('clinicName', e.target.value)}
          className={inputBaseClass}
          placeholder="e.g. BrightSmile Dental"
        />
      </div>

      {/* Location */}
      <div>
        <div className={labelClass}>
          <MapPin size={14} className="text-gray-400" />
          <span className={labelTextClass}>Location</span>
        </div>
        <input
          type="text"
          value={inputs.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className={inputBaseClass}
          placeholder="e.g. Los Angeles, CA"
        />
      </div>

      {/* Target Audience */}
      <div>
        <div className={labelClass}>
          <Users size={14} className="text-gray-400" />
          <span className={labelTextClass}>Target Audience</span>
        </div>
        <div className="relative">
          <select
            value={inputs.audience}
            onChange={(e) => handleChange('audience', e.target.value)}
            className={selectBaseClass}
          >
            <option value="general">General Patients</option>
            <option value="parents">Parents with Kids</option>
            <option value="young-adults">Young Adults (18-35)</option>
            <option value="seniors">Seniors (55+)</option>
            <option value="cosmetic">Cosmetic-focused Patients</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div>
        <div className={labelClass}>
          <Target size={14} className="text-gray-400" />
          <span className={labelTextClass}>Goal</span>
        </div>
        <div className="relative">
          <select
            value={inputs.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            className={selectBaseClass}
          >
            <option value="awareness">Brand Awareness</option>
            <option value="bookings">Drive Bookings</option>
            <option value="education">Patient Education</option>
            <option value="trust">Build Trust & Authority</option>
            <option value="promotion">Promote a Service</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
          </div>
        </div>
      </div>

      {/* Tone */}
      <div className="pb-2">
        <div className={labelClass}>
          <Volume2 size={14} className="text-gray-400" />
          <span className={labelTextClass}>Tone</span>
        </div>
        <div className="relative">
          <select
            value={inputs.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
            className={selectBaseClass}
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly & Warm</option>
            <option value="playful">Playful & Fun</option>
            <option value="authoritative">Authoritative</option>
            <option value="empathetic">Empathetic & Caring</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
          </div>
        </div>
      </div>

      {/* AI Avatar / Presenter Image */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className={labelClass}>
          <Users size={14} className="text-brand-500" />
          <span className={labelTextClass}>AI Avatar / Presenter Image</span>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.01]">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center shrink-0">
            {inputs.avatarImage ? (
              <img src={inputs.avatarImage} className="h-full w-full object-cover" alt="Avatar Preview" />
            ) : (
              <Users size={24} className="text-gray-300" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-2">Upload the person to be used as the video presenter</p>
            <button 
              type="button"
              onClick={() => handleChange('avatarImage', 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=100&h=100&fit=crop')} 
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
            >
              Choose Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
