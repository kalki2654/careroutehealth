"use client";

import { LegalPage } from "@/components/legal/LegalPage";
import { useIntakeModal } from "@/hooks/useIntakeModal";
import { IntakeModal } from "@/components/intake/IntakeModal";

const sections = [
  {
    title: "CareRoute Health is not a medical provider",
    body: [
      "CareRoute Health is a patient coordination and guidance service. We are not a hospital, clinic, emergency service, insurer, or licensed medical provider.",
      "We do not diagnose medical conditions, prescribe treatment, perform medical procedures, or replace advice from a qualified healthcare professional."
    ]
  },
  {
    title: "No emergency care",
    body: [
      "This website, our assessment form, WhatsApp communication, and our coordination service are not designed for medical emergencies. If you may be experiencing a medical emergency, contact local emergency services or go to the nearest emergency department immediately."
    ]
  },
  {
    title: "Information is general guidance",
    body: [
      "Content on this website is provided for general informational and coordination purposes. It should not be treated as medical advice, a diagnosis, a treatment plan, or a guarantee that any hospital, doctor, treatment, or outcome is suitable for you."
    ]
  },
  {
    title: "Doctors and hospitals make medical decisions",
    body: [
      "All medical advice, diagnoses, treatment plans, risks, prescriptions, procedures, and clinical decisions must come from qualified doctors or licensed healthcare professionals.",
      "CareRoute Health may help you collect information, compare options, coordinate communication, and understand next steps, but the final medical decision belongs to you and your treating healthcare professionals."
    ]
  },
  {
    title: "Costs, timelines, and outcomes may vary",
    body: [
      "Any cost ranges, waiting times, travel timelines, hospital comparisons, or treatment estimates shared by CareRoute Health are informational estimates only. Final pricing, medical eligibility, treatment duration, and outcomes depend on the hospital, doctor, diagnosis, reports, complications, patient condition, and other factors.",
      "We do not guarantee medical results, recovery timelines, visa approval, travel arrangements, hospital admission, appointment availability, or final treatment cost."
    ]
  },
  {
    title: "Third-party providers",
    body: [
      "Hospitals, doctors, diagnostic centres, travel providers, accommodation providers, translators, and other partners are independent third parties. CareRoute Health is not responsible for their clinical decisions, services, fees, policies, errors, delays, or outcomes."
    ]
  },
  {
    title: "Your responsibility",
    items: [
      "Share accurate and complete information with your doctors and care providers.",
      "Ask your treating doctor about risks, alternatives, expected results, recovery, and follow-up care.",
      "Review hospital documents, consent forms, estimates, and treatment plans before making decisions.",
      "Seek a second opinion if you are unsure about any recommendation or treatment option."
    ]
  },
  {
    title: "Use of this website",
    body: [
      "By using this website or contacting CareRoute Health, you understand that our role is coordination and guidance, not direct medical care. If you disagree with this disclaimer, please do not rely on the website or our communications for medical decisions."
    ]
  }
];

export default function MedicalDisclaimerPage() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <>
      <LegalPage
        eyebrow="Medical Disclaimer"
        title="Important limits of our guidance."
        intro="CareRoute Health helps patients and families understand treatment options and coordinate care in India. This page explains what our service does and does not provide."
        lastUpdated="May 14, 2026"
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
