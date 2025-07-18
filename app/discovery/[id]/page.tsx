"use client"

import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import { AlertTriangle, Calendar, Globe, Shield, TrendingUp, Users } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Discovery {
  _id: string
  entity: string
  category: string
  platform: string
  date: string
  status: string
  confirmed: boolean
  description: string
  markdownContent?: string
  metadata?: {
    severity: string
    affectedUsers: number
    reportedBy: string
    lastUpdated: string
  }
}

export default function DiscoveryDetailPage() {
  const params = useParams()
  const [discovery, setDiscovery] = useState<Discovery | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchDiscovery(params.id as string)
    }
  }, [params.id])

  const fetchDiscovery = async (id: string) => {
    try {
      const response = await fetch(`/api/discoveries/${id}`)
      if (response.ok) {
        const data = await response.json()
        setDiscovery(data.discovery)
      } else {
        setError("Discovery not found")
      }
    } catch (error) {
      console.error("Error fetching discovery:", error)
      setError("Failed to load discovery")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE INVESTIGATION":
        return "text-blue-500"
      case "ESCALATED":
        return "text-yellow-500"
      case "RESOLVED":
        return "text-green-500"
      case "MONITORING":
        return "text-cyan-500"
      case "PARTIAL":
        return "text-orange-500"
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
            <div className="glass-panel p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-blue-500/20 rounded mb-4"></div>
                <div className="h-4 bg-blue-500/10 rounded mb-2"></div>
                <div className="h-4 bg-blue-500/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !discovery) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-panel p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Discovery Not Found</h3>
              <p className="text-gray-400">{error}</p>
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              <div className="glass-panel p-8 mb-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-blue-500 mr-3" />
                  <h1 className="text-3xl font-bold font-orbitron">{discovery.entity}</h1>
                  {!discovery.confirmed && (
                    <span className="ml-3 px-3 py-1 text-sm bg-orange-500/20 text-orange-400 rounded-full animate-pulse">
                      UNCONFIRMED
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {discovery.platform}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(discovery.date).toLocaleDateString()}
                  </div>
                  <div className="px-3 py-1 bg-gray-800 rounded-full text-xs">{discovery.category}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(discovery.status)}`}>
                    {discovery.status}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  {discovery.markdownContent ? (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed mb-8">{discovery.description}</p>

                      <h3 className="text-xl font-bold mb-4">Detailed Investigation Report</h3>
                      <ReactMarkdown>{discovery.markdownContent}</ReactMarkdown>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{discovery.description}</p>

                      <h3 className="text-xl font-bold mb-4 mt-8">Investigation Status</h3>
                      <p className="text-gray-300 leading-relaxed">
                        This threat is currently under {discovery.status.toLowerCase()}. Our team is actively monitoring
                        the situation and coordinating with relevant authorities and platform administrators.
                      </p>

                      <h3 className="text-xl font-bold mb-4 mt-8">Recommended Actions</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Users should avoid accessing the reported platform/content</li>
                        <li>• Report any similar activities to appropriate authorities</li>
                        <li>• Monitor official channels for updates on this investigation</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-400">Investigation Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Status</span>
                    <span className={`font-semibold ${getStatusColor(discovery.status)}`}>{discovery.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Confirmed</span>
                    <span className={discovery.confirmed ? "text-green-400" : "text-orange-400"}>
                      {discovery.confirmed ? "Yes" : "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Category</span>
                    <span className="text-blue-400">{discovery.category}</span>
                  </div>
                </div>
              </div>

              {/* Metadata Card */}
              {discovery.metadata && (
                <div className="glass-panel-cyan p-6">
                  <h3 className="text-lg font-bold mb-4 text-cyan-400">Investigation Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Severity Level</p>
                        <p className="text-lg font-bold text-cyan-400">{discovery.metadata.severity}</p>
                      </div>
                      <Shield className="h-6 w-6 text-cyan-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Affected Users</p>
                        <p className="text-lg font-bold text-yellow-400">
                          {discovery.metadata.affectedUsers.toLocaleString()}
                        </p>
                      </div>
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Reported By</p>
                        <p className="text-sm text-gray-300">{discovery.metadata.reportedBy}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Last Updated</p>
                        <p className="text-sm text-gray-300">
                          {new Date(discovery.metadata.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="glass-panel-green p-6">
                <h3 className="text-lg font-bold mb-4 text-green-400">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Investigation ID</p>
                      <p className="text-xs font-mono text-green-400">{discovery._id}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Platform Risk</p>
                      <p className="text-sm font-bold text-green-400">HIGH</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Response Time</p>
                      <p className="text-sm text-green-400">&lt; 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-400">Need Help?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  If you have additional information about this threat, please contact our investigation team.
                </p>
                <button className="w-full glass-button px-4 py-2 text-sm font-semibold hover:glow-blue transition-all duration-300">
                  Report Additional Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
