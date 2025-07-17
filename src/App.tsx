import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "@/components/layout/Header"
import { ToastProvider } from "@/components/ui/toast-provider"
import { Dashboard } from "@/pages/Dashboard"
import { AgentDirectory } from "@/pages/AgentDirectory"
import { MyProfile } from "@/pages/MyProfile"
import { Reports } from "@/pages/Reports"
import { AdminPanel } from "@/pages/AdminPanel"
import { AgentRegistration } from "@/pages/AgentRegistration"
import { blink } from "@/blink/client"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Agent Registry</h1>
            <p className="text-muted-foreground">
              Please sign in to access your agent management dashboard
            </p>
          </div>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agents" element={<AgentDirectory />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/register" element={<AgentRegistration />} />
              </Routes>
            </main>
          </div>
        </div>
        <ToastProvider />
      </SidebarProvider>
    </Router>
  )
}

export default App