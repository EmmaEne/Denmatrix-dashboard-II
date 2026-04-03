import React from 'react'
import { 
  Compass, 
  PenTool, 
  Megaphone, 
  CalendarRange, 
  ArrowRight 
} from 'lucide-react'

const hubCards = [
  {
    title: 'Discover',
    subtitle: 'Content Ideas',
    description: 'Search and explore high-performing content ideas across platforms. Find trends and inspiration tailored to dental services.',
    cta: 'Browse Ideas',
    icon: Compass,
    color: 'blue'
  },
  {
    title: 'Create',
    subtitle: 'AI Generation',
    description: 'Generate scripts, ad creatives, captions, and short-form video content using AI.',
    cta: 'Start Creating',
    icon: PenTool,
    color: 'orange'
  },
  {
    title: 'Manage Ads',
    subtitle: 'Campaign Tracking',
    description: 'Organize, track, and optimize your ad campaigns. Monitor performance and adjust strategies in one place.',
    cta: 'Manage Ads',
    icon: Megaphone,
    color: 'green'
  },
  {
    title: 'Content Calendar',
    subtitle: 'Scheduling',
    description: 'Plan, schedule, and manage your content across platforms. Stay consistent and track publishing timelines.',
    cta: 'View Calendar',
    icon: CalendarRange,
    color: 'gray'
  }
]

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-10 transition-colors">
      {/* Section title - matching original "Quick Access Hub" style */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Choose Your Path</h2>
      </div>

      {/* Quick Access Row - matching original compact horizontal card style */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-10">
        {hubCards.map((card, i) => {
          const Icon = card.icon
          return (
            <a 
              key={i} 
              href={card.cta === 'Browse Ideas' ? '#/content/discover' : '#'}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-5 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                card.color === 'blue' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/10' : 
                card.color === 'orange' ? 'bg-warning-50 text-warning-500 dark:bg-warning-500/10' : 
                card.color === 'green' ? 'bg-success-50 text-success-600 dark:bg-success-500/10' : 
                'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400'
              }`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.subtitle}</p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Expanded detail cards below - for users who want more info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10">
        {hubCards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    card.color === 'blue' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/10' : 
                    card.color === 'orange' ? 'bg-warning-50 text-warning-500 dark:bg-warning-500/10' : 
                    card.color === 'green' ? 'bg-success-50 text-success-600 dark:bg-success-500/10' : 
                    'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{card.title}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
                {card.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-500 cursor-pointer group-hover:underline">
                {card.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
