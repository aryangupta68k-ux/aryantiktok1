import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface FeatureSectionProps {
  title: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
  ctaText?: string
  reversed?: boolean
  dark?: boolean
}

export function FeatureSection({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  ctaText = "Get Started",
  reversed = false,
  dark = false,
}: FeatureSectionProps) {
  return (
    null
  )
}
