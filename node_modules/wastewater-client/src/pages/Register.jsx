import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-brand text-3xl font-semibold tracking-tight text-foreground">
              WQAI
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF7D0C] mb-2" />
          </div>
          <h1 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground">
            Create an account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Register to save wastewater quality test records and access dashboard
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-xs sm:text-sm flex items-center gap-2 font-sans">
            <AlertTriangle className="size-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="card-chai p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Confirm password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-3.5 py-2.5 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-asym inline-flex h-9 items-center justify-center gap-2 bg-neutral-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create account'}
                <ArrowUpRight className="-ml-1 size-4" />
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 font-sans">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground hover:text-brand font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
