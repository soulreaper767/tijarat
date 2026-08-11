import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Send } from 'lucide-react';

import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import SectionHeading from '../../components/marketing/SectionHeading';
import { usePageTitle } from '../../hooks/usePageTitle';
import { sendFormSubmission } from '../../services/forms';

const CONTACT_CARDS = [
  { icon: Mail, title: 'Email us', value: 'support@tijaratapp.com' },
  { icon: MapPin, title: 'Based in', value: 'Lahore, Pakistan' },
  { icon: Clock, title: 'Response time', value: 'Within 1 business day' },
];

const initialForm = { name: '', email: '', company: '', message: '' };

export default function Contact() {
  usePageTitle('Contact');
  const { addToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendFormSubmission({
        subject: `New contact form message from ${form.name}`,
        name: form.name,
        email: form.email,
        company: form.company,
        message: form.message,
      });
      setForm(initialForm);
      addToast({
        variant: 'success',
        title: 'Message sent',
        description: 'Thanks for reaching out — we will get back to you shortly.',
      });
    } catch (err) {
      addToast({ variant: 'danger', title: 'Could not send message', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title="Let's talk about your distribution & fulfillment network" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4 lg:col-span-2"
        >
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                <card.icon size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{card.title}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{card.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input name="name" label="Full name" required value={form.name} onChange={update('name')} />
            <Input
              name="email"
              label="Work email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
            />
          </div>
          <Input
            name="company"
            label="Company"
            className="mt-4"
            value={form.company}
            onChange={update('company')}
          />
          <Textarea
            name="message"
            label="Message"
            required
            className="mt-4"
            rows={5}
            placeholder="Tell us about your distribution network..."
            value={form.message}
            onChange={update('message')}
          />
          <Button type="submit" className="mt-5" iconRight={Send} loading={loading}>
            Send message
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
