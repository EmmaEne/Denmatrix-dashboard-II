import React, { useState, useRef } from 'react'
import { 
  Users, 
  Upload, 
  Video, 
  Trash2, 
  Plus, 
  Check, 
  Mic, 
  Volume2, 
  Sparkles,
  Loader2,
  Image as ImageIcon,
  MoreVertical,
  Play
} from 'lucide-react'

const cardClass = "rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200"
const buttonBaseClass = "flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
const primaryButtonClass = `${buttonBaseClass} bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20`
const secondaryButtonClass = `${buttonBaseClass} border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700`

const initialAvatars = [
  {
    id: '1',
    name: 'Sarah - Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    type: 'Photo-Real',
    status: 'ready'
  },
  {
    id: '2',
    name: 'James - Friendly',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    type: 'Photo-Real',
    status: 'ready'
  }
]

const initialVoices = [
  {
    id: 'v1',
    name: 'Natural Female - Energetic',
    language: 'English (US)',
    previewUrl: '#'
  },
  {
    id: 'v2',
    name: 'Natural Male - Professional',
    language: 'English (US)',
    previewUrl: '#'
  }
]

export default function AvatarStudio({ onSelectAvatar }) {
  const [activeTab, setActiveTab] = useState('avatars') // 'avatars' | 'voices'
  const [avatars, setAvatars] = useState(initialAvatars)
  const [voices, setVoices] = useState(initialVoices)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStep, setUploadStep] = useState('idle') // 'idle' | 'uploading' | 'processing' | 'success'
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStep('uploading')
    setIsUploading(true)

    // Simulate upload and processing
    setTimeout(() => {
      setUploadStep('processing')
      setTimeout(() => {
        const newAvatar = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name.split('.')[0] || 'New Avatar',
          image: URL.createObjectURL(file),
          type: 'Custom',
          status: 'ready'
        }
        setAvatars([newAvatar, ...avatars])
        setUploadStep('success')
        setIsUploading(false)
        setTimeout(() => setUploadStep('idle'), 2000)
      }, 3000)
    }, 1500)
  }

  const deleteAvatar = (id) => {
    setAvatars(avatars.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Studio Navigation */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('avatars')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'avatars'
              ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          My Avatars
        </button>
        <button
          onClick={() => setActiveTab('voices')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'voices'
              ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Voice Library
        </button>
      </div>

      {activeTab === 'avatars' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Upload Card */}
          <div className={`${cardClass} lg:col-span-1 border-dashed border-2 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
            {uploadStep === 'idle' && (
              <>
                <div className="w-16 h-16 mb-4 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500">
                  <Plus size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Create New Avatar</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">
                  Upload a photo or a 10-second video of yourself to create a digital twin.
                </p>
                <div className="flex flex-col w-full gap-3 px-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={primaryButtonClass}
                  >
                    <ImageIcon size={18} />
                    Upload Image
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={secondaryButtonClass}
                  >
                    <Video size={18} />
                    Upload Video
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*,video/*"
                />
              </>
            )}

            {(uploadStep === 'uploading' || uploadStep === 'processing') && (
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-brand-500/20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={32} className="text-brand-500 animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {uploadStep === 'uploading' ? 'Uploading Media...' : 'AI Processing...'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {uploadStep === 'uploading' 
                    ? 'Wait a moment while we upload your file.' 
                    : 'We are training your AI avatar. This usually takes a few seconds.'}
                </p>
              </div>
            )}

            {uploadStep === 'success' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Check size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Avatar Ready!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your new avatar has been added to your library.
                </p>
              </div>
            )}
          </div>

          {/* Avatar Library Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                My Saved Avatars ({avatars.length})
              </h3>
            </div>
            
            {avatars.length === 0 ? (
              <div className={`${cardClass} flex flex-col items-center justify-center py-20 text-center`}>
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                  <Users size={24} />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No avatars created yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {avatars.map((avatar) => (
                  <div key={avatar.id} className={`${cardClass} group relative hover:border-brand-500/30 hover:shadow-theme-md`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <img src={avatar.image} className="h-full w-full object-cover" alt={avatar.name} />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{avatar.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {avatar.type} • Ready to use
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <button 
                        onClick={() => onSelectAvatar && onSelectAvatar(avatar.image)}
                        className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        Use for Content
                      </button>
                      <button 
                        onClick={() => deleteAvatar(avatar.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Creator Card */}
          <div className={`${cardClass} lg:col-span-1 border-dashed border-2 flex flex-col items-center justify-center text-center`}>
            <div className="w-16 h-16 mb-4 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500">
              <Mic size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Clone Your Voice</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">
              Record a 30-second clip or upload a high-quality audio file to create a custom AI voice.
            </p>
            <div className="flex flex-col w-full gap-3 px-4">
              <button className={primaryButtonClass}>
                <Mic size={18} />
                Start Recording
              </button>
              <button className={secondaryButtonClass}>
                <Upload size={18} />
                Upload Audio
              </button>
            </div>
          </div>

          {/* Voice Library Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Voice Profiles ({voices.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {voices.map((voice) => (
                <div key={voice.id} className={`${cardClass} flex items-center justify-between hover:border-brand-500/30`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500">
                      <Volume2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{voice.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{voice.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
                      <Play size={16} fill="currentColor" />
                    </button>
                    <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 p-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
                <Sparkles size={16} className="text-brand-500" />
                Explore 50+ Pre-trained Voices
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
