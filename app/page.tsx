import React from 'react';
import Hero from "@/components/Hero"
import About from "@/components/About"
import FocusAreas from "@/components/FocusAreas"
import HowWeWork from "@/components/HowWeWork"
import Discoveries from "@/components/Discoveries"
import ReportForm from "@/components/ReportForm"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <FocusAreas />
      <HowWeWork />
      <Discoveries />
      <ReportForm />
      <Contact />
    </main>
  )
}
