import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeatureSection } from "@/components/features-section"
import { SuccessStories } from "@/components/success-stories"
import { StepsSection } from "@/components/steps-section"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsSection />

      <FeatureSection
        title="Achieve your business goals with TikTok for Business"
        description="Engage with your target audience and grow your fanbase the TikTok way, at an affordable price."
        features={[
          "Build TikTok Community: Meet your newest, biggest fans",
          "Generate leads: Turn tuned-in audiences into high-value customers",
          "Boost conversions: Turn attention into action",
          "Drive product sales: Grow your TikTok Shop with ad solutions",
        ]}
        imageSrc="/business-analytics-dashboard-tiktok.jpg"
        imageAlt="Business Goals"
      />

      <FeatureSection
        title="Find your audience"
        description="Your ideal customers are out there waiting for you. TikTok Ads Manager makes it easy to get the attention of highly engaged audiences."
        features={[
          "Leverage your audience's interests and viewing behaviors",
          "Serve ads to people actively searching for products like yours",
          "Use automatic targeting to dynamically optimize who receives your ads",
        ]}
        imageSrc="/diverse-group-of-people-using-phones.jpg"
        imageAlt="Audience Targeting"
        reversed
        dark
      />

      <FeatureSection
        title="Unlock your creativity"
        description="Create engaging, TikTok-friendly ad content with confidence. TikTok Ad Manager's expansive suite of creative tools gives businesses an easy way to produce videos."
        features={[
          "See examples of top ads from other advertisers",
          "Create top-quality ads with our library of templates",
          "Customize your content with TikTok Video Editor",
        ]}
        imageSrc="/video-editing-creative-tools.jpg"
        imageAlt="Creative Tools"
      />

      <FeatureSection
        title="Measure your impact"
        description="Maximize ROI with measurement tools that provide performance and content insights, so you can act and drive efficient conversions."
        features={[
          "Use TikTok Pixel to track visitor actions",
          "Use web attribution to track and measure return on ad spend",
          "Track key metrics and get actionable insights from your dashboard",
        ]}
        imageSrc="/data-visualization-charts.png"
        imageAlt="Measurement"
        reversed
      />

      <SuccessStories />
      <StepsSection />
    </main>
  )
}
