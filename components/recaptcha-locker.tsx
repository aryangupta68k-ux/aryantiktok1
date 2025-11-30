'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Shield, Loader2 } from 'lucide-react'

interface RecaptchaLockerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  siteKey?: string
  onVerified?: () => void
}

export function RecaptchaLocker({ 
  isOpen, 
  onOpenChange,
  siteKey,
  onVerified 
}: RecaptchaLockerProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Use environment variable or default test key
  const recaptchaSiteKey = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setIsVerified(true)
      setError(null)
    } else {
      setIsVerified(false)
    }
  }

  const handleContinue = async () => {
    if (!isVerified) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Trigger AdsBlueMedia locker after reCAPTCHA verification
      if (typeof window !== 'undefined' && (window as any)._OS) {
        // Close the reCAPTCHA dialog first
        onOpenChange(false)
        // Small delay to ensure dialog closes smoothly
        setTimeout(() => {
          (window as any)._OS()
        }, 300)
      } else {
        // Fallback: call onVerified callback if provided
        onVerified?.()
        onOpenChange(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error triggering locker:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogClose = (open: boolean) => {
    if (!open && !isLoading) {
      // Reset state when dialog closes
      setIsVerified(false)
      setError(null)
      recaptchaRef.current?.reset()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isLoading}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Human Verification Required
          </DialogTitle>
          <DialogDescription>
            Please complete the verification below to continue. This helps us prevent automated access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
              theme="light"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive text-center bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!isVerified || isLoading}
            className="w-full text-white font-semibold"
            style={{ backgroundColor: '#fd2d55' }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Continue to Offers'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}


