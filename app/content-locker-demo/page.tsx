'use client'

import { ContentLocker, useContentLocker, ContentLockerConfig } from '@/components/content-locker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, Play, FileText, Share2, Settings } from 'lucide-react'

export default function ContentLockerDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Content Locker Demo</h1>
          <p className="text-lg text-muted-foreground">
            Explore different unlock methods for your content locker
          </p>
        </div>

        <Tabs defaultValue="survey" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="survey">
              <FileText className="h-4 w-4 mr-2" />
              Survey
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="video">
              <Play className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="share">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </TabsTrigger>
            <TabsTrigger value="custom">
              <Settings className="h-4 w-4 mr-2" />
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="survey">
            <SurveyDemo />
          </TabsContent>

          <TabsContent value="email">
            <EmailDemo />
          </TabsContent>

          <TabsContent value="video">
            <VideoDemo />
          </TabsContent>

          <TabsContent value="share">
            <ShareDemo />
          </TabsContent>

          <TabsContent value="custom">
            <CustomDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function SurveyDemo() {
  const config: ContentLockerConfig = {
    unlockMethod: 'survey',
    title: 'Complete Survey to Unlock',
    description: 'Take a quick survey to access this premium content.',
    surveyUrl: 'https://example.com/survey',
    onUnlock: () => {
      alert('Survey completed! Content unlocked.')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey-Based Content Locker</CardTitle>
        <CardDescription>
          Users must complete a survey before accessing content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentLocker
          config={config}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground mb-4">
              This content is locked. Complete the survey to unlock it.
            </p>
            <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
              Unlock Content
            </Button>
          </div>
        </ContentLocker>

        {isUnlocked && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Content is unlocked!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmailDemo() {
  const config: ContentLockerConfig = {
    unlockMethod: 'email-subscribe',
    title: 'Subscribe to Unlock',
    description: 'Enter your email address to unlock this content.',
    onUnlock: () => {
      alert('Email subscribed! Content unlocked.')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  if (isUnlocked) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="p-8 border-2 border-green-500 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">🎉 Unlocked Content</h3>
            <p className="text-muted-foreground">
              This is the premium content that was locked before! You've successfully subscribed.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Subscription Content Locker</CardTitle>
        <CardDescription>
          Users must subscribe with their email to access content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentLocker
          config={config}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe with your email to unlock this content.
            </p>
            <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
              Subscribe & Unlock
            </Button>
          </div>
        </ContentLocker>
      </CardContent>
    </Card>
  )
}

function VideoDemo() {
  const config: ContentLockerConfig = {
    unlockMethod: 'ad-watch',
    title: 'Watch Video to Unlock',
    description: 'Watch the video advertisement to unlock this content.',
    adVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    onUnlock: () => {
      alert('Video watched! Content unlocked.')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Ad Content Locker</CardTitle>
        <CardDescription>
          Users must watch a video advertisement to access content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentLocker
          config={config}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Play className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground mb-4">
              Watch the video ad to unlock this content.
            </p>
            <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
              Watch & Unlock
            </Button>
          </div>
        </ContentLocker>

        {isUnlocked && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Content is unlocked!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ShareDemo() {
  const config: ContentLockerConfig = {
    unlockMethod: 'social-share',
    title: 'Share to Unlock',
    description: 'Share this content on social media to unlock.',
    onUnlock: () => {
      alert('Content shared! Content unlocked.')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Share Content Locker</CardTitle>
        <CardDescription>
          Users must share content on social media to access it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentLocker
          config={config}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Share2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground mb-4">
              Share this content to unlock it.
            </p>
            <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
              Share & Unlock
            </Button>
          </div>
        </ContentLocker>

        {isUnlocked && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Content is unlocked!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CustomDemo() {
  const config: ContentLockerConfig = {
    unlockMethod: 'custom',
    title: 'Custom Unlock Action',
    description: 'Complete a custom action to unlock this content.',
    customUnlockAction: async () => {
      // Simulate API call or custom verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, you would verify something here
      // const response = await fetch('/api/verify-unlock', { ... })
      // return response.ok
      
      return true
    },
    onUnlock: () => {
      alert('Custom action completed! Content unlocked.')
    }
  }

  const { isOpen, isUnlocked, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Action Content Locker</CardTitle>
        <CardDescription>
          Implement your own custom unlock logic (payment, API verification, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentLocker
          config={config}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground mb-4">
              Complete the custom action to unlock this content.
            </p>
            <Button onClick={openLocker} style={{ backgroundColor: '#fd2d55' }}>
              Unlock Content
            </Button>
          </div>
        </ContentLocker>

        {isUnlocked && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Content is unlocked!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


