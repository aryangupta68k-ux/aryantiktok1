import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessStories() {
  const stories = [
    {
      company: "7 Brew",
      description:
        "7 Brew is a drive-thru beverage brand with over 300 locations. To raise awareness, they launched a TikTok-first campaign.",
      stats: ["Ad Recall lift increased by 16.4%", "Gained 58k+ new followers"],
      image: "/coffee-shop-drive-thru.jpg",
    },
    {
      company: "Betterbrand",
      description:
        "Betterbrand makes science-backed health supplements. They used TikTok Shop Ads to automate optimization and drive sales.",
      stats: ["GMV reached $1M in one quarter", "80%+ of sales driven by ads"],
      image: "/health-supplements-bottle.jpg",
    },
    {
      company: "Arrae",
      description:
        "Arrae creates 100% natural supplements. By adopting GMV Max, they optimized campaigns and maximized purchases.",
      stats: ["Purchases increased by 75%", "ROI improved by 25%"],
      image: "/wellness-supplements-lifestyle.jpg",
    },
  ]

  return (
    null
  )
}
