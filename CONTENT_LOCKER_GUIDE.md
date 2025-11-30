# Content Locker Guide

A comprehensive guide to building and using your own content locker system.

## Overview

A content locker is a mechanism that restricts access to content until users complete certain actions (surveys, watching ads, subscribing, etc.). This guide shows you how to build and customize your own content locker.

## Features

- ✅ Multiple unlock methods (Survey, Ad Watch, Email Subscribe, Social Share, Custom)
- ✅ Multiple requirement support (e.g., complete 2 surveys)
- ✅ Progress tracking
- ✅ Persistent unlock state (localStorage)
- ✅ Fully customizable UI
- ✅ TypeScript support
- ✅ React hooks for easy integration

## Quick Start

### 1. Basic Usage

```tsx
import { ContentLocker, useContentLocker } from '@/components/content-locker'
import { Button } from '@/components/ui/button'

function MyComponent() {
  const config = {
    unlockMethod: 'survey',
    title: 'Unlock Content',
    description: 'Complete a survey to unlock.',
    surveyUrl: 'https://example.com/survey',
    onUnlock: () => console.log('Unlocked!')
  }

  const { isOpen, openLocker, setIsOpen } = useContentLocker(config)

  return (
    <ContentLocker
      config={config}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <div>
        <h2>Locked Content</h2>
        <Button onClick={openLocker}>Unlock</Button>
      </div>
    </ContentLocker>
  )
}
```

## Unlock Methods

### 1. Survey-Based Unlock

Requires users to complete a survey before accessing content.

```tsx
const config = {
  unlockMethod: 'survey',
  surveyUrl: 'https://your-survey-url.com',
  title: 'Complete Survey',
  description: 'Take a quick survey to unlock content.'
}
```

**Integration Tips:**
- Use survey platforms like Typeform, Google Forms, or SurveyMonkey
- For verification, implement a webhook that receives completion notifications
- Store completion status in your backend

### 2. Ad Watch Unlock

Users must watch a video advertisement to unlock content.

```tsx
const config = {
  unlockMethod: 'ad-watch',
  adVideoUrl: '/path/to/video.mp4',
  title: 'Watch Ad',
  description: 'Watch the video to unlock content.'
}
```

**Features:**
- Automatic progress tracking
- Requires 100% video completion
- Supports any video format (MP4, WebM, etc.)

### 3. Email Subscribe Unlock

Users subscribe with their email to unlock content.

```tsx
const config = {
  unlockMethod: 'email-subscribe',
  emailListId: 'your-mailchimp-list-id',
  title: 'Subscribe',
  description: 'Enter your email to unlock.'
}
```

**Integration Examples:**

**Mailchimp:**
```tsx
customUnlockAction: async () => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, listId: config.emailListId })
  })
  return response.ok
}
```

**ConvertKit:**
```tsx
customUnlockAction: async () => {
  const response = await fetch('https://api.convertkit.com/v3/forms/{form_id}/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, api_key: 'your-api-key' })
  })
  return response.ok
}
```

### 4. Social Share Unlock

Users share content on social media to unlock.

```tsx
const config = {
  unlockMethod: 'social-share',
  title: 'Share to Unlock',
  description: 'Share this content to unlock.'
}
```

**Features:**
- Uses native Web Share API when available
- Falls back to clipboard copy
- Can be extended to verify shares via API

### 5. Custom Unlock Action

Implement your own unlock logic.

```tsx
const config = {
  unlockMethod: 'custom',
  customUnlockAction: async () => {
    // Your custom logic
    // Verify payment, check API, etc.
    const response = await fetch('/api/verify-unlock', {
      method: 'POST',
      body: JSON.stringify({ userId, contentId })
    })
    return response.ok
  }
}
```

## Multiple Requirements

Require users to complete multiple actions:

```tsx
const config = {
  unlockMethod: 'survey',
  requiredCompletions: 2, // User must complete 2 surveys
  surveyUrl: 'https://example.com/survey',
  title: 'Complete 2 Surveys',
  description: 'Complete 2 surveys to unlock.'
}
```

The component automatically tracks progress and shows a progress bar.

## Advanced Customization

### Custom Styling

The content locker uses your existing UI components. Customize via:

1. **CSS Classes:** Modify the Dialog component styles
2. **Theme:** Update Tailwind config for colors
3. **Components:** Replace UI components with your own

### Persistent Unlock State

Unlock state is stored in `localStorage` with key: `content-locker-{method}`

To reset unlock state:
```tsx
localStorage.removeItem('content-locker-survey')
```

