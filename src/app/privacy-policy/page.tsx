"use client";

import { LegalPage } from "@/components/legal/LegalPage";
import { useIntakeModal } from "@/hooks/useIntakeModal";
import { IntakeModal } from "@/components/intake/IntakeModal";

const sections = [
  {
    title: "Who this policy applies to",
    body: [
      "This Privacy Policy applies to people who visit the CareRoute Health website, use our intake forms, contact us via email or other channels, or use our healthcare navigation and support services for U.S. health insurance or India family healthcare coordination."
    ]
  },
  {
    title: "Information we collect",
    body: [
      "We collect information you choose to share with us through our website forms, intake process, email, or other communication channels. This may include your name, email address, phone number or WhatsApp contact, country of residence, and details about your healthcare situation or support needs.",
      "For USA Health Insurance Navigation: This may include information about your insurance provider, the type of help you need (understanding coverage, deciding where to go for care, cost estimates, bill review), and whether you need support before or after receiving care.",
      "For India Health Access Membership: This may include information about who you're supporting (parent, spouse, child, other family member), what help you need (appointments, follow-ups, routine care coordination, general health guidance), your country, and your family's city in India.",
      "If you share medical records, reports, prescriptions, scans, test results, or other health documents, we treat that information as sensitive and handle it with additional care and security."
    ]
  },
  {
    title: "How we use your information",
    items: [
      "To respond to your questions and provide healthcare navigation and support services.",
      "To understand your situation and provide relevant guidance for U.S. healthcare decisions or India family care coordination.",
      "To communicate with you via email, phone, WhatsApp, or another channel you prefer.",
      "To coordinate appointments, provide cost guidance, review insurance coverage, or support family healthcare coordination when you request our help.",
      "To improve our services and understand how people use our website.",
      "To protect our service, prevent misuse, maintain records, and meet legal or regulatory responsibilities where applicable."
    ]
  },
  {
    title: "How we share information",
    body: [
      "We do not sell your personal information. We only share information when it is necessary to provide the service you requested, when you explicitly ask us to share it, or when we are legally required to do so.",
      "For India family healthcare coordination: Medical information may be shared with hospitals, doctors, or healthcare providers in India only when it is relevant to your request and after you have given us clear permission.",
      "We may use third-party service providers (such as email services, form processors, or communication tools) to help us operate our website and provide our services. These providers are required to protect your information and use it only for the purposes we specify."
    ]
  },
  {
    title: "Cookies and analytics",
    body: [
      "Our website may use cookies and similar technologies to understand how visitors use the site and to improve the user experience. You can control cookie settings through your browser.",
      "We may use analytics services to understand website traffic and usage patterns. These services may collect information about your visit in accordance with their own privacy policies."
    ]
  },
  {
    title: "Email and third-party communication tools",
    body: [
      "If you contact us through email, forms, WhatsApp, or other third-party communication tools, those services may process information under their own privacy terms. We recommend reviewing the privacy policies of any third-party services you use to contact us."
    ]
  },
  {
    title: "Security and data protection",
    body: [
      "We use reasonable technical and organizational safeguards to protect information shared with us, including encryption for sensitive data transmission and secure storage practices.",
      "No online transmission or storage system can be guaranteed to be completely secure. We cannot guarantee absolute security, but we take data protection seriously and continuously work to improve our security measures.",
      "We retain information only for as long as needed to provide our services, for legitimate business records, for follow-up support, or where retention is required by law."
    ]
  },
  {
    title: "Your rights and choices",
    items: [
      "You can request to access, correct, update, or delete your personal information by contacting us at careroutehealth@zohomail.in.",
      "You can opt out of follow-up communications at any time.",
      "You can choose not to share medical documents or sensitive information until you are comfortable doing so.",
      "You can ask which healthcare providers or partners your information has been shared with in connection with your request.",
      "Depending on your location, you may have additional rights under applicable data protection laws (such as GDPR, CCPA, or India's DPDP Act). Contact us to exercise these rights."
    ]
  },
  {
    title: "Children and family members",
    body: [
      "CareRoute Health services are intended for adults and for family members or caregivers acting with appropriate authority. If you are sharing information about a child or another person, you should only do so if you are authorized to act on their behalf."
    ]
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The latest version will always be available on this page with the updated date shown below.",
      "If we make significant changes, we will notify users through our website or via email where appropriate."
    ]
  },
  {
    title: "Contact us about privacy",
    body: [
      "If you have questions about this Privacy Policy, how we handle your information, or want to exercise your privacy rights, please contact us at careroutehealth@zohomail.in.",
      "[PLACEHOLDER: Add physical mailing address if required by applicable law]"
    ]
  }
];

export default function PrivacyPolicyPage() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <>
      <LegalPage
        eyebrow="Privacy Policy"
        title="How we handle your information"
        intro="CareRoute Health provides healthcare navigation and support services for families across borders. This policy explains what information we collect, how we use it, how we protect it, and your rights regarding your personal information."
        lastUpdated="January 15, 2025"
        sections={sections}
        onOpenIntake={openModal}
      />
      <IntakeModal
        isOpen={isOpen}
        onClose={closeModal}
        initialPath={initialPath}
      />
    </>
  );
}
