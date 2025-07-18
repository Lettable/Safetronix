"use client"

import React from "react";
import { useState } from "react"
import Link from "next/link"
import { Shield, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold font-orbitron">SAFETRONIX</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 text-sm text-gray-300">
              {[
                { label: "About", href: "/#about" },
                { label: "Focus Areas", href: "/#focus" },
                { label: "Discoveries", href: "/discoveries" },
                { label: "Report", href: "/#report" },
                { label: "Contact", href: "/#contact" },
              ].map((item, index, arr) => (
                <React.Fragment key={item.label}>
                  <Link href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                  {index < arr.length - 1 && <span className="text-gray-500 px-2">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-blue-400">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-panel mt-2 mx-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/#about" className="block px-3 py-2 hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/#focus" className="block px-3 py-2 hover:text-blue-400 transition-colors">
              Focus Areas
            </Link>
            <Link href="/discoveries" className="block px-3 py-2 hover:text-blue-400 transition-colors">
              Discoveries
            </Link>
            <Link href="/#report" className="block px-3 py-2 hover:text-blue-400 transition-colors">
              Report
            </Link>
            <Link href="/#contact" className="block px-3 py-2 hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
