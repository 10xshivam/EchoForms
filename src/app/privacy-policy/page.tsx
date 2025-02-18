"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-40">
      <Navbar />
      <div className="w-full justify-center items-center mb-10 flex flex-col">
        <h3 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-black/50  dark:from-white dark:to-white/50 bg-clip-text text-transparent py-1">
          Privacy Policy for EchoForms
        </h3>
        <p className="text-zinc-500 text-base text-center mt-4 tracking-tight max-w-2xl">
          At EchoForms, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your
          information when you use our services.
        </p>
      </div>
      <div className="border w-full max-w-[800px] p-10 flex-col gap-8 flex mb-28">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">
              What Information Do We Collect?
            </AccordionTrigger>
            <AccordionContent>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  and other details you provide when filling out forms.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our platform, such as form submissions and
                  responses.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your
                  experience and analyze usage patterns.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold">
              How Do We Use Your Information?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To process and manage your form submissions.</li>
                <li>To improve our services and user experience.</li>
                <li>To communicate with you regarding updates or support.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold">
              How Do We Protect Your Data?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We implement industry-standard security measures to protect your
                data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Encryption of sensitive information.</li>
                <li>Regular security audits and updates.</li>
                <li>
                  Access controls to ensure only authorized personnel can access
                  your data.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base font-semibold">
              Do We Share Your Data with Third Parties?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We do not sell or rent your personal information to third
                parties. However, we may share your data in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  With service providers who assist us in operating our
                  platform.
                </li>
                <li>When required by law or to protect our rights.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base font-semibold">
              What Are Your Rights?
            </AccordionTrigger>
            <AccordionContent>
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Access:</strong> Request a copy of your data.
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccuracies.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your data.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt-out of marketing communications.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-base font-semibold">
              How Can You Contact Us?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Email:{" "}
                  <Link
                    href="mailto:support@echoforms.com"
                    className="underline"
                  >
                    support@echoforms.com
                  </Link>
                </li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