### Server-Side Verification

For production, always verify unlocks server-side:

```tsx
// Client-side
const config = {
  unlockMethod: 'survey',
  customUnlockAction: async () => {
    const response = await fetch('/api/verify-survey-completion', {
      method: 'POST',
      body: JSON.stringify({ userId, surveyId })
    })
    const data = await response.json()
    return data.verified
  }
}
```

```tsx
// Server-side API route
// app/api/verify-survey-completion/route.ts
export async function POST(request: Request) {
  const { userId, surveyId } = await request.json()
  
  // Verify with survey provider
  const verified = await verifySurveyCompletion(userId, surveyId)
  
  return Response.json({ verified })
}
```

## Integration with Survey Providers

### Typeform

```tsx
const config = {
  unlockMethod: 'survey',
  surveyUrl: 'https://yourtypeform.com/to/yourform',
  customUnlockAction: async () => {
    // Use Typeform webhook to verify completion
    // Store completion in your database
    const response = await fetch('/api/typeform-webhook', {
      method: 'POST',
      body: JSON.stringify({ formId: 'your-form-id' })
    })
    return response.ok
  }
}
```

### Google Forms

```tsx
const config = {
  unlockMethod: 'survey',
  surveyUrl: 'https://forms.gle/your-form-id',
  // Note: Google Forms doesn't have direct API
  // Use custom verification or manual approval
}
```

## Integration with Ad Networks

### Google AdSense

```tsx
const config = {
  unlockMethod: 'ad-watch',
  customUnlockAction: async () => {
    // Track ad view via Google AdSense API
    // Verify completion
    return true
  }
}
```

### Custom Ad Network

```tsx
const config = {
  unlockMethod: 'ad-watch',
  adVideoUrl: '/ads/video.mp4',
  customUnlockAction: async () => {
    // Track ad completion
    await fetch('/api/track-ad-view', {
      method: 'POST',
      body: JSON.stringify({ adId: 'ad-123', userId: 'user-456' })
    })
    return true
  }
}
```

## Best Practices

1. **Always Verify Server-Side:** Don't trust client-side unlock state alone
2. **Use HTTPS:** Required for Web Share API and secure operations
3. **Handle Errors:** Provide fallbacks if unlock methods fail
4. **Track Analytics:** Monitor unlock rates and user behavior
5. **Respect Privacy:** Follow GDPR/CCPA when collecting emails
6. **Test Thoroughly:** Test all unlock methods before production

## Security Considerations

1. **Don't Store Sensitive Data:** Only store unlock status, not user data
2. **Verify Server-Side:** Always verify unlocks on your backend
3. **Rate Limiting:** Prevent abuse with rate limiting
4. **CSRF Protection:** Use CSRF tokens for API calls
5. **Input Validation:** Validate all user inputs

## Troubleshooting

### Content Not Unlocking

- Check browser console for errors
- Verify localStorage is enabled
- Check unlock method configuration
- Verify API endpoints are working

### Unlock State Not Persisting

- Check localStorage permissions
- Verify key format: `content-locker-{method}`
- Clear browser cache and try again

### Video Not Playing

- Check video URL is accessible
- Verify video format is supported
- Check CORS settings if video is on different domain

## Examples

See `components/content-locker-example.tsx` for complete working examples.

## API Reference

### ContentLocker Component

```tsx
<ContentLocker
  config: ContentLockerConfig
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children?: ReactNode
/>
```

### useContentLocker Hook

```tsx
const {
  isOpen: boolean
  isUnlocked: boolean
  openLocker: () => void
  closeLocker: () => void
  setIsOpen: (open: boolean) => void
} = useContentLocker(config)
```

### ContentLockerConfig

```tsx
interface ContentLockerConfig {
  title?: string
  description?: string
  unlockMethod: 'survey' | 'ad-watch' | 'email-subscribe' | 'social-share' | 'custom'
  requiredCompletions?: number
  surveyUrl?: string
  adVideoUrl?: string
  emailListId?: string
  customUnlockAction?: () => Promise<boolean>
  onUnlock?: () => void
  lockedContent?: ReactNode
  unlockedContent?: ReactNode
}
```

## Next Steps

1. Choose your unlock method(s)
2. Set up backend verification
3. Integrate with your email/survey provider
4. Customize the UI to match your brand
5. Test thoroughly
6. Deploy and monitor

## Support

For issues or questions, check:
- Component code: `components/content-locker.tsx`
- Examples: `components/content-locker-example.tsx`
- UI components: `components/ui/`


