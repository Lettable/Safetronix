import { Shield, Users, Copyright, Zap, DollarSign } from "lucide-react"

const focusAreas = [
  {
    icon: Shield,
    title: "Terrorism",
    description: "Monitoring and reporting terrorist activities, recruitment, and propaganda across digital platforms.",
    color: "red",
  },
  {
    icon: Users,
    title: "Child Exploitation",
    description: "Identifying and escalating child abuse material and exploitation networks to authorities.",
    color: "orange",
  },
  {
    icon: Copyright,
    title: "DMCA/Piracy",
    description: "Tracking copyright infringement and intellectual property violations across platforms.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Extremism",
    description: "Monitoring radical ideologies and hate speech that pose threats to public safety.",
    color: "purple",
  },
  {
    icon: DollarSign,
    title: "Financial Crime",
    description: "Detecting fraud, money laundering, and financial scams in digital environments.",
    color: "green",
  },
]

export default function FocusAreas() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-500 group-hover:text-red-400"
      case "orange":
        return "text-orange-500 group-hover:text-orange-400"
      case "blue":
        return "text-blue-500 group-hover:text-blue-400"
      case "purple":
        return "text-purple-500 group-hover:text-purple-400"
      case "green":
        return "text-green-500 group-hover:text-green-400"
      default:
        return "text-red-500 group-hover:text-red-400"
    }
  }

  const getStatusColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500"
      case "orange":
        return "bg-orange-500"
      case "blue":
        return "bg-blue-500"
      case "purple":
        return "bg-purple-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-red-500"
    }
  }

  return (
    <section id="focus" className="py-20 px-4 bg-gradient-to-b from-black to-red-900/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-glow font-orbitron">⚠️ Our Focus Areas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => (
            <div key={index} className="glass-panel p-6 hover:glow-red transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <area.icon className={`h-8 w-8 mr-3 group-hover:animate-pulse ${getColorClasses(area.color)}`} />
                <h3 className="text-xl font-bold">{area.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{area.description}</p>
              <div className="mt-4 flex items-center">
                <div className={`w-2 h-2 rounded-full animate-pulse mr-2 ${getStatusColor(area.color)}`}></div>
                <span className={`text-sm ${getColorClasses(area.color)}`}>ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
