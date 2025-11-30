import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function StepsSection() {
  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: '#e8f3f2' }}>
      <div className="container mx-auto px-4 sm:px-5 md:px-6 max-w-3xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Frequently Asked <span style={{ color: '#fd2d55' }}>Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Everything you need to know about Scroll & Earn</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4" defaultValue="item-1">
          <AccordionItem value="item-1" className="border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 bg-card">
            <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-5 md:py-6 min-h-[44px] sm:min-h-[52px]">
              How do I activate Scroll & Earn?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5 md:pb-6">
              Simply click the 'Activate Now' button, and monetization will be enabled on your account instantly. You'll
              start earning from your very next scroll session.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 bg-card">
            <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-5 md:py-6 min-h-[44px] sm:min-h-[52px]">
              When can I cash out my earnings?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5 md:pb-6">
              You can cash out your earnings as soon as you reach the minimum withdrawal threshold. Payouts are
              processed instantly to your connected payment method.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 bg-card">
            <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-5 md:py-6 min-h-[44px] sm:min-h-[52px]">
              Does this affect my viewing experience?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5 md:pb-6">
              No, Scroll & Earn is designed to be completely non-intrusive. You can continue to enjoy your favorite
              content exactly as you always have, while earning rewards in the background.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 bg-card">
            <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-5 md:py-6 min-h-[44px] sm:min-h-[52px]">
              Why does TikTok pay people to scroll?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5 md:pb-6">
              TikTok realized users fuel the platform with their watch activity. Scroll & Earn was created to reward people for the engagement they already give—turning normal scrolling into rewards.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
