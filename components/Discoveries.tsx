"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Calendar, Globe } from "lucide-react"
import Link from "next/link"

interface Discovery {
  _id: string
  entity: string
  category: string
  platform: string
  date: string
  status: string
  confirmed: boolean
  description: string
}

export default function Discoveries() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    fetchDiscoveries()
  }, [])

  const fetchDiscoveries = async () => {
    try {
      const response = await fetch("/api/discoveries?limit=8")
      if (response.ok) {
        const data = await response.json()
        setDiscoveries(data.discoveries)
      }
    } catch (error) {
      console.error("Error fetching discoveries:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE INVESTIGATION":
        return "text-blue-500 animate-pulse"
      case "ESCALATED":
        return "text-yellow-500"
      case "RESOLVED":
        return "text-green-500"
      case "MONITORING":
        return "text-cyan-500"
      case "PARTIAL":
        return "text-orange-500 animate-pulse"
      default:
        return "text-gray-500"
    }
  }

  const isRecent = (date: string) => {
    const discoveryDate = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - discoveryDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 2
  }

  if (loading) {
    return (
      <section id="discoveries" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel p-8 md:p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-500/20 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-blue-500/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="discoveries" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-glow font-orbitron">🔍 Recent Discoveries</h2>
            <div className="text-sm text-gray-400">Last Updated: {lastUpdated.toLocaleString()}</div>
          </div>

          <div className="space-y-4">
            {discoveries.map((discovery) => (
              <Link key={discovery._id} href={`/discovery/${discovery._id}`}>
                <div className="glass-panel p-6 hover:glow-blue transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold">{discovery.entity}</h3>
                        {isRecent(discovery.date) && discovery.confirmed && (
                          <span className="ml-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full animate-pulse">
                            ACTIVE INVESTIGATION
                          </span>
                        )}
                        {!discovery.confirmed && (
                          <span className="ml-2 px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full animate-pulse">
                            UNCONFIRMED
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          {discovery.platform}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(discovery.date).toLocaleDateString()}
                        </div>
                        <div className="px-2 py-1 bg-gray-800 rounded text-xs">{discovery.category}</div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`text-sm font-semibold ${getStatusColor(discovery.status)}`}>
                        {discovery.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/discoveries">
              <button className="glass-button px-6 py-3 font-semibold hover:glow-blue transition-all duration-300">
                View All Discoveries
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
