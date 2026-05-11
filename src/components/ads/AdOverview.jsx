import React from 'react'
import { 
  X, 
  Pause, 
  Play, 
  Pencil, 
  Eye, 
  MousePointerClick, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  Monitor,
  Smartphone,
  Globe,
  MoreVertical,
  Share2,
  Trash2
} from 'lucide-react'

const AdOverview = ({ ad, onClose, onToggleStatus }) => {
  if (!ad) return null;

  const isFacebook = ad.platform === 'Facebook';
  const accentColor = isFacebook ? 'text-[#1877F2]' : 'text-black dark:text-white';
  const bgColor = isFacebook ? 'bg-[#1877F2]/10' : 'bg-gray-100 dark:bg-white/10';

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0D0F12] w-full max-w-7xl h-full max-h-[900px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-300">
        
        {/* --- Header --- */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center ${accentColor}`}>
              {isFacebook ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.29 0 .58.04.85.11V9a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 3.76.92V6.69Z"/>
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{ad.name}</h2>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  ad.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 text-gray-500 dark:bg-white/5'
                }`}>
                  {ad.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
                <span>Campaign ID: {ad.id * 12345}</span>
                <span>•</span>
                <span>Created Apr 24, 2026</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <Share2 size={16} />
              Share
            </button>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <Pencil size={16} />
              Edit
            </button>
            <button 
              onClick={() => onToggleStatus(ad.id)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-all"
            >
              {ad.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
              {ad.status === 'Active' ? 'Pause' : 'Resume'}
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
            <button 
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 lg:p-8 space-y-8">
            
            {/* --- Key Metrics Overview --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total Spend', value: ad.spend, icon: DollarSign, color: 'text-brand-500', bg: 'bg-brand-500/10' },
                { label: 'Revenue', value: ad.revenue || '$0', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'ROAS', value: ad.roas || '0x', icon: ArrowUpRight, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                { label: 'CTR', value: ad.ctr, icon: MousePointerClick, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'CPC', value: ad.cpc || '$0.00', icon: Target, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                { label: 'CPM', value: ad.cpm || '$0.00', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/[0.02] shadow-sm">
                  <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center ${m.color} mb-3`}>
                    <m.icon size={16} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* --- Left Column: Creative & Analysis --- */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Creative Preview */}
                <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Monitor size={16} className="text-brand-500" />
                      Ad Creative Preview
                    </h3>
                    <div className="flex gap-2">
                      <button className="h-8 px-3 rounded-lg bg-gray-100 dark:bg-white/5 text-[11px] font-bold">Desktop</button>
                      <button className="h-8 px-3 rounded-lg text-[11px] font-bold text-gray-400">Mobile</button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[4/5] rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative group">
                      <img 
                        src={ad.creative?.url || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80'} 
                        className="w-full h-full object-cover" 
                        alt="Ad Creative" 
                      />
                      {ad.creative?.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                            <Play size={32} fill="white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Headline</label>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                          {ad.creative?.headline || ad.name}
                        </h4>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Text</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                          {ad.creative?.copy || 'Experience world-class dental care with our expert team. Book your consultation today and take the first step towards your dream smile.'}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Link Engagement</label>
                          <span className="text-[11px] font-bold text-brand-500 flex items-center gap-1">
                            <TrendingUp size={12} />
                            +12.5% this week
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 w-[65%]" />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">Destination: brightsmiledental.com/promo</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Deep Dive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Conversion Metrics */}
                  <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Target size={16} className="text-emerald-500" />
                      Conversion Funnel
                    </h3>
                    <div className="space-y-5">
                      {[
                        { label: 'Leads', value: ad.leads || '0', color: 'bg-blue-500' },
                        { label: 'Bookings', value: ad.bookings || '0', color: 'bg-indigo-500' },
                        { label: 'Conversions', value: ad.conversions || '0', color: 'bg-emerald-500' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{item.label}</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${85 - (i * 20)}%` }} />
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">CPA</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{ad.cpa || '$0.00'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">CPL</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{ad.cpl || '$0.00'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Metrics (if applicable) */}
                  <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Play size={16} className="text-rose-500" />
                      Video Engagement
                    </h3>
                    {ad.videoMetrics ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10">
                            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Hook Rate</p>
                            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{ad.videoMetrics.hookRate}</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-500/5 border border-brand-100 dark:border-brand-500/10">
                            <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Retention</p>
                            <p className="text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">{ad.videoMetrics.retention}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Average Watch Time</span>
                            <span className="font-bold text-gray-900 dark:text-white">{ad.videoMetrics.watchTime}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 w-[45%]" />
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 flex items-start gap-3">
                          <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                            Your hook rate is in the top 5% of all dental ads. This creative is a winner!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                        <Monitor size={32} className="text-gray-300 mb-3" />
                        <p className="text-xs text-gray-500 font-medium italic">Video metrics only available for video-based creative formats.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Analysis & Recommendations */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-xl shadow-brand-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 translate-x-12 -translate-y-12">
                    <Sparkles size={160} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">AI Command Center Analysis</h3>
                        <p className="text-xs text-white/70">Real-time performance optimization</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                        <p className="text-sm leading-relaxed font-medium">
                          {ad.aiAnalysis || "This campaign is showing strong momentum. The current CTR of 3.2% is 45% higher than the industry average. We recommend increasing the daily budget to scale this performance."}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="h-12 rounded-xl bg-white text-brand-600 text-sm font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                          <TrendingUp size={18} />
                          Apply Recommendations
                        </button>
                        <button className="h-12 rounded-xl bg-brand-400/30 border border-white/20 text-white text-sm font-bold hover:bg-brand-400/40 transition-all flex items-center justify-center gap-2">
                          <BarChart3 size={18} />
                          View Full Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Right Column: Audience, Budget, Comments --- */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Spend & Budget */}
                <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 size={16} className="text-brand-500" />
                    Budget Utilization
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Total Spent</p>
                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{ad.spend}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Budget</p>
                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mt-1">{ad.budget}</p>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                      <span>Duration: {ad.duration || '7 days'}</span>
                      <span className="text-brand-500">8 days remaining</span>
                    </div>
                  </div>
                </div>

                {/* Audience Targeting */}
                <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Users size={16} className="text-violet-500" />
                    Audience Targeting
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-violet-500">
                        <Globe size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{ad.audience?.location || 'All United States'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-emerald-500">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Age Range</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{ad.audience?.age || '18 - 65+'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-amber-500">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Interests</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{ad.audience?.interests || 'Beauty, Health, Dental'}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 h-10 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-500 hover:border-brand-500 hover:text-brand-500 transition-all">
                    Expand Audience Info
                  </button>
                </div>

                {/* Ad Comments / Messages */}
                <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MessageSquare size={16} className="text-brand-500" />
                      Comments & Activity
                    </h3>
                    <span className="h-5 w-5 rounded-full bg-brand-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {ad.comments?.length || 0}
                    </span>
                  </div>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {ad.comments && ad.comments.length > 0 ? (
                      ad.comments.map(comment => (
                        <div key={comment.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-900 dark:text-white">{comment.user}</p>
                            <span className="text-[9px] text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{comment.text}</p>
                          <button className="text-[10px] font-bold text-brand-500 mt-2 hover:underline">Reply</button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare size={24} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">No comments yet.</p>
                      </div>
                    )}
                  </div>
                  <button className="w-full mt-4 h-10 rounded-xl bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    Manage All Comments
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdOverview
