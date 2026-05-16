import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | CareRoute Health",
  description:
    "Read how CareRoute Health collects, uses, protects, and shares information provided by patients and families."
};

const sections = [
  {
    title: "Who this policy applies to",
    body: [
      "This Privacy Policy applies to people who visit the CareRoute Health website, contact us on WhatsApp or email, submit an assessment, or share information so we can help them explore medical treatment options in India."
    ]
  },
  {
    title: "Information we collect",
    body: [
      "We collect information you choose to share with us. This may include your name, email address, WhatsApp or phone number, country of residence, treatment interest, preferred contact time, preferred contact method, and details about your medical concern.",
      "If you send medical records, reports, prescriptions, scans, test results, or other health documents, we treat that information as sensitive and handle it with additional care."
    ]
  },
  {
    title: "How we use your information",
    items: [
      "To respond to your questions and provide patient coordination support.",
      "To understand your treatment needs and prepare relevant hospital or doctor options.",
      "To communicate with you by WhatsApp, phone, email, or another channel you request.",
      "To coordinate second opinions, estimates, appointments, travel guidance, or related support when you ask us to do so.",
      "To protect our service, prevent misuse, maintain records, and meet legal or regulatory responsibilities where applicable."
    ]
  },
  {
    title: "How we share information",
    body: [
      "We do not sell your personal information. We only share information when it is necessary to provide the service you requested, when you ask us to share it, or when we are legally required to do so.",
      "Medical information may be shared with hospitals, doctors, diagnostic centres, or care partners only when it is relevant to your request and after you have given us permission or clear instructions."
    ]
  },
  {
    title: "WhatsApp, email, and third-party services",
    body: [
      "If you contact us through WhatsApp, email, forms, or other third-party tools, those services may process information under their own privacy terms. Please avoid sharing highly sensitive information through channels you are not comfortable using."
    ]
  },
  {
    title: "Security and retention",
    body: [
      "We use reasonable technical and organisational safeguards to protect information shared with us. No online transmission or storage system can be guaranteed to be completely secure.",
      "We keep information only for as long as needed for the purpose it was collected, for follow-up care coordination, for legitimate business records, or where retention is required by law."
    ]
  },
  {
    title: "Your choices",
    items: [
      "You can ask us to correct, update, or delete your personal information.",
      "You can ask us not to contact you for follow-up communication.",
      "You can choose not to send medical documents until you are comfortable with the next step.",
      "You can ask which hospitals or partners your information has been shared with in connection with your request."
    ]
  },
  {
    title: "Children and family members",
    body: [
      "CareRoute Health is intended for adults and for family members or caregivers acting with appropriate authority. If information relates to a child or another person, you should only share it if you are authorised to do so."
    ]
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. The latest version will always show the updated date on this page."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle your information."
      intro="CareRoute Health receives personal and medical information from patients and families looking for treatment guidance. This policy explains what we collect, why we use it, and how you can contact us about your information."
      lastUpdated="May 14, 2026"
      sections={sections}
    />
  );
}
