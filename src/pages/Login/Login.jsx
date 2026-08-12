import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { usePageTitle } from '../../hooks/usePageTitle';
import { loginWithIdentifier } from '../../services/api';
import { useAuth } from '../../hooks/useAuth.jsx';

const initialForm = { identifier: '', password: '' };

export default function Login() {
  usePageTitle('Sign in');
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithIdentifier(form);
      await refresh();
      navigate('/app');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-neutral-50 px-4 py-16 dark:bg-neutral-950 sm:py-24">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Sign in to Tijarat
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Distribution Management System
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          {error && (
            <Alert variant="danger" className="mb-4" onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              name="identifier"
              label="Email or Mobile Number"
              type="text"
              placeholder="you@tijarat.com or 03001234567"
              icon={User}
              required
              value={form.identifier}
              onChange={update('identifier')}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              required
              value={form.password}
              onChange={update('password')}
            />

            <div className="flex items-center justify-end">
              <a href="#" className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400">
                Forgot password?
              </a>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} Tijarat. All rights reserved.
        </p>
      </div>
    </div>
  );
}
