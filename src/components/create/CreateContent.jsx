import React, { useState, useCallback } from 'react'
import { 
  Wand2, 
  Copy, 
  CheckCheck, 
  RefreshCw, 
  Save, 
  Sparkles,
  Loader2
} from 'lucide-react'
import PromptEditor from './PromptEditor'
import ContentForm from './ContentForm'
import PlatformSelector from './PlatformSelector'
import PhoneMockup from './PhoneMockup'
import OutputDetails from './OutputDetails'

/* ─── Mock generated content (simulates AI output) ─── */
const mockGeneratedContent = {
  hook: '"You won\'t believe this $20 teeth whitening hack actually works…"',
  body: 'Most over-the-counter whitening strips damage your enamel — but this dentist-approved method uses carbamide peroxide (the same ingredient pros use) at a safe concentration. Apply for just 15 minutes daily. No sensitivity, no damage, real results in 2 weeks.',
  cta: '📩 DM us "BRIGHT" for a free shade consultation — limited spots this month!',
  caption: 'Stop wasting money on whitening products that don\'t work (or worse — damage your teeth). Here\'s the method we actually recommend to our patients. Safe, effective, and you can do it at home. 🦷✨ Results in just 14 days.',
  hashtags: '#TeethWhitening #DentalTips #SmileMakeover #OralHealth #DentistApproved #BrightSmile #HealthyTeeth',
  script: `[HOOK - 0:00] "You won't believe this $20 teeth whitening hack actually works…"

[INTRO - 0:03] "I'm Dr. Sarah at BrightSmile Dental, and I'm going to show you the safest, most effective way to whiten your teeth at home."

[BODY - 0:10] "Step 1: Brush gently with a soft-bristled brush. Step 2: Apply a thin layer of carbamide peroxide gel — same ingredient dentists use, but at a safe concentration. Step 3: Wait 15 minutes. No more, no less."

[RESULTS - 0:35] "Here's my patient's before shot… and here she is after just 2 weeks."

[CTA - 0:45] "DM us 'BRIGHT' for a free shade consultation. Follow for more dental tips that actually work! 🦷"`,
  hookVariations: [
    '"I\'ve been a dentist for 12 years — here\'s the one whitening trick I tell every patient…"',
    '"Your dentist doesn\'t want you to know this $20 whitening secret…" (just kidding — we do! Here it is.)',
    '"POV: You just discovered you\'ve been whitening your teeth wrong your entire life 😳"',
  ]
}

