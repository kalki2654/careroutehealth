"use client";

import { LegalPage } from "@/components/legal/LegalPage";
import { useIntakeModal } from "@/hooks/useIntakeModal";
import { IntakeModal } from "@/components/intake/IntakeModal";

const sections = [
  {
    title: "Agreement to these terms",
    body: [
      "These Terms of Service apply when you visit the CareRoute Health website, use our intake forms, contact us via email or other channels, or use our healthcare navigation and support services.",
      "By using our website or services, you agree to these terms, our Privacy Policy, and our Medical Disclaimer. If you do not agree, please do not use the website or services."
    ]
  },
  {
    title: "What CareRoute Health provides",
    body: [
      "CareRoute Health provides healthcare navigation and support services to help families make better healthcare decisions across borders. Our services include:",
      "USA Health Insurance Navigation: Guidance for understanding U.S. health insurance coverage, deciding where to go for care, estimating costs, finding in-network providers, and reviewing medical bills.",
      "India Health Access Membership: Ongoing support for families coordinating healthcare for loved ones in India from abroad, including appointment coordination, follow-up tracking, and routine care guidance.",
      "We are not a hospital, clinic, emergency service, insurance company, or licensed medical provider. We provide navigation, coordination, and informational support. Medical decisions and treatment are provided by qualified healthcare professionals."
    ]
  },
  {
    title: "Your responsibilities",
    items: [
      "Provide accurate, current, and complete information when using our forms or contacting us.",
      "Do not submit information about another person unless you are authorized to do so (such as a parent acting for a child or a family member with appropriate authority).",
      "Seek professional medical advice from qualified healthcare providers for all medical decisions, diagnoses, and treatment plans.",
      "Review all insurance coverage details, provider information, cost estimates, and billing information independently before making healthcare decisions.",
      "For India healthcare coordination: Verify all appointment details, provider credentials, and treatment information with the relevant healthcare providers.",
      "Use the website and communication channels lawfully, respectfully, and in good faith."
    ]
  },
  {
    title: "Medical and emergency disclaimer",
    body: [
      "CareRoute Health does not provide medical advice, diagnosis, or treatment. Information on this website and in our communications is for general informational and navigation purposes only.",
      "Do not use this website or our services for medical emergencies. If you are experiencing a medical emergency, contact local emergency services immediately (911 in the U.S., 102 or 108 in India).",
      "Always consult with qualified healthcare professionals before making medical decisions. CareRoute Health guidance is not a substitute for professional medical care."
    ]
  },
  {
    title: "Information accuracy and estimates",
    body: [
      "We strive to provide accurate and helpful information, but insurance coverage details, healthcare costs, provider availability, appointment scheduling, and treatment information can change. We cannot guarantee the accuracy or completeness of all information.",
      "Any cost estimates, coverage explanations, or provider information we share are informational only. Final costs, coverage decisions, treatment eligibility, and appointment availability are determined by insurance companies, healthcare providers, and other third parties.",
      "You are responsible for verifying all information with the relevant insurance companies, healthcare providers, and other parties before making decisions."
    ]
  },
  {
    title: "Third-party services and providers",
    body: [
      "CareRoute Health may help you connect with or coordinate care from third-party healthcare providers, insurance companies, hospitals, clinics, or other service providers. These third parties operate independently and are responsible for their own services, policies, fees, and outcomes.",
      "CareRoute Health is not responsible for the actions, decisions, quality of care, billing practices, or outcomes provided by third-party providers.",
      "Any agreements, payments, or arrangements you make with third-party providers are between you and those providers."
    ]
  },
  {
    title: "Payments and fees",
    body: [
      "Healthcare treatment costs, insurance premiums, and medical bills are paid directly to the relevant healthcare providers, insurance companies, or service providers—not to CareRoute Health.",
      "CareRoute Health service fees (if applicable) will be clearly explained before you commit to any paid service. We will provide information about what is included, payment terms, and any cancellation or refund policies.",
      "[PLACEHOLDER: Add specific pricing structure and payment terms when finalized]"
    ]
  },
  {
    title: "Acceptable use of the website",
    items: [
      "Do not misuse the website, attempt unauthorized access, interfere with security features, or upload harmful code or malware.",
      "Do not submit false, misleading, abusive, unlawful, or unauthorized information.",
      "Do not copy, scrape, redistribute, or commercially exploit website content, branding, or materials without permission.",
      "Do not use CareRoute Health services to harass, threaten, or harm others.",
      "Do not impersonate others or misrepresent your relationship with any person or entity."
    ]
  },
  {
    title: "Intellectual property",
    body: [
      "The CareRoute Health name, logo, website design, written content, graphics, and service materials are owned by CareRoute Health or its licensors and are protected by copyright, trademark, and other intellectual property laws.",
      "You may view and use the website for personal, non-commercial purposes related to exploring our services. You may not reproduce, distribute, modify, or create derivative works without our written permission."
    ]
  },
  {
    title: "Limitation of liability",
    body: [
      "To the maximum extent permitted by applicable law, CareRoute Health and its officers, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:",
      "Your use of or inability to use the website or services; reliance on information provided through the website or our communications; decisions made based on our guidance or information; third-party healthcare services, insurance coverage decisions, or treatment outcomes; technical issues, data loss, or service interruptions; or any other matter relating to our services.",
      "Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited under applicable law.",
      "[PLACEHOLDER: Add specific liability cap if applicable under business structure]"
    ]
  },
  {
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless CareRoute Health from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of the services, your violation of these terms, or your violation of any rights of another party.",
      "[PLACEHOLDER: Adjust indemnification language based on final legal review]"
    ]
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these Terms of Service from time to time to reflect changes in our services, legal requirements, or business practices. The latest version will always be available on this page with the updated date shown below.",
      "If we make significant changes, we will notify users through our website or via email where appropriate. Your continued use of the website or services after changes are posted constitutes acceptance of the updated terms."
    ]
  },
  {
    title: "Termination and suspension",
    body: [
      "We reserve the right to suspend or terminate your access to the website or services if you violate these terms, engage in fraudulent or harmful behavior, or for any other reason at our discretion.",
      "You may stop using our services at any time. Certain provisions of these terms (including limitations of liability, intellectual property rights, and dispute resolution) will survive termination."
    ]
  },
  {
    title: "Governing law and disputes",
    body: [
      "[PLACEHOLDER: Specify governing law based on business registration - e.g., laws of India, laws of the State of Delaware, etc.]",
      "[PLACEHOLDER: Specify dispute resolution mechanism - e.g., arbitration, mediation, court jurisdiction]",
      "For questions about these terms, contact us at careroutehealth@zohomail.in."
    ]
  },
  {
    title: "General provisions",
    body: [
      "If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full effect.",
      "These terms constitute the entire agreement between you and CareRoute Health regarding use of the website and services, unless you have a separate written agreement with us.",
      "Our failure to enforce any provision of these terms does not waive our right to enforce it in the future."
    ]
  }
];

export default function TermsOfServicePage() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <>
      <LegalPage
        eyebrow="Terms of Service"
        title="Terms for using CareRoute Health"
        intro="These terms explain your rights and responsibilities when using the CareRoute Health website and services. Please read them carefully."
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
