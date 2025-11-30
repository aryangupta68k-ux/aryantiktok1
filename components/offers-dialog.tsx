'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface Offer {
  id: string
  title: string
  description?: string
  url: string
  icon?: React.ReactNode
}

interface OffersDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  offers: Offer[]
}

export function OffersDialog({ 
  isOpen, 
  onOpenChange, 
  title = "Complete an Offer",
  description = "Choose one of the offers below to continue",
  offers 
}: OffersDialogProps) {
  const handleOfferClick = (offer: Offer) => {
    // Open in new tab
    window.open(offer.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-base">{description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {offers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => handleOfferClick(offer)}
              className="h-auto flex flex-col items-start justify-start p-5 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg cursor-pointer text-left"
              style={{ 
                borderColor: '#fd2d55',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fd2d55'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'inherit'
              }}
            >
              <div className="flex items-center justify-between w-full mb-2">
                {offer.icon && <span className="mr-2">{offer.icon}</span>}
                <ExternalLink className="h-4 w-4 ml-auto opacity-70" />
              </div>
              <div className="text-left w-full">
                <div className="font-semibold text-base mb-1">{offer.title}</div>
                {offer.description && (
                  <div className="text-sm opacity-80">{offer.description}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

