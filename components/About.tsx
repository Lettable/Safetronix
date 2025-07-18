"use client"

import { useState, useEffect } from "react"

export default function About() {
  const [aboutStats, setAboutStats] = useState({
    platformsMonitored: 0,
    activeInvestigations: 0,
    threatsNeutralized: 0,
    countriesCovered: 195,
  })

  useEffect(() => {
    fetchAboutStats()
  }, [])

  const fetchAboutStats = async () => {
    try {
      const response = await fetch("/api/stats/about")
      if (response.ok) {
        const data = await response.json()
        setAboutStats(data.aboutStats)
      }
    } catch (error) {
      console.error("Error fetching about stats:", error)
    }
  }

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-glow font-orbitron">
            🌐 About Safetronix
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Safetronix operates as an independent online taskforce with a global presence, dedicated to identifying
                and neutralizing digital threats through a combination of user reports and automated crawler systems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our mission is to create a safer digital environment by monitoring, analyzing, and escalating serious
                threats to the appropriate authorities and platform administrators worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400 font-semibold">ACTIVE MONITORING</span>
              </div>
            </div>
            <div className="glass-panel-cyan p-6 border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Global Coverage</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Platforms Monitored</span>
                  <span className="text-cyan-400">{aboutStats.platformsMonitored}+</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Investigations</span>
                  <span className="text-yellow-400">{aboutStats.activeInvestigations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Threats Neutralized</span>
                  <span className="text-green-400">{aboutStats.threatsNeutralized.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Countries Covered</span>
                  <span className="text-purple-400">{aboutStats.countriesCovered}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
