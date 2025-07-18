import { Search, Users, AlertTriangle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "Crowd-sourced reports combined with automated crawler-based discovery systems.",
  },
  {
    icon: Users,
    title: "Review Process",
    description: "Expert moderator review and verification of reported threats and suspicious activities.",
  },
  {
    icon: AlertTriangle,
    title: "Escalation",
    description: "Direct escalation to relevant authorities, platforms, and law enforcement agencies.",
  },
]

export default function HowWeWork() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-glow font-orbitron">🧠 How We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="glass-panel p-8 hover:glow-red transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 group-hover:bg-red-500/30 transition-colors">
                  <step.icon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-px bg-red-500/50"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
