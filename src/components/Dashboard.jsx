import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wand2,
  Megaphone,
  CalendarRange,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react'

/* ─── Three focused action cards ─── */
const actionCards = [
  {
    title: 'Create Content',
    description: 'Discover ideas and generate high-performing social content using AI.',
    cta: 'Start Creating',
    path: '/content/create',
    icon: Wand2,
    iconBg: 'bg-brand-50 dark:bg-brand-500/10',
    iconColor: 'text-brand-500',
    borderHover: 'hover:border-brand-500/30',
  },
  {
    title: 'Promote & Manage Ads',
    description: 'Run and optimize paid campaigns across Facebook, Instagram, and TikTok.',
    cta: 'Manage Ads',
    path: '/content/ads',
    icon: Megaphone,
    iconBg: 'bg-success-50 dark:bg-success-500/10',
    iconColor: 'text-success-600',
    borderHover: 'hover:border-success-500/30',
  },
  {
    title: 'Content Planning',
    description: 'Schedule posts, manage drafts, and stay consistent across all platforms.',
    cta: 'Open Calendar',
    path: '/content/schedule',
    icon: CalendarRange,
    iconBg: 'bg-warning-50 dark:bg-warning-500/10',
    iconColor: 'text-warning-500',
    borderHover: 'hover:border-warning-500/30',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="p-6 lg:p-10 transition-colors">

      {/* ═══ 1. HERO DECISION CARD ═══ */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-brand-500/20 bg-white dark:bg-white/[0.03] p-8 lg:p-10">
        {/* Subtle gradient backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 60% -10%, #465fff 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: text */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50 dark:bg-brand-500/10 px-3.5 py-1">
              <Sparkles size={13} className="text-brand-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">AI-Powered</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
              Start Growing Your Content
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              AI helps you discover ideas, create content, manage ads, and schedule posts — all from one workflow.
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/content/create')}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/content/discover')}
              className="flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all"
            >
              Explore All Tools
            </button>
          </div>
        </div>
      </div>

      {/* ═══ 2. THREE ACTION CARDS ═══ */}
      <div className="mb-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-5">
          Choose Your Direction
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {actionCards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`group text-left rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] ${card.borderHover}`}
            >
              {/* Icon */}
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5 ${card.iconBg}`}>
                <Icon size={20} className={card.iconColor} />
              </div>

              {/* Text */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{card.description}</p>

              {/* CTA link */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                {card.cta}
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
