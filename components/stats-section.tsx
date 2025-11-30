import { Hand, BadgeCheck, TrendingUp } from "lucide-react"

export function StatsSection() {
  const features = [
    {
      icon: Hand,
      title: "Tap Apply Now",
      description: "Unlock access to Scroll & Earn.",
      colorClass: "bg-white",
    },
    {
      icon: BadgeCheck,
      title: "Pass the Human Check",
      description:
        "Just a quick verification—takes seconds.",
      colorClass: "bg-white",
    },
    {
      icon: TrendingUp,
      title: "Start Earning",
      description:
        "Your feed is now monetized instantly.",
      colorClass: "bg-white",
    },
  ]

  return (
    <section id="quick-guide" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center mb-4 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Quick Start Guide
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-lg sm:rounded-xl p-5 sm:p-6 border border-border/30 hover:border-border/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#fd2d55' }}>
                  <item.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" style={{ color: '#ffffff' }} strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-[#fd2d55] transition-colors duration-300">{item.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
