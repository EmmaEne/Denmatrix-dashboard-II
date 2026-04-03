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
    description: 'Search and explore high-performing content ideas across platforms. Find trends and inspiration tailored to dental services.',
    cta: 'Browse Ideas',
    icon: Compass,
    color: 'blue'
  },
  {
    title: 'Create',
    description: 'Generate scripts, ad creatives, captions, and short-form video content using AI.',
    cta: 'Start Creating',
    icon: PenTool,
    color: 'orange'
  },
  {
    title: 'Manage Ads',
    description: 'Organize, track, and optimize your ad campaigns. Monitor performance and adjust strategies in one place.',
    cta: 'Manage Ads',
    icon: Megaphone,
    color: 'green'
  },
  {
    title: 'Content Calendar',
    description: 'Plan, schedule, and manage your content across platforms. Stay consistent and track publishing timelines.',
    cta: 'View Calendar',
    icon: CalendarRange,
    color: 'gray'
  }
]

export default function Dashboard() {
  return (
    <div className="p-8 lg:p-12 transition-colors">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Path</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a workflow to get started</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {hubCards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="group flex flex-col rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.04] cursor-pointer">
              {/* Icon area with generous top space */}
              <div className="px-7 pt-8 pb-2">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                  card.color === 'blue' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/10' : 
                  card.color === 'orange' ? 'bg-warning-50 text-warning-500 dark:bg-warning-500/10' : 
                  card.color === 'green' ? 'bg-success-50 text-success-600 dark:bg-success-500/10' : 
                  'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400'
                }`}>
                  <Icon size={26} />
                </div>
              </div>

              {/* Title */}
              <div className="px-7 pt-4 pb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3>
              </div>

              {/* Description with breathing room */}
              <div className="px-7 pb-6 flex-1">
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>

              {/* CTA with top border for visual separation */}
              <div className="px-7 py-5 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-500 group-hover:underline">
                  {card.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
