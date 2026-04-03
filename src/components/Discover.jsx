import React, { useState } from 'react'
import { 
  Search, 
  Play, 
  Heart, 
  Eye, 
  Share2,
  Video,
  Image as ImageIcon,
  Grid,
  TrendingUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react'
import Dialog from './common/Dialog'

const filterChips = [
  'Teeth Whitening',
  'Braces',
  'Dental Implants',
  'Smile Makeover',
  'Oral Hygiene',
  'Kids Dentistry'
]

const contentTypes = [
  { id: 'all', label: 'All', icon: Grid },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'images', label: 'Images', icon: ImageIcon }
]

const mockContent = [
  {
    id: 1,
    type: 'videos',
    title: 'Transform Your Smile: The Ultimate Whitening Guide',
    likes: '12K',
    views: '150K',
    comments: '1.2K',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop',
    category: 'Teeth Whitening'
  },
  {
    id: 2,
    type: 'images',
    title: '5 Daily Habits for Perfect Oral Hygiene',
    likes: '8K',
    views: '45K',
    comments: '430',
    platform: 'Pinterest',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop',
    category: 'Oral Hygiene'
  },
  {
    id: 3,
    type: 'videos',
    title: 'Invisible Braces: Is It Right for You?',
    likes: '25K',
    views: '400K',
    comments: '3.4K',
    platform: 'TikTok',
    thumbnail: 'https://images.unsplash.com/photo-1593054999502-c97c0d49df42?w=400&h=250&fit=crop',
    category: 'Braces'
  },
  {
    id: 4,
    type: 'images',
    title: 'The Future of Dental Implants',
    likes: '3K',
    views: '12K',
    comments: '85',
    platform: 'LinkedIn',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop',
    category: 'Dental Implants'
  },
  {
    id: 5,
    type: 'videos',
    title: 'Making Kids Love Denistry',
    likes: '15K',
    views: '220K',
    comments: '920',
    platform: 'TikTok',
    thumbnail: 'https://images.unsplash.com/photo-1461532257246-777de18cd58b?w=400&h=250&fit=crop',
    category: 'Kids Dentistry'
  },
  {
    id: 6,
    type: 'images',
    title: 'Smile Makeover Case Study: Real Results',
    likes: '6K',
    views: '30K',
    comments: '120',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=250&fit=crop',
    category: 'Smile Makeover'
  }
]

export default function Discover() {
  const [activeType, setActiveType] = useState('all')
  const [activeFilters, setActiveFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    )
  }

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeType === 'all' || item.type === activeType
    const matchesFilters = activeFilters.length === 0 || activeFilters.includes(item.category)
    return matchesSearch && matchesType && matchesFilters
  })

  return (
    <div className="p-6 lg:p-10 transition-colors">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Find high-performing dental content ideas</p>
      </div>

      {/* Search & Filter Section */}
      <div className="mb-8 space-y-6">
        <div className="relative xl:w-[600px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-500" 
            placeholder="Search dental content ideas..." 
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterChips.map(chip => (
            <button
              key={chip}
              onClick={() => toggleFilter(chip)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeFilters.includes(chip)
                  ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-500 dark:bg-white/5 dark:border-gray-800 dark:text-gray-400 dark:hover:border-brand-500'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Content Type Toggle */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
          {contentTypes.map(type => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeType === type.id
                    ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon size={16} />
                {type.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContent.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
              {item.type === 'videos' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-500 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                {item.platform}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="mb-2">
                 <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider">{item.category}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-4 flex-1">
                {item.title}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Heart size={14} className="text-error-500" />
                    {item.likes}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Eye size={14} />
                    {item.views}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-brand-500 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">No content found matching your search or filters.</p>
        </div>
      )}

      {/* Item Detail Dialog */}
      <Dialog 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title="Content Details"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
              <img src={selectedItem.thumbnail} className="h-full w-full object-cover" alt="" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-brand-50 text-[10px] font-bold text-brand-500 uppercase dark:bg-brand-500/10">
                  {selectedItem.platform}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {selectedItem.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 p-4 rounded-xl dark:bg-white/5">
                This {selectedItem.type.slice(0,-1)} is performing 85% better than average dental content on {selectedItem.platform}. 
                The key hooks used are informational and visually appealing patient results.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-success-500" />
                  <span className="text-xs text-gray-500">Growth</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">+24%</div>
              </div>
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle size={16} className="text-brand-500" />
                  <span className="text-xs text-gray-500">Comments</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedItem.comments}</div>
              </div>
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={16} className="text-error-500" />
                  <span className="text-xs text-gray-500">Saves</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">1.2K</div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 h-12 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
              <ExternalLink size={18} />
              View on {selectedItem.platform}
            </button>
          </div>
        )}
      </Dialog>
    </div>
  )
}
