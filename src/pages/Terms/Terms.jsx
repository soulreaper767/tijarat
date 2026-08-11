import SectionHeading from '../../components/marketing/SectionHeading';
import { usePageTitle } from '../../hooks/usePageTitle';

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: 'By accessing or using the Tijarat website or platform, you agree to be bound by these terms. If you are registering on behalf of a business, you confirm you have the authority to accept these terms for that business.',
  },
  {
    title: '2. Description of service',
    body: 'Tijarat connects manufacturers, distributors, wholesalers, traders and retailers, and provides warehousing, dispatch, delivery and e-commerce fulfillment services. Some features described on this site are in active development and availability may vary by region and account type.',
  },
  {
    title: '3. Account registration',
    body: 'Registration requests are reviewed and verified before an account is activated — either self-serve or with the assistance of a field officer. You’re responsible for the accuracy of the information you submit and for keeping your login credentials secure.',
  },
  {
    title: '4. Acceptable use',
    body: 'You agree not to misuse the platform — including attempting unauthorized access, submitting fraudulent orders, or interfering with the service’s normal operation.',
  },
  {
    title: '5. Credit & financing terms',
    body: 'Any credit facility, BNPL eligibility, or financing offered through the platform is subject to a separate eligibility review and is available only to qualified businesses. Approval, limits and terms are determined at our discretion.',
  },
  {
    title: '6. Intellectual property',
    body: 'The Tijarat name, logo, and all site content are the property of Sibyl Technologies unless otherwise noted, and may not be used without permission.',
  },
  {
    title: '7. Limitation of liability',
    body: 'Tijarat is provided on an "as is" basis. To the extent permitted by law, Sibyl Technologies is not liable for indirect or consequential damages arising from use of the platform.',
  },
  {
    title: '8. Changes to these terms',
    body: 'We may revise these terms from time to time. Continued use of the platform after a revision constitutes acceptance of the updated terms.',
  },
  {
    title: '9. Contact us',
    body: 'Questions about these terms can be sent to support@tijaratapp.com.',
  },
];

export default function Terms() {
  usePageTitle('Terms of Service');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Terms of Service" align="left" />
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
