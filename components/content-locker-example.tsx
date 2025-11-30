'use client'

import { ContentLocker, useContentLocker, ContentLockerConfig } from './content-locker'
import { Button } from './ui/button'

/**
 * Example 1: Simple Survey-Based Content Locker
 */
export function SurveyContentLockerExample() {
  const config: ContentLockerConfig = {
    unlockMethod: 'survey',
    title: 'Unlock Premium Content',
    description: 'Complete a quick survey to access this exclusive content.',
    surveyUrl: 'https://example.com/survey',
    onUnlock: () => {
      console.log('Content unlocked!')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <div className="p-8">
      <ContentLocker
        config={config}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="text-muted-foreground mb-4">
            This content is locked. Complete the survey to unlock it.
          </p>
          <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
            Unlock Content
          </Button>
        </div>
      </ContentLocker>
    </div>
  )
}

/**
 * Example 2: Email Subscription Content Locker
 */
export function EmailContentLockerExample() {
  const config: ContentLockerConfig = {
    unlockMethod: 'email-subscribe',
    title: 'Subscribe to Unlock',
    description: 'Enter your email to access this exclusive content.',
    emailListId: 'your-list-id', // For integration with email services
    onUnlock: () => {
      console.log('Email subscribed and content unlocked!')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  if (isUnlocked) {
    return (
      <div className="p-8 border-2 border-green-500 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Unlocked Content</h2>
        <p>This is the premium content that was locked before!</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <ContentLocker
        config={config}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="text-muted-foreground mb-4">
            Subscribe with your email to unlock this content.
          </p>
          <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
            Subscribe & Unlock
          </Button>
        </div>
      </ContentLocker>
    </div>
  )
}

/**
 * Example 3: Video Ad Watch Content Locker
 */
export function VideoAdContentLockerExample() {
  const config: ContentLockerConfig = {
    unlockMethod: 'ad-watch',
    title: 'Watch to Unlock',
    description: 'Watch the video advertisement to unlock this content.',
    adVideoUrl: '/path/to/video.mp4', // Replace with your video URL
    onUnlock: () => {
      console.log('Video watched and content unlocked!')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <div className="p-8">
      <ContentLocker
        config={config}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="text-muted-foreground mb-4">
            Watch the video ad to unlock this content.
          </p>
          <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
            Watch & Unlock
          </Button>
        </div>
      </ContentLocker>
    </div>
  )
}

/**
 * Example 4: Multiple Requirements (Complete 2 Surveys)
 */
export function MultipleRequirementsExample() {
  const config: ContentLockerConfig = {
    unlockMethod: 'survey',
    title: 'Unlock Premium Content',
    description: 'Complete 2 surveys to unlock this exclusive content.',
    requiredCompletions: 2,
    surveyUrl: 'https://example.com/survey',
    onUnlock: () => {
      console.log('All requirements completed!')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <div className="p-8">
      <ContentLocker
        config={config}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="text-muted-foreground mb-4">
            Complete 2 surveys to unlock this content.
          </p>
          <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
            Start Unlocking
          </Button>
        </div>
      </ContentLocker>
    </div>
  )
}

/**
 * Example 5: Custom Unlock Action
 */
export function CustomUnlockExample() {
  const config: ContentLockerConfig = {
    unlockMethod: 'custom',
    title: 'Custom Unlock',
    description: 'Complete a custom action to unlock.',
    customUnlockAction: async () => {
      // Your custom logic here
      // For example, verify payment, check API, etc.
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Return true if unlock should succeed
      return true
    },
    onUnlock: () => {
      console.log('Custom action completed!')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <div className="p-8">
      <ContentLocker
        config={config}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="text-muted-foreground mb-4">
            Complete the custom action to unlock.
          </p>
          <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
            Unlock Content
          </Button>
        </div>
      </ContentLocker>
    </div>
  )
}


