"use client"

import { useEffect, useState } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Shield, TrendingUp, AlertTriangle, Globe } from "lucide-react"

const mockChartData = [
  { name: "Terrorism", value: 45, color: "#ef4444" },
  { name: "Child Abuse", value: 32, color: "#f97316" },
  { name: "Piracy", value: 78, color: "#3b82f6" },
  { name: "Extremism", value: 23, color: "#8b5cf6" },
  { name: "Fraud", value: 56, color: "#10b981" },
]

const trendData = [
  { month: "Jan", threats: 234 },
  { month: "Feb", threats: 287 },
  { month: "Mar", threats: 312 },
  { month: "Apr", threats: 298 },
  { month: "May", threats: 356 },
  { month: "Jun", threats: 389 },
]

export default function Hero() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    totalThreats: 0,
    activeInvestigations: 0,
    resolvedCases: 0,
    platformsCovered: 0,
  })

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchStats()
    fetchChartData()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchChartData = async () => {
    try {
      const response = await fetch("/api/stats/chart")
      if (response.ok) {
        const data = await response.json()
        setChartData(data.chartData)
      }
    } catch (error) {
      console.error("Error fetching chart data:", error)
    }
  }

  const fullText = "SAFETRONIX – Surveillance Network"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 md:p-12 glow-blue flex flex-col justify-between" style={{ height: '32rem' }}>

              {/* Logo */}
              <div className="mb-6">
                <Image
                  src="https://i.postimg.cc/jSbkb4xK/image-removebg-preview.png"
                  alt="Safetronix Logo"
                  width={220} // smaller width for balance
                  height={80}
                />
              </div>

              {/* Updated Description */}
              <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                SAFETRONIX is a global surveillance network designed to identify, verify, and escalate critical digital threats across all platforms.
                Our mission is to ensure early detection, rapid response, and actionable intelligence — empowering users and organizations to stay ahead of emerging cyber dangers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="glass-button px-8 py-3 text-lg font-semibold hover:glow-blue transition-all duration-300"
                  onClick={() => window.location.href = '/discoveries'}
                >
                  View Discoveries
                </button>

                <button
                  className="glass-button px-8 py-3 text-lg font-semibold hover:glow-blue transition-all duration-300"
                  onClick={() => window.location.hash = '#report'}
                >
                  Report a Threat
                </button>
              </div>
            </div>
          </div>
          {/* Right side - Stats and Charts */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 hover:glow-blue transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Total Threats</p>
                    <p className="text-xl font-bold text-blue-400">{stats.totalThreats.toLocaleString()}</p>
                  </div>
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </div>

              <div className="glass-panel p-4 hover:glow-cyan transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Active Cases</p>
                    <p className="text-xl font-bold text-cyan-400">{stats.activeInvestigations}</p>
                  </div>
                  <AlertTriangle className="h-6 w-6 text-cyan-500" />
                </div>
              </div>

              <div className="glass-panel p-4 hover:glow-green transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Resolved</p>
                    <p className="text-xl font-bold text-green-400">{stats.resolvedCases.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="glass-panel-purple p-4 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Platforms</p>
                    <p className="text-xl font-bold text-purple-400">{stats.platformsCovered}</p>
                  </div>
                  <Globe className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Threat Distribution Chart */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-bold mb-3 text-blue-400">Threat Distribution</h3>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Live Status */}
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">System Status</p>
                  <p className="text-sm font-semibold text-green-400">OPERATIONAL</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse-blue" />
          <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-pulse-blue" />
        </div>
      </div>
    </section>
  )
}
