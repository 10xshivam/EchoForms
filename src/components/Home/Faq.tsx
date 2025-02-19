import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    value:"item-1",
    question: "What is EchoForms?",
    answer:
      "EchoForms is an AI-powered form builder that lets you create, customize, and share forms effortlessly, no coding required.",
  },
  {
    value:"item-2",
    question: "How does AI generate forms?",
    answer:
      "Simply describe the type of form you need, and EchoForms will automatically generate a fully functional form in seconds.",
  },
  {
    value:"item-3",
    question: "Can I customize the forms after AI generates them?",
    answer:
      "Yes! You can edit fields, change layouts, and add custom validation to make the form fit your needs.",
  },
  {
    value:"item-4",
    question: "How do I share my forms?",
    answer:
      "Each form comes with a unique shareable link and QR code. You can also embed it directly into your website or app.",
  },
  {
    value:"item-5",
    question: "What integrations does EchoForms support?",
    answer:
      "EchoForms integrates with Notion, Zapier, Google Sheets, and more to automate data collection and workflows.",
  },
  {
    value:"item-6",
    question: "Is there a free plan available?",
    answer:
      "Yes! The free plan lets you create up to 5 forms. Upgrade to Pro or Enterprise for unlimited forms and advanced features.",
  },
];

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-[700px] max-md:w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
