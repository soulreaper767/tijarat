import SectionHeading from '../../components/marketing/SectionHeading';
import { usePageTitle } from '../../hooks/usePageTitle';

const SECTIONS = [
  {
    title: '1. Information we collect',
    body: 'When you register a business on Tijarat — through this website, the Tijarat Android app, or with a Field Officer\'s help — we collect the information you provide directly: your name and contact person, business name, mobile number, email, city/territory, business type (retailer, wholesaler, distributor, manufacturer, or e-commerce), trade category, address, and a password (stored hashed, never in plain text). If you complete KYC/KYB verification, we also collect your CNIC number, a shop photo, and verification status. If you grant location access during registration or order booking, we collect GPS latitude/longitude to verify service-territory coverage. When you request a demo, contact us, or subscribe to updates on this site, we collect what you submit in that form, plus basic usage data (pages visited, browser type).',
  },
  {
    title: '2. The Tijarat Android app',
    body: 'The Tijarat Android app is a Trusted Web Activity: it opens the same Tijarat backend portal (portal.tijaratapp.com) inside Chrome\'s engine, rather than a separate native codebase. It does not collect any information beyond what is described in this policy, and does not request device permissions beyond internet access and, if you choose to share your location during registration, coarse/precise location. Your login session is the same one you\'d get from the mobile browser.',
  },
  {
    title: '3. How we use your information',
    body: 'We use your information to create and operate your account, match you with suppliers/customers in your served territory, process and route orders, verify identity for trust and fraud-prevention purposes (KYC/KYB), respond to inquiries, send order and account notifications, and meet legal and security obligations. We do not sell your personal information to third parties, and we do not use it for third-party advertising.',
  },
  {
    title: '4. Where your data is stored',
    body: 'Account, order, and business data is stored in Tijarat\'s own backend (built on ERPNext), hosted on infrastructure we control. It is not stored by or shared with the app store, analytics networks, or ad platforms.',
  },
  {
    title: '5. Cookies and local storage',
    body: 'We use a small number of cookies and local-storage entries for essential functionality — keeping you logged in and remembering your theme preference. We do not use third-party advertising cookies.',
  },
  {
    title: '6. Third-party services',
    body: 'Form submissions on this marketing site (contact, demo requests, newsletter) are delivered via a third-party form-processing service, used solely to deliver that functionality. Account registration, login, and all order/business data are processed directly by our own ERPNext-based backend — not by any third party.',
  },
  {
    title: '7. Data retention and deletion',
    body: 'We retain your account and transaction data for as long as your account is active and as needed to meet legal, accounting, and dispute-resolution obligations. You may request deletion of your account and personal data at any time by contacting us at the email below; we will delete or anonymize it except where retention is required by law (e.g. financial records).',
  },
  {
    title: '8. Data security',
    body: 'We take reasonable technical and organizational measures to protect the information you share with us, including transmitting data over encrypted connections and storing passwords hashed. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: '9. Your rights',
    body: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us at the email below.',
  },
  {
    title: '10. Children\'s privacy',
    body: 'Tijarat is a business-to-business platform intended for use by adults registering or operating a business. It is not directed at children, and we do not knowingly collect information from anyone under 18.',
  },
  {
    title: '11. Changes to this policy',
    body: 'We may update this policy as Tijarat evolves. Material changes will be reflected by an updated date at the top of this page.',
  },
  {
    title: '12. Contact us',
    body: 'Questions about this policy, or requests to access/correct/delete your data, can be sent to support@tijaratapp.com.',
  },
];

export default function Privacy() {
  usePageTitle('Privacy Policy');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" align="left" />
      <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">Last updated August 2026</p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
