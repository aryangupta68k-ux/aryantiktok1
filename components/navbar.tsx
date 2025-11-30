'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-dark text-surface-dark-foreground border-b border-border/10">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 sm:h-10 md:h-12 w-auto"
              priority
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none">
              <Menu className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-surface-dark-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                onClick={() => scrollToSection('quick-guide')}
                className="cursor-pointer"
              >
                Quick Guide
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => scrollToSection('faq')}
                className="cursor-pointer"
              >
                FAQ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
