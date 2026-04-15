"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/marketing/animate";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
  description?: string;
}

export function FAQSection({ faqs, heading, description }: FAQSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="w-full py-16 px-4 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {heading && (
          <FadeIn>
            <div className="mb-14">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">{heading}</h2>
              {description && (
                <p className="mt-4 max-w-[600px] text-lg text-[#74726D]">
                  {description}
                </p>
              )}
            </div>
          </FadeIn>
        )}
        <FadeIn delay={0.15}>
          <div className="mx-auto max-w-[840px]">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={String(index)}>
                  <AccordionTrigger className="text-left text-lg font-medium py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-[#74726D] leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
