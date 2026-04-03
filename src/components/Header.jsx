import React from 'react'
import { 
  Menu, 
  Search, 
  Moon, 
  Sun,
  Bell, 
  ChevronDown 
} from 'lucide-react'
import { useSidebar } from '../context/SidebarContext'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 flex h-[68px] w-full items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 transition-colors">
      <div className="flex items-center gap-4">
        {/* Toggle Sidebar Button */}
        <button 
          onClick={toggleSidebar}
          className="h-11 w-11 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-400" />
        </button>

        <div className="relative xl:w-[430px] hidden md:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
            placeholder="Search or type command..." 
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-all duration-200 active:scale-95 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <div className={`transition-transform duration-300 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}>
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-400" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </div>
        </button>

        {/* Notifications */}
        <button className="relative h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-colors dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
          <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="absolute top-3.5 right-3.5 h-2 w-2 rounded-full bg-orange-400 border-2 border-white dark:border-gray-900"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2 group cursor-pointer">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
             <img src="https://ui-avatars.com/api/?name=Musharof&background=465fff&color=fff" className="h-full w-full object-cover" alt="User" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90">Musharof</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  )
}
