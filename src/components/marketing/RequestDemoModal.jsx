import { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';
import { sendFormSubmission } from '../../services/forms';

const ROLE_OPTIONS = [
  { value: 'retailer', label: 'Retailer / Trader' },
  { value: 'wholesaler', label: 'Wholesaler' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'ecommerce', label: 'E-commerce Business' },
  { value: 'other', label: 'Something else' },
];

const initialForm = { name: '', company: '', email: '', role: '' };

export default function RequestDemoModal({ open, onClose }) {
  const { addToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendFormSubmission({
        subject: `New demo request from ${form.name} (${form.company})`,
        name: form.name,
        company: form.company,
        email: form.email,
        role: ROLE_OPTIONS.find((r) => r.value === form.role)?.label || form.role,
      });
      setForm(initialForm);
      onClose();
      addToast({
        variant: 'success',
        title: 'Request received',
        description: 'Someone from our team will reach out within one business day.',
      });
    } catch (err) {
      addToast({ variant: 'danger', title: 'Could not send request', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request a demo"
      description="Tell us a little about your business and we'll walk you through Tijarat."
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Full name"
          placeholder="Your name"
          required
          value={form.name}
          onChange={update('name')}
        />
        <Input
          name="company"
          label="Company"
          placeholder="Business name"
          required
          value={form.company}
          onChange={update('company')}
        />
        <Input
          name="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          required
          value={form.email}
          onChange={update('email')}
        />
        <Select
          name="role"
          label="I am a..."
          placeholder="Select one"
          required
          options={ROLE_OPTIONS}
          value={form.role}
          onChange={update('role')}
        />
        <Button type="submit" fullWidth loading={loading}>
          Request demo
        </Button>
      </form>
    </Modal>
  );
}
