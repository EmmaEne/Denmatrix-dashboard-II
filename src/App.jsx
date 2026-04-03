import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Discover from './components/Discover'
import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider, useSidebar } from './context/SidebarContext'

/**
 * Layout component that manages the shared UI elements (Sidebar, Header) 
 * and handles the responsive margin shift based on sidebar state.
 */
function Layout({ children }) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen font-['Outfit',sans-serif] transition-colors duration-300">
      {/* Sidebar - Reconstructed with exact fidelity and collapse logic */}
      <Sidebar />
      
      {/* Main Content Area - shifts with sidebar width */}
      <main className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-[90px]' : 'ml-[290px]'}`}>
        <Header />
        
        <div className="flex-1">
          {children}
        </div>

        {/* Footer fidelity */}
        <footer className="mt-auto border-t border-gray-200 p-6 text-center text-xs text-gray-400 dark:border-gray-800">
          Copyright © 2026 DenMatrix - Content & Ads Hub
        </footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/content/discover" element={<Layout><Discover /></Layout>} />
            
            {/* Catch-all redirect to Home for any placeholder paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
