import SectionHeading from '../../components/marketing/SectionHeading';
import { usePageTitle } from '../../hooks/usePageTitle';

const SECTIONS = [
  {
    title: '1. Information we collect',
    body: 'When you register a business, request a demo, contact us, or subscribe to updates, we collect the information you provide directly — such as your name, business name, email, phone number, and address. We also collect basic usage data (pages visited, browser type) to keep the site working well.',
  },
  {
    title: '2. How we use your information',
    body: 'We use your information to operate and improve Tijarat, verify and activate accounts, respond to inquiries, send product updates you’ve opted into, and meet legal and security obligations. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Cookies',
    body: 'We use a small number of cookies and local-storage entries for essential functionality, such as remembering your theme preference. We do not use third-party advertising cookies.',
  },
  {
    title: '4. Third-party services',
    body: 'Form submissions on this site (contact, demo requests, newsletter) are delivered via a third-party form-processing service. Account registration and login are processed by our ERPNext-based backend once connected. Each of these services processes data solely to deliver the functionality described.',
  },
  {
    title: '5. Data security',
    body: 'We take reasonable technical and organizational measures to protect the information you share with us. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: '6. Your rights',
    body: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us at the email below.',
  },
  {
    title: '7. Changes to this policy',
    body: 'We may update this policy as Tijarat evolves. Material changes will be reflected by an updated date at the top of this page.',
  },
  {
    title: '8. Contact us',
    body: 'Questions about this policy can be sent to support@tijaratapp.com.',
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
