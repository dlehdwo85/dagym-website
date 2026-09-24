import { Plus } from "lucide-react";
import type { Faq } from "@/data/insight";
import { JsonLd } from "@/components/ui/JsonLd";

/** FAQ — 네이티브 <details> 로 JS 없이 동작 (키보드 · 스크린리더 지원) */
export function FaqList({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <ul className="border-t border-mist-200">
        {items.map((f) => (
          <li key={f.q} className="border-b border-mist-200">
            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-4">
                  <span className="t-eyebrow hidden w-16 shrink-0 text-mist-400 sm:inline">{f.group}</span>
                  <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">{f.q}</span>
                </span>
                <Plus
                  className="size-5 shrink-0 text-mist-500 transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </summary>
              <p className="t-body max-w-3xl pb-7 text-mist-600 sm:pl-20">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
