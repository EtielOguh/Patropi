import { ChevronDown } from "lucide-react";

export type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, index) => (
        <details key={item.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold"><span>{item.question}</span><ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary>
          <p className="max-w-3xl pb-6 pr-10 leading-7 text-ink/75">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