export default function CreateContent() {
  /* ─── State ─── */
  const [prompt, setPrompt] = useState(
    'Create a short-form video script promoting professional teeth whitening services. The content should educate viewers on why professional whitening is safer and more effective than DIY methods. Include a compelling hook, key benefits, and a clear call to action for booking.'
  )
  const [inputs, setInputs] = useState({
    clinicName: 'BrightSmile Dental',
    location: 'Los Angeles, CA',
    audience: 'young-adults',
    goal: 'bookings',
    tone: 'friendly',
    avatarImage: null,
  })
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const [generatedContent, setGeneratedContent] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [caption, setCaption] = useState('')
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)
  const [savedDraft, setSavedDraft] = useState(false)

  /* ─── Handlers ─── */
  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedContent(mockGeneratedContent)
      setCaption(mockGeneratedContent.caption)
      setIsGenerating(false)
    }, 2200)
  }, [])

  const handleRegenerate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedContent({
        ...mockGeneratedContent,
        hook: '"What if I told you the teeth whitening products you\'re buying are actually ruining your enamel?"',
        caption: 'The #1 mistake people make with teeth whitening? Using harsh chemicals from the drugstore. Here\'s what dentists actually recommend — and it costs less than your streaming subscription. 🦷💡',
      })
      setCaption('The #1 mistake people make with teeth whitening? Using harsh chemicals from the drugstore. Here\'s what dentists actually recommend — and it costs less than your streaming subscription. 🦷💡')
      setIsGenerating(false)
    }, 1800)
  }, [])

  const copyToClipboard = useCallback((text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'caption') {
      setCopiedCaption(true)
      setTimeout(() => setCopiedCaption(false), 2500)
    } else {
      setCopiedScript(true)
      setTimeout(() => setCopiedScript(false), 2500)
    }
  }, [])

  const handleSaveDraft = useCallback(() => {
    setSavedDraft(true)
    setTimeout(() => setSavedDraft(false), 2500)
  }, [])

  /* ─── Preview content object passed to phone ─── */
  const previewContent = generatedContent ? {
    ...generatedContent,
    clinicName: inputs.clinicName,
    location: inputs.location,
  } : {
    hook: '',
    cta: '',
    caption: '',
    hashtags: '',
    clinicName: inputs.clinicName,
    location: inputs.location,
  }

  return (
    /* Page wrapper — same pattern as Dashboard.jsx and Discover.jsx */
    <div className="p-6 lg:p-10 transition-colors">
      {/* Page header — matching Discover */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Content</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Generate AI-powered social content with live platform previews
        </p>
      </div>

      {/* Two-column layout — responsive grid matching dashboard conventions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ═══ LEFT PANEL (40% ≈ 2/5) — Input ═══ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Prompt Editor */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <PromptEditor value={prompt} onChange={setPrompt} />
          </div>

          {/* Card: Form Fields */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content Settings</span>
            </div>
            <ContentForm inputs={inputs} onChange={setInputs} />
          </div>

          {/* Generate Button — primary action, existing button pattern */}
          <button
            onClick={generatedContent ? handleRegenerate : handleGenerate}
            disabled={isGenerating}
            className={`w-full flex items-center justify-center gap-2.5 h-12 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg ${
              isGenerating
                ? 'bg-brand-400 text-white/80 cursor-not-allowed shadow-brand-500/10'
                : 'bg-brand-500 text-white hover:bg-brand-600 shadow-brand-500/20 active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : generatedContent ? (
              <>
                <RefreshCw size={18} />
                Regenerate
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* ═══ RIGHT PANEL (60% ≈ 3/5) — Preview ═══ */}
        <div className="lg:col-span-3 space-y-6">
          {/* Card: Platform Selector + Phone Mockup */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={14} className="text-brand-500" />
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Live Preview</span>
            </div>

            <PlatformSelector selected={selectedPlatform} onSelect={setSelectedPlatform} />

            {/* Phone Mockup */}
            {generatedContent ? (
              <PhoneMockup
                platform={selectedPlatform}
                content={previewContent}
                caption={caption}
                onCaptionChange={setCaption}
              />
            ) : (
              /* Empty state — before generation */
              <div className="flex justify-center py-4">
                <div className="w-[280px] aspect-[9/16] rounded-[2.5rem] border-[3px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
                      <Wand2 size={22} className="text-brand-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Preview will appear here</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Generate content to see a live preview</p>
                  </div>
                </div>
              </div>
            )}

            {/* Editable caption hint */}
            {generatedContent && (
              <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                💡 Click on the caption inside the preview to edit it directly
              </p>
            )}
          </div>

          {/* Output Details — collapsible sections */}
          {generatedContent && (
            <OutputDetails content={generatedContent} />
          )}

          {/* Action Buttons — reuse existing button patterns */}
          {generatedContent && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => copyToClipboard(caption || generatedContent.caption, 'caption')}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all ${
                  copiedCaption
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {copiedCaption ? <CheckCheck size={16} /> : <Copy size={16} />}
                {copiedCaption ? 'Copied!' : 'Caption'}
              </button>

              <button
                onClick={() => copyToClipboard(generatedContent.script, 'script')}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all ${
                  copiedScript
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {copiedScript ? <CheckCheck size={16} /> : <Copy size={16} />}
                {copiedScript ? 'Copied!' : 'Script'}
              </button>

              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all disabled:opacity-50"
              >
                <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
                Regenerate
              </button>

              <button
                onClick={handleSaveDraft}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all ${
                  savedDraft
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {savedDraft ? <CheckCheck size={16} /> : <Save size={16} />}
                {savedDraft ? 'Saved!' : 'Save Draft'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
