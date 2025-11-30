import Link from "next/link"
import { TikTokLogo } from "@/components/tiktok-logo"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <TikTokLogo className="h-8 text-foreground" color="black" />
            <p className="text-sm text-muted-foreground">Inspire creativity and bring joy.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:underline">
                  TikTok for Good
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Advertise on TikTok
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  TikTok Developers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  TikTok Rewards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Creator Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <select className="bg-transparent border-none outline-none font-medium cursor-pointer">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <span>© 2025 TikTok</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
