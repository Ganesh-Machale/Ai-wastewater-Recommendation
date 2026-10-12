import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';
import {
  Activity,
  Image as ImageIcon,
  LayoutDashboard,
  History,
  User,
  Shield,
  LogOut,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 0);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[backdrop-filter,background,border-color] duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-[var(--card-edge)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 py-4 sm:px-12">
        {/* Wordmark Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group outline-none"
          aria-label="WQAI home"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-brand text-2xl font-semibold tracking-tight text-foreground">
              WQAI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7D0C] ml-1 mb-2 motion-safe:animate-chai-bounce" />
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-muted-foreground border-l border-[var(--card-edge)] pl-2 ml-1">
            v0.1
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-brand ${
              isActive('/') ? 'text-foreground font-semibold' : 'text-neutral-400'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-brand ${
              isActive('/about') ? 'text-foreground font-semibold' : 'text-neutral-400'
            }`}
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className={`text-sm font-medium transition-colors hover:text-brand ${
              isActive('/how-it-works') ? 'text-foreground font-semibold' : 'text-neutral-400'
            }`}
          >
            How it works
          </Link>
          <Link
            to="/analysis/parameters"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand ${
              isActive('/analysis/parameters') ? 'text-foreground font-semibold' : 'text-neutral-400'
            }`}
          >
            <Activity className="size-4" />
            Parameters
          </Link>
          <Link
            to="/analysis/image"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand ${
              isActive('/analysis/image') ? 'text-foreground font-semibold' : 'text-neutral-400'
            }`}
          >
            <ImageIcon className="size-4" />
            Image
          </Link>

          {isAuthenticated && (
            <>
              <span className="h-4 w-px bg-border" />
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand ${
                  isActive('/dashboard') ? 'text-foreground font-semibold' : 'text-neutral-400'
                }`}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <Link
                to="/history"
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand ${
                  isActive('/history') ? 'text-foreground font-semibold' : 'text-neutral-400'
                }`}
              >
                <History className="size-4" />
                History
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors ${
                    isActive('/admin') ? 'font-semibold' : ''
                  }`}
                >
                  <Shield className="size-4" />
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right Section: ThemeSwitcher + User actions */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--card-edge)] bg-card text-xs font-montserrat font-medium text-foreground hover:border-[var(--card-edge-hover)] transition-colors"
              >
                <User className="size-3.5 text-neutral-400" />
                <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                {isAdmin && (
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-1 py-0.2 rounded">
                    ADMIN
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                title="Sign out"
                className="inline-flex size-8 items-center justify-center rounded-md text-neutral-400 hover:text-foreground transition-colors"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-neutral-400 hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-asym inline-flex h-8 items-center gap-1.5 bg-neutral-900 px-3.5 text-xs font-montserrat font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Get started <ArrowUpRight className="-ml-1 size-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex size-9 items-center justify-center rounded-md text-foreground hover:text-brand"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--card-edge)] bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-base font-medium text-foreground hover:text-brand"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-base font-medium text-neutral-400 hover:text-brand"
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-base font-medium text-neutral-400 hover:text-brand"
          >
            How it works
          </Link>
          <Link
            to="/analysis/parameters"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-base font-medium text-neutral-400 hover:text-brand"
          >
            Parameter analysis
          </Link>
          <Link
            to="/analysis/image"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-base font-medium text-neutral-400 hover:text-brand"
          >
            Image analysis
          </Link>

          {isAuthenticated ? (
            <>
              <div className="pt-2 border-t border-[var(--card-edge)] space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-base text-neutral-400 hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-base text-neutral-400 hover:text-foreground"
                >
                  History
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-base text-neutral-400 hover:text-foreground"
                >
                  Account ({user?.name || 'User'})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-base text-emerald-400 hover:text-emerald-300"
                  >
                    Admin dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full text-left py-1 text-base text-red-400 hover:text-red-300"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-[var(--card-edge)] flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-base text-neutral-400 hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-asym inline-flex h-9 items-center justify-center gap-2 bg-neutral-900 px-4 text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                Get started <ArrowUpRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
