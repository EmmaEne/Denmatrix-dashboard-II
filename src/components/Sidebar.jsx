import React from 'react'
import { 
  Home,
  Search,
  Filter,
  Megaphone,
  Compass,
  Target,
  PlusCircle,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'

const menuItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Research', path: '/research', icon: Search },
  { label: 'Funnel', path: '/funnel', icon: Filter },
  { 
    label: 'Content & Ads', 
    path: '/content-marketing', 
    icon: Megaphone,
    children: [
      { label: 'Discover', path: '/content/discover' },
      { label: 'Manage Ads', path: '/content/ads' },
      { label: 'Create', path: '/content/create' },
      { label: 'Schedule', path: '/content/schedule' },
    ],
    expanded: true
  },
  { label: 'CRM', path: '/crm', icon: Users },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Chat', path: '/chat', icon: MessageSquare },
  { label: 'Help Center', path: '/help', icon: HelpCircle },
]

export default function Sidebar() {
  const { isCollapsed } = useSidebar()
  const location = useLocation()

  return (
    <aside 
      className={`fixed left-0 top-0 bottom-0 flex flex-col border-r border-gray-200 bg-white p-6 transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 z-50 ${isCollapsed ? 'w-[90px]' : 'w-[290px]'}`}
    >
      <div className={`mb-10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {isCollapsed ? 'd' : 'denmatrix'}
        </span>
      </div>

      <div className={`mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase ${isCollapsed ? 'text-center' : ''}`}>
        {isCollapsed ? '·' : 'MENU'}
      </div>

      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || (item.children && item.children.some(c => location.pathname === c.path))
          
          return (
            <div key={idx} className="flex flex-col gap-1">
              <Link 
                to={item.path} 
                className={`flex items-center rounded-lg text-sm font-medium transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'} ${
                  isActive 
                    ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/10' 
                    : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                {!isCollapsed && (
                  <>
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown size={16} className={`ml-auto text-gray-400 transition-transform ${item.expanded ? 'rotate-180' : ''}`} />
                    )}
                  </>
                )}
              </Link>
              
              {!isCollapsed && item.children && item.expanded && (
                <div className="ml-9 flex flex-col gap-1 mt-1">
                  {item.children.map((child, cIdx) => (
                    <Link 
                      key={cIdx} 
                      to={child.path} 
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname === child.path
                          ? 'text-brand-500 bg-brand-50/50 dark:bg-brand-500/5'
                          : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="mt-6 rounded-2xl bg-gray-50 p-6 dark:bg-white/[0.03]">
          <div className="mb-2 text-sm font-bold text-gray-900 dark:text-white">DenMatrix Intelligence</div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Advanced AI-driven clinical management and marketing system.
          </p>
        </div>
      )}
    </aside>
  )
}
