import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
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
            Sign in to your account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Enter credentials to access analysis records and dashboard
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
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@example.com"
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
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-asym inline-flex h-9 items-center justify-center gap-2 bg-neutral-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign in'}
                <ArrowUpRight className="-ml-1 size-4" />
              </button>
            </div>
          </form>

          {/* Seed demo account quick buttons */}
          <div className="pt-4 border-t border-[var(--card-edge)] space-y-2">
            <span className="text-[11px] font-mono text-neutral-400 block text-center">
              Demonstration accounts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <button
                type="button"
                onClick={() => handleQuickFill('user@example.com', 'user123')}
                className="py-1.5 px-2 rounded border border-[var(--card-edge)] bg-black/20 text-neutral-300 hover:text-foreground hover:border-[var(--card-edge-hover)] transition-colors text-left"
              >
                <div className="font-medium">User</div>
                <div className="text-[10px] text-neutral-500">user@example.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@example.com', 'admin123')}
                className="py-1.5 px-2 rounded border border-[var(--card-edge)] bg-black/20 text-neutral-300 hover:text-foreground hover:border-[var(--card-edge-hover)] transition-colors text-left"
              >
                <div className="font-medium text-emerald-400">Admin</div>
                <div className="text-[10px] text-neutral-500">admin@example.com</div>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 font-sans">
          Do not have an account?{' '}
          <Link to="/register" className="text-foreground hover:text-brand font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
