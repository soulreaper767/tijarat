import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Login() {
  usePageTitle('Sign in');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/app'), 600);
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="you@tijarat.com"
              icon={Mail}
              required
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              required
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
