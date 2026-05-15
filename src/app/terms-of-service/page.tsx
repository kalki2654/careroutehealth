import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | CareRoute Health",
  description:
    "Read the terms that apply when using CareRoute Health's website, assessment form, WhatsApp support, and patient coordination service."
};

const sections = [
  {
    title: "Agreement to these terms",
    body: [
      "These Terms of Service apply when you visit the CareRoute Health website, submit an assessment, contact us by WhatsApp or email, or use our patient coordination and guidance service.",
      "By using our website or services, you agree to these terms, our Privacy Policy, and our Medical Disclaimer. If you do not agree, please do not use the website or rely on our communications."
    ]
  },
  {
    title: "What CareRoute Health provides",
    body: [
      "CareRoute Health provides patient coordination and guidance for people exploring medical treatment options in India. Our support may include collecting your treatment needs, explaining possible next steps, helping compare hospital or doctor options, coordinating estimates or second opinions, and assisting with travel-related guidance.",
      "We are not a hospital, clinic, emergency service, insurer, or licensed medical provider. Medical decisions are made by qualified healthcare professionals and by you."
    ]
  },
  {
    title: "Your responsibilities",
    items: [
      "Provide accurate, current, and complete information when using the assessment form or contacting us.",
      "Do not submit information about another person unless you are authorised to do so.",
      "Review all hospital, doctor, travel, visa, consent, and payment information before making decisions.",
      "Ask qualified healthcare professionals about diagnosis, treatment risks, alternatives, recovery, and follow-up care.",
      "Use the website and communication channels lawfully and respectfully."
    ]
  },
  {
    title: "Medical and emergency limits",
    body: [
      "Our service is not a substitute for professional medical advice, diagnosis, or treatment. Content on this website and messages from CareRoute Health are for coordination and general informational purposes only.",
      "Do not use this website or our messages for emergencies. If you may be experiencing a medical emergency, contact local emergency services or visit the nearest emergency department immediately."
    ]
  },
  {
    title: "Estimates and third-party services",
    body: [
      "Any treatment costs, timelines, availability, travel guidance, or hospital comparisons we share are informational estimates. Final costs, treatment eligibility, dates, outcomes, and policies are determined by independent hospitals, doctors, travel providers, government authorities, and other third parties.",
      "CareRoute Health is not responsible for clinical decisions, treatment outcomes, visa decisions, travel delays, accommodation issues, or fees charged by third parties."
    ]
  },
  {
    title: "Payments and commercial terms",
    body: [
      "Unless we agree otherwise in writing, medical treatment fees are paid directly to the relevant hospital, clinic, doctor, diagnostic centre, or service provider. Any CareRoute Health service fee, coordination fee, or commercial arrangement will be explained before you commit to a paid service.",
      "You are responsible for reviewing invoices, inclusions, exclusions, cancellation rules, refund terms, and payment instructions from any provider before paying."
    ]
  },
  {
    title: "Acceptable use",
    items: [
      "Do not misuse the website, attempt unauthorised access, interfere with security, or upload harmful code.",
      "Do not submit false, misleading, abusive, unlawful, or unauthorised information.",
      "Do not copy, scrape, resell, or misuse website content, branding, designs, or service materials without permission.",
      "Do not use CareRoute Health to harass staff, providers, patients, or partners."
    ]
  },
  {
    title: "Intellectual property",
    body: [
      "The CareRoute Health name, logo, website design, written content, visual assets, and service materials belong to CareRoute Health or its licensors. You may view and use the website for personal, non-commercial purposes related to exploring our services."
    ]
  },
  {
    title: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, CareRoute Health will not be liable for indirect, incidental, special, consequential, or punitive losses arising from your use of the website, reliance on information, third-party services, medical decisions, travel plans, or treatment outcomes.",
      "Nothing in these terms limits liability that cannot be limited under applicable law."
    ]
  },
  {
    title: "Changes, suspension, and availability",
    body: [
      "We may update the website, change services, revise these terms, or suspend access to parts of the website from time to time. The latest version of these terms will be posted on this page with the updated date."
    ]
  },
  {
    title: "Governing law and contact",
    body: [
      "These terms are intended to be governed by the laws of India, unless another written agreement with CareRoute Health states otherwise.",
      "For questions about these terms, contact hello@careroute.health."
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Terms for using CareRoute Health."
      intro="These terms explain how you may use the CareRoute Health website, assessment form, WhatsApp support, and patient coordination service."
      lastUpdated="May 14, 2026"
      sections={sections}
    />
  );
}
