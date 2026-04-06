import React, { useState, useCallback } from 'react'
import {
  Plus,
  DollarSign,
  Eye,
  MousePointerClick,
  Target,
  Pause,
  Play,
  Pencil,
  ChevronRight,
  ChevronLeft,
  Link2,
  CheckCircle2,
  Rocket,
  X,
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Copy,
  CheckCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import Dialog from '../common/Dialog'

/* ─── Inline Platform Icons (same pattern as Discover.jsx) ─── */
const FacebookIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>
  </svg>
)
const InstagramIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
  </svg>
)
const TikTokIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.29 0 .58.04.85.11V9a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 3.76.92V6.69Z"/>
  </svg>
)

/* ─── Mock Data ─── */
const mockConnectedAccounts = [
  { id: 1, platform: 'Facebook / Instagram', name: 'BrightSmile Dental', status: 'Connected', icon: FacebookIcon, color: '#1877F2' },
  { id: 2, platform: 'TikTok', name: '@brightsmiledental', status: 'Connected', icon: TikTokIcon, color: '#000000' },
]

const mockMetrics = [
  { label: 'Total Spend', value: '$4,280', change: '+12%', trend: 'up', icon: DollarSign, iconColor: 'text-brand-500', bgColor: 'bg-brand-50 dark:bg-brand-500/10' },
  { label: 'Impressions', value: '284K', change: '+8%', trend: 'up', icon: Eye, iconColor: 'text-violet-500', bgColor: 'bg-violet-50 dark:bg-violet-500/10' },
  { label: 'Clicks', value: '12.4K', change: '+24%', trend: 'up', icon: MousePointerClick, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { label: 'Conversions', value: '842', change: '-3%', trend: 'down', icon: Target, iconColor: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-500/10' },
]

const initialCampaigns = [
  { id: 1, name: 'Teeth Whitening Promo', platform: 'Facebook', status: 'Active', budget: '$500', spend: '$342.50', ctr: '3.2%', impressions: '45.2K', clicks: '1,446', conversions: '89' },
  { id: 2, name: 'Invisalign Awareness', platform: 'TikTok', status: 'Active', budget: '$750', spend: '$608.20', ctr: '4.8%', impressions: '92.1K', clicks: '4,420', conversions: '214' },
  { id: 3, name: 'Kids Dental Check-Up', platform: 'Facebook', status: 'Paused', budget: '$300', spend: '$187.00', ctr: '2.1%', impressions: '28.3K', clicks: '594', conversions: '42' },
  { id: 4, name: 'Summer Smile Makeover', platform: 'TikTok', status: 'Active', budget: '$1,000', spend: '$821.30', ctr: '5.1%', impressions: '118.4K', clicks: '6,038', conversions: '312' },
  { id: 5, name: 'Emergency Dental Care', platform: 'Facebook', status: 'Paused', budget: '$250', spend: '$125.80', ctr: '1.8%', impressions: '15.6K', clicks: '280', conversions: '18' },
  { id: 6, name: 'New Patient Welcome Offer', platform: 'Facebook', status: 'Active', budget: '$400', spend: '$295.10', ctr: '3.7%', impressions: '38.9K', clicks: '1,439', conversions: '167' },
]

const platformOptions = ['All', 'Facebook', 'TikTok']
const statusOptions = ['All', 'Active', 'Paused']

/* ─── Create Campaign Step Data ─── */
const stepLabels = ['Platform', 'Creative', 'Audience', 'Budget', 'Review']

export default function ManageAds() {
  /* ─── State ─── */
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [filterPlatform, setFilterPlatform] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createStep, setCreateStep] = useState(0)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  // Create campaign form state
  const [newCampaign, setNewCampaign] = useState({
    platform: '',
    headline: '',
    caption: '',
    audience: 'general',
    location: '',
    ageRange: '18-65',
    budget: '',
    duration: '7',
  })

  /* ─── Handlers ─── */
  const toggleCampaignStatus = useCallback((id) => {
    setCampaigns(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
    ))
  }, [])

  const filteredCampaigns = campaigns.filter(c => {
    const matchPlatform = filterPlatform === 'All' || c.platform === filterPlatform
    const matchStatus = filterStatus === 'All' || c.status === filterStatus
    return matchPlatform && matchStatus
  })

  const handleOpenCreate = () => {
    setCreateStep(0)
    setNewCampaign({ platform: '', headline: '', caption: '', audience: 'general', location: '', ageRange: '18-65', budget: '', duration: '7' })
    setShowCreateModal(true)
  }

  const handleLaunch = () => {
    const launched = {
      id: campaigns.length + 1,
      name: newCampaign.headline || 'New Campaign',
      platform: newCampaign.platform || 'Facebook',
      status: 'Active',
      budget: `$${newCampaign.budget || '0'}`,
      spend: '$0.00',
      ctr: '0.0%',
      impressions: '0',
      clicks: '0',
      conversions: '0',
    }
    setCampaigns(prev => [launched, ...prev])
    setShowCreateModal(false)
  }

  /* ─── Shared component classes (matching existing system) ─── */
  const selectClass = "h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-500 appearance-none cursor-pointer"
  const inputClass = "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-500"

  return (
    <div className="p-6 lg:p-10 transition-colors">
      {/* ─── Page Header ─── */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Ads</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track and manage ad campaigns across platforms</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 h-11 px-5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* ═══ 1. CONNECTED ACCOUNTS ═══ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Link2 size={15} className="text-brand-500" />
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connected Accounts</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all">
              <FacebookIcon size={14} />
              Connect Facebook / Instagram
            </button>
            <button className="flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all">
              <TikTokIcon size={14} />
              Connect TikTok
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {mockConnectedAccounts.map(account => {
            const Icon = account.icon
            return (
              <div key={account.id} className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800 px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <Icon size={16} className="text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{account.name}</p>
                  <p className="text-[11px] text-gray-400">{account.platform}</p>
                </div>
                <div className="flex items-center gap-1.5 ml-3">
                  <CheckCircle2 size={13} className="text-success-500" />
                  <span className="text-[11px] font-semibold text-success-500">{account.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══ 2. METRICS OVERVIEW ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {mockMetrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.bgColor}`}>
                  <Icon size={20} className={metric.iconColor} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${metric.trend === 'up' ? 'text-success-500' : 'text-error-500'}`}>
                  {metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {metric.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
            </div>
          )
        })}
      </div>

      {/* ═══ 3. FILTER BAR ═══ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className={selectClass}
            >
              {platformOptions.map(p => <option key={p} value={p}>{p === 'All' ? 'All Platforms' : p}</option>)}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              {statusOptions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
            </div>
          </div>

          <input
            type="text"
            placeholder="Date range (e.g. Apr 1 – Apr 30)"
            className={`${inputClass} w-56`}
            readOnly
          />

          <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </span>
        </div>
      </div>

      {/* ═══ 4. CAMPAIGNS TABLE ═══ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Platform</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Budget</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Spend</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">CTR</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map(campaign => {
                const PlatIcon = campaign.platform === 'TikTok' ? TikTokIcon : FacebookIcon
                return (
                  <tr
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{campaign.name}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <PlatIcon size={14} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{campaign.platform}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                        campaign.status === 'Active'
                          ? 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500'
                          : 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'Active' ? 'bg-success-500' : 'bg-gray-400'}`} />
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">{campaign.budget}</td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">{campaign.spend}</td>
                    <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">{campaign.ctr}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleCampaignStatus(campaign.id)}
                          title={campaign.status === 'Active' ? 'Pause' : 'Resume'}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200 transition-all"
                        >
                          {campaign.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredCampaigns.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">No campaigns match your current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ 6. CREATE CAMPAIGN MODAL (Multi-Step) ═══ */}
      <Dialog isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Campaign">
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i < createStep ? 'bg-success-500 text-white'
                    : i === createStep ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-400 dark:bg-white/5'
                  }`}>
                    {i < createStep ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${i === createStep ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 rounded-full ${i < createStep ? 'bg-success-500' : 'bg-gray-100 dark:bg-white/5'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Platform */}
          {createStep === 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Choose Platform</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Facebook', icon: FacebookIcon, label: 'Facebook / Instagram' },
                  { id: 'TikTok', icon: TikTokIcon, label: 'TikTok' },
                ].map(p => {
                  const Icon = p.icon
                  const isSelected = newCampaign.platform === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setNewCampaign(prev => ({ ...prev, platform: p.id }))}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 shadow-lg shadow-brand-500/10'
                          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700'
                      }`}
                    >
                      <Icon size={20} className={isSelected ? 'text-brand-500' : 'text-gray-500'} />
                      <span className={`text-sm font-semibold ${isSelected ? 'text-brand-500' : 'text-gray-700 dark:text-gray-300'}`}>{p.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Creative */}
          {createStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Ad Creative</p>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Headline</label>
                <input
                  type="text"
                  value={newCampaign.headline}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, headline: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. Get a Brighter Smile Today!"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Caption / Description</label>
                <textarea
                  value={newCampaign.caption}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, caption: e.target.value }))}
                  rows={4}
                  className={`${inputClass} h-auto py-3 resize-none custom-scrollbar`}
                  placeholder="Write compelling ad copy..."
                />
              </div>
              <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.02] p-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Drag & drop media or <span className="text-brand-500 font-semibold cursor-pointer">browse files</span></p>
                <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, MP4 up to 50MB</p>
              </div>
            </div>
          )}

          {/* Step 3: Audience */}
          {createStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Define Audience</p>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Target Audience</label>
                <div className="relative">
                  <select
                    value={newCampaign.audience}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, audience: e.target.value }))}
                    className={`${selectClass} w-full`}
                  >
                    <option value="general">General Patients</option>
                    <option value="parents">Parents with Kids</option>
                    <option value="young-adults">Young Adults (18-35)</option>
                    <option value="seniors">Seniors (55+)</option>
                    <option value="cosmetic">Cosmetic-focused</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Location</label>
                <input
                  type="text"
                  value={newCampaign.location}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, location: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. Los Angeles, CA — 25 mile radius"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Age Range</label>
                <div className="relative">
                  <select
                    value={newCampaign.ageRange}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, ageRange: e.target.value }))}
                    className={`${selectClass} w-full`}
                  >
                    <option value="18-25">18 – 25</option>
                    <option value="25-35">25 – 35</option>
                    <option value="35-50">35 – 50</option>
                    <option value="50-65">50 – 65</option>
                    <option value="18-65">18 – 65 (All)</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {createStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Set Budget</p>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Daily Budget ($)</label>
                <input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. 50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Duration (days)</label>
                <div className="relative">
                  <select
                    value={newCampaign.duration}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, duration: e.target.value }))}
                    className={`${selectClass} w-full`}
                  >
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/></svg>
                  </div>
                </div>
              </div>
              {newCampaign.budget && newCampaign.duration !== 'ongoing' && (
                <div className="rounded-xl bg-brand-50 dark:bg-brand-500/10 p-4 border border-brand-500/20">
                  <p className="text-sm text-brand-500 font-semibold">Estimated Total: ${(Number(newCampaign.budget) * Number(newCampaign.duration)).toLocaleString()}</p>
                  <p className="text-xs text-brand-500/60 mt-0.5">${newCampaign.budget}/day × {newCampaign.duration} days</p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {createStep === 4 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Review Campaign</p>
              <div className="space-y-3">
                {[
                  { label: 'Platform', value: newCampaign.platform || '—' },
                  { label: 'Headline', value: newCampaign.headline || '—' },
                  { label: 'Caption', value: newCampaign.caption ? (newCampaign.caption.length > 60 ? newCampaign.caption.slice(0, 60) + '…' : newCampaign.caption) : '—' },
                  { label: 'Audience', value: newCampaign.audience },
                  { label: 'Location', value: newCampaign.location || '—' },
                  { label: 'Age Range', value: newCampaign.ageRange },
                  { label: 'Daily Budget', value: newCampaign.budget ? `$${newCampaign.budget}` : '—' },
                  { label: 'Duration', value: newCampaign.duration === 'ongoing' ? 'Ongoing' : `${newCampaign.duration} days` },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{row.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            {createStep > 0 ? (
              <button
                onClick={() => setCreateStep(s => s - 1)}
                className="flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : <div />}

            {createStep < stepLabels.length - 1 ? (
              <button
                onClick={() => setCreateStep(s => s + 1)}
                className="flex items-center gap-2 h-11 px-6 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                className="flex items-center gap-2 h-11 px-6 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
              >
                <Rocket size={16} />
                Launch Campaign
              </button>
            )}
          </div>
        </div>
      </Dialog>

      {/* ═══ 7. CAMPAIGN DETAILS MODAL ═══ */}
      <Dialog isOpen={!!selectedCampaign} onClose={() => setSelectedCampaign(null)} title="Campaign Details">
        {selectedCampaign && (() => {
          const PlatIcon = selectedCampaign.platform === 'TikTok' ? TikTokIcon : FacebookIcon
          return (
            <div className="space-y-6">
              {/* Campaign header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                  <PlatIcon size={18} className="text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCampaign.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{selectedCampaign.platform}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                      selectedCampaign.status === 'Active' ? 'text-success-500' : 'text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCampaign.status === 'Active' ? 'bg-success-500' : 'bg-gray-400'}`} />
                      {selectedCampaign.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Impressions', value: selectedCampaign.impressions, icon: Eye, color: 'text-brand-500' },
                  { label: 'Clicks', value: selectedCampaign.clicks, icon: MousePointerClick, color: 'text-emerald-500' },
                  { label: 'CTR', value: selectedCampaign.ctr, icon: TrendingUp, color: 'text-violet-500' },
                  { label: 'Conversions', value: selectedCampaign.conversions, icon: Target, color: 'text-amber-500' },
                ].map(stat => {
                  const StatIcon = stat.icon
                  return (
                    <div key={stat.label} className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800 p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <StatIcon size={14} className={stat.color} />
                        <span className="text-[11px] font-semibold text-gray-400 uppercase">{stat.label}</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  )
                })}
              </div>

              {/* Budget breakdown */}
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800 p-5">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BarChart3 size={14} className="text-brand-500" />
                  Budget & Spend
                </h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Spent</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedCampaign.spend} / {selectedCampaign.budget}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (parseFloat(selectedCampaign.spend.replace(/[$,]/g, '')) / parseFloat(selectedCampaign.budget.replace(/[$,]/g, ''))) * 100)}%`
                    }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  {Math.round((parseFloat(selectedCampaign.spend.replace(/[$,]/g, '')) / parseFloat(selectedCampaign.budget.replace(/[$,]/g, ''))) * 100)}% of budget used
                </p>
              </div>

              {/* Performance chart placeholder */}
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800 p-5">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" />
                  Daily Performance (Last 7 Days)
                </h4>
                {/* Simple bar chart using divs */}
                <div className="flex items-end gap-2 h-28">
                  {[35, 52, 48, 72, 65, 80, 68].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div
                        className="w-full rounded-t-md bg-brand-500/80 dark:bg-brand-500/60 transition-all hover:bg-brand-500"
                        style={{ height: `${v}%` }}
                      />
                      <span className="text-[9px] text-gray-400">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { toggleCampaignStatus(selectedCampaign.id); setSelectedCampaign(null) }}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-gray-700 transition-all"
                >
                  {selectedCampaign.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
                  {selectedCampaign.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 h-11 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
                  <Pencil size={16} />
                  Edit Campaign
                </button>
              </div>
            </div>
          )
        })()}
      </Dialog>
    </div>
  )
}
