"use client"

import type React from "react"

import { useState } from "react"
import { Send, Shield } from "lucide-react"

const platforms = [
  "Facebook",
  "Twitter/X",
  "Instagram",
  "TikTok",
  "YouTube",
  "Telegram",
  "Discord",
  "Reddit",
  "WhatsApp",
  "Dark Web",
  "Other",
]

const threatTypes = ["Terrorism", "Child Exploitation", "DMCA/Piracy", "Extremism", "Financial Crime", "Other"]

export default function ReportForm() {
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    description: "",
    category: [] as string[],
    anonymous: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/threatreports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Report submitted successfully. Thank you for helping keep the internet safe.")
        setFormData({
          name: "",
          platform: "",
          description: "",
          category: [],
          anonymous: false,
        })
      } else {
        alert(data.error || "Error submitting report. Please try again.")
      }
    } catch (error) {
      alert("Error submitting report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }))
  }

  return (
    <section id="report" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-12 glow-blue">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow font-orbitron">📝 Report a Threat</h2>
            <p className="text-gray-300">
              Help us identify and neutralize digital threats. All reports are reviewed by our expert team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData((prev) => ({ ...prev, anonymous: e.target.checked }))}
                className="w-4 h-4 text-blue-500 bg-black border-blue-500/30 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-300">
                Submit Anonymously
              </label>
            </div>

            {!formData.anonymous && (
              <div>
                <label className="block text-sm font-medium mb-2">Name/Handle</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                  placeholder="Your name or handle"
                  required={!formData.anonymous}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                required
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Threat Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {threatTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.category.includes(type)}
                      onChange={() => handleCategoryChange(type)}
                      className="w-4 h-4 text-blue-500 bg-black border-blue-500/30 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm resize-none"
                placeholder="Provide detailed information about the threat, including URLs, usernames, and specific content..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full glass-button px-6 py-4 font-semibold hover:glow-blue transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Report</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-500" />
              <span className="text-sm font-semibold">Security Notice</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              All reports are encrypted and handled with strict confidentiality. We work directly with law enforcement
              and platform administrators to address threats.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
