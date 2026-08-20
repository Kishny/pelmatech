import {
  AccordionContent,
  AccordionItem as UiAccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface AccordionItemProps {
  value: string
  question: string
  answer: string
}

/** Thin wrapper composing the base shadcn accordion primitives for one FAQ entry. */
export function AccordionItem({ value, question, answer }: AccordionItemProps) {
  return (
    <UiAccordionItem value={value}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </UiAccordionItem>
  )
}
