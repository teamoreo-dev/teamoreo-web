"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="overflow-hidden rounded-xl border border-line bg-brand-soft shadow-[0_4px_0_rgba(22,21,26,0.12)]">
            <button
              type="button"
              className="flex min-h-20 w-full items-center justify-between gap-6 px-5 py-5 text-left text-lg font-semibold text-ink sm:px-7 sm:text-xl"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink text-xl font-normal leading-none text-ink" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div id={`faq-answer-${index}`} className="border-t border-brand/20 px-5 pb-6 pt-4 text-base leading-7 text-muted sm:px-7">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
