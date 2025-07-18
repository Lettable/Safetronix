"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Calendar, Globe, Search } from "lucide-react"
import Navigation from "@/components/Navigation"
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

export default function DiscoveriesPage() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [filteredDiscoveries, setFilteredDiscoveries] = useState<Discovery[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const categories = ["All", "Terrorism", "Child Exploitation", "DMCA/Piracy", "Extremism", "Financial Crime"]
  const statuses = ["All", "ACTIVE INVESTIGATION", "ESCALATED", "RESOLVED", "MONITORING", "PARTIAL"]

  useEffect(() => {
    fetchDiscoveries()
  }, [])

  useEffect(() => {
    filterDiscoveries()
  }, [searchTerm, selectedCategory, selectedStatus, discoveries])

  const fetchDiscoveries = async () => {
    try {
      const response = await fetch("/api/discoveries")
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

  const filterDiscoveries = () => {
    let filtered = discoveries

    if (searchTerm) {
      filtered = filtered.filter(
        (discovery) =>
          discovery.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          discovery.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((discovery) => discovery.category === selectedCategory)
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((discovery) => discovery.status === selectedStatus)
    }

    setFilteredDiscoveries(filtered)
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-panel p-8 mb-8">
              <div className="animate-pulse">
                <div className="h-8 bg-blue-500/20 rounded mb-4"></div>
                <div className="h-4 bg-blue-500/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 text-glow font-orbitron">🔍 All Discoveries</h1>
            <p className="text-gray-300">Complete database of identified threats and ongoing investigations</p>
          </div>

          {/* Filters */}
          <div className="glass-panel-cyan p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search discoveries..."
                    className="w-full pl-10 pr-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg focus:border-cyan-500 focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg focus:border-cyan-500 focus:outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredDiscoveries.map((discovery) => (
              <Link key={discovery._id} href={`/discovery/${discovery._id}`}>
                <div className="glass-panel p-6 hover:glow-blue transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="text-xl font-bold">{discovery.entity}</h3>
                        {!discovery.confirmed && (
                          <span className="ml-2 px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full animate-pulse">
                            UNCONFIRMED
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">{discovery.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          {discovery.platform}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(discovery.date).toLocaleDateString()}
                        </div>
                        <div className="px-3 py-1 bg-gray-800 rounded-full text-xs">{discovery.category}</div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className={`text-sm font-semibold ${getStatusColor(discovery.status)}`}>
                        {discovery.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredDiscoveries.length === 0 && (
            <div className="glass-panel p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No discoveries found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
