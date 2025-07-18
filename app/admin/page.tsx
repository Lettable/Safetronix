"use client"

import type React from "react"

import { useState } from "react"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminKey === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid admin key")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-panel p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-glow font-orbitron">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Key</label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none"
                placeholder="Enter admin key"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full glass-button px-6 py-3 font-semibold hover:glow-red transition-all duration-300"
            >
              Access Dashboard
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">Default: admin123</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
