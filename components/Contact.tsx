"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Globe, Shield } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Message sent successfully. We'll get back to you soon!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert(data.error || "Error sending message. Please try again.")
      }
    } catch (error) {
      alert("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-t from-blue-900/10 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-glow font-orbitron">📬 Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                For urgent threats, use our report form above. For general inquiries, partnerships, or media requests,
                contact us directly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>intel@suized.to</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span>suized.to</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>24/7 Monitoring</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 border-blue-500/30">
              <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                  required
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass-button px-6 py-3 font-semibold hover:glow-blue transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-400 text-sm">
            <p>© 2024 Safetronix - Digital Threat Surveillance Network. All rights reserved.</p>
            <p className="mt-2">Protecting digital spaces worldwide through collaborative intelligence.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
