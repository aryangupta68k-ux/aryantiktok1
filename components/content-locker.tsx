'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Lock, Play, Mail, FileText } from 'lucide-react'

export type UnlockMethod = 
  | 'survey' 
  | 'ad-watch' 
  | 'email-subscribe' 
  | 'social-share'
  | 'custom'

export interface ContentLockerConfig {
  title?: string
  description?: string
  unlockMethod: UnlockMethod
  requiredCompletions?: number // For multiple requirements (e.g., complete 2 surveys)
  surveyUrl?: string
  adVideoUrl?: string
  emailListId?: string
  customUnlockAction?: () => Promise<boolean>
  onUnlock?: () => void
  lockedContent?: ReactNode
  unlockedContent?: ReactNode
}

interface ContentLockerProps {
  config: ContentLockerConfig
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

export function ContentLocker({ 
  config, 
  isOpen, 
  onOpenChange,
  children 
}: ContentLockerProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [completions, setCompletions] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [adWatched, setAdWatched] = useState(false)
  const [adProgress, setAdProgress] = useState(0)

  const requiredCompletions = config.requiredCompletions || 1

  // Check if content should be unlocked
  useEffect(() => {
    const unlocked = localStorage.getItem(`content-locker-${config.unlockMethod}`)
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
  }, [config.unlockMethod])

  const handleUnlock = async () => {
    setIsLoading(true)
    let success = false

    try {
      switch (config.unlockMethod) {
        case 'survey':
          if (config.surveyUrl) {
            // Open survey in new window
            const surveyWindow = window.open(config.surveyUrl, '_blank')
            // In production, you'd verify completion via webhook or callback
            // For demo, we'll simulate success after a delay
            setTimeout(() => {
              success = true
              setCompletions(prev => prev + 1)
            }, 2000)
          }
          break

        case 'ad-watch':
          if (adWatched && adProgress >= 100) {
            success = true
            setCompletions(prev => prev + 1)
          }
          break

        case 'email-subscribe':
          if (email && validateEmail(email)) {
            // In production, integrate with your email service (Mailchimp, ConvertKit, etc.)
            // For demo, we'll simulate success
            await new Promise(resolve => setTimeout(resolve, 1000))
            success = true
            setCompletions(prev => prev + 1)
          }
          break

        case 'social-share':
          // Open share dialog
          if (navigator.share) {
            await navigator.share({
              title: 'Check this out!',
              text: 'Amazing content!',
              url: window.location.href
            })
            success = true
            setCompletions(prev => prev + 1)
          } else {
            // Fallback: copy link
            await navigator.clipboard.writeText(window.location.href)
            success = true
            setCompletions(prev => prev + 1)
          }
          break

        case 'custom':
          if (config.customUnlockAction) {
            success = await config.customUnlockAction()
            if (success) {
              setCompletions(prev => prev + 1)
            }
          }
          break
      }

      if (success && completions + 1 >= requiredCompletions) {
        localStorage.setItem(`content-locker-${config.unlockMethod}`, 'true')
        setIsUnlocked(true)
        config.onUnlock?.()
        onOpenChange(false)
      }
    } catch (error) {
      console.error('Unlock error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleAdProgress = (progress: number) => {
    setAdProgress(progress)
    if (progress >= 100) {
      setAdWatched(true)
    }
  }

  // If unlocked, show content directly
  if (isUnlocked) {
    return <>{config.unlockedContent || children}</>
  }

  // Render locked content
  return (
    <>
      {config.lockedContent || children}
      
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {config.title || 'Unlock Content'}
            </DialogTitle>
            <DialogDescription>
              {config.description || `Complete the requirement${requiredCompletions > 1 ? 's' : ''} below to unlock this content.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Progress indicator for multiple completions */}
            {requiredCompletions > 1 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{completions} / {requiredCompletions}</span>
                </div>
                <Progress value={(completions / requiredCompletions) * 100} />
              </div>
            )}

            {/* Survey Method */}
            {config.unlockMethod === 'survey' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Complete a quick survey to unlock
                </div>
                <Button 
                  onClick={handleUnlock}
                  disabled={isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#fd2d55' }}
                >
                  {isLoading ? 'Opening...' : 'Start Survey'}
                </Button>
              </div>
            )}

            {/* Ad Watch Method */}
            {config.unlockMethod === 'ad-watch' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Play className="h-4 w-4" />
                  Watch the video to unlock
                </div>
                {config.adVideoUrl ? (
                  <div className="relative">
                    <video
                      src={config.adVideoUrl}
                      controls
                      className="w-full rounded-lg"
                      onTimeUpdate={(e) => {
                        const video = e.currentTarget
                        const progress = (video.currentTime / video.duration) * 100
                        handleAdProgress(progress)
                      }}
                    />
                    {adProgress > 0 && (
                      <div className="mt-2">
                        <Progress value={adProgress} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
                    Video URL not configured
                  </div>
                )}
                <Button 
                  onClick={handleUnlock}
                  disabled={!adWatched || isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#fd2d55' }}
                >
                  {isLoading ? 'Unlocking...' : adWatched ? 'Unlock Content' : 'Watch Video First'}
                </Button>
              </div>
            )}

            {/* Email Subscribe Method */}
            {config.unlockMethod === 'email-subscribe' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  Subscribe to unlock
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Button 
                  onClick={handleUnlock}
                  disabled={!email || !validateEmail(email) || isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#fd2d55' }}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe & Unlock'}
                </Button>
              </div>
            )}

            {/* Social Share Method */}
            {config.unlockMethod === 'social-share' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Share this content to unlock
                </div>
                <Button 
                  onClick={handleUnlock}
                  disabled={isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#fd2d55' }}
                >
                  {isLoading ? 'Sharing...' : 'Share & Unlock'}
                </Button>
              </div>
            )}

            {/* Custom Method */}
            {config.unlockMethod === 'custom' && config.customUnlockAction && (
              <div className="space-y-3">
                <Button 
                  onClick={handleUnlock}
                  disabled={isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#fd2d55' }}
                >
                  {isLoading ? 'Processing...' : 'Unlock Content'}
                </Button>
              </div>
            )}

            {/* Completion Status */}
            {completions > 0 && completions < requiredCompletions && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                {completions} of {requiredCompletions} completed
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hook for easy content locker usage
export function useContentLocker(config: ContentLockerConfig) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem(`content-locker-${config.unlockMethod}`)
    setIsUnlocked(unlocked === 'true')
  }, [config.unlockMethod])

  const openLocker = () => setIsOpen(true)
  const closeLocker = () => setIsOpen(false)

  return {
    isOpen,
    isUnlocked,
    openLocker,
    closeLocker,
    setIsOpen
  }
}


