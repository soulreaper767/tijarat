import { Mail, MessageCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const PHONE_DISPLAY = '+923 112 44444';
const PHONE_WHATSAPP = '92311244444';
const EMAIL = 'support@tijaratapp.com';

const UPDATES = [
  'New: credit facility now available for qualified distributors & retailers',
  'E-commerce fulfillment now onboarding partners',
  'Now covering 6 cities — Lahore, Karachi, Islamabad, Faisalabad, Multan, Peshawar',
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaLinkedinIn, label: 'LinkedIn' },
  { icon: FaXTwitter, label: 'X' },
];

export default function TopBar() {
  return (
    <div className="border-b border-primary-800 bg-primary-700 text-primary-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      <div className="mx-auto flex h-9 max-w-7xl items-center gap-4 px-4 text-xs sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-4">
          <a
            href={`https://wa.me/${PHONE_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white dark:hover:text-neutral-100"
          >
            <MessageCircle size={13} />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-1.5 transition-colors hover:text-white dark:hover:text-neutral-100"
          >
            <Mail size={13} />
            <span className="hidden sm:inline">{EMAIL}</span>
          </a>
        </div>

        <div className="hidden flex-1 overflow-hidden md:block">
          <div className="flex w-max animate-marquee items-center gap-10">
            {[...UPDATES, ...UPDATES].map((update, i) => (
              <span key={i} className="whitespace-nowrap text-primary-200 dark:text-neutral-500">
                {update}
              </span>
            ))}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-primary-200 transition-colors hover:text-white dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              <Icon size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
