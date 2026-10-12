import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import { User, Mail, Calendar, Check, AlertTriangle } from 'lucide-react';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [nameSuccess, setNameSuccess] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [nameLoading, setNameLoading] = useState(false);

  const [passSuccess, setPassSuccess] = useState(null);
  const [passError, setPassError] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setNameSuccess(null);
    setNameError(null);

    if (!name.trim()) {
      setNameError('Name cannot be empty.');
      return;
    }

    setNameLoading(true);
    try {
      const res = await api.put('/auth/profile', { name });
      if (res.data.success) {
        updateUserProfile(res.data.user);
        setNameSuccess('Name updated successfully.');
      }
    } catch (err) {
      setNameError(err.response?.data?.message || 'Failed to update name.');
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassSuccess(null);
    setPassError(null);

    if (!currentPassword || !newPassword) {
      setPassError('Please provide both current and new password.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }

    setPassLoading(true);
    try {
      const res = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });

      if (res.data.success) {
        setPassSuccess('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setPassError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AnimatedBadge>Account management</AnimatedBadge>
        </div>
        <h1 className="font-montserrat text-2xl sm:text-3xl font-semibold text-foreground">
          User profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans">
          Manage your operator credentials and account security
        </p>
      </div>

      {/* Account Info Card */}
      <div className="card-chai p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full border border-[var(--card-edge)] bg-card text-foreground flex items-center justify-center font-montserrat font-semibold text-base">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="font-montserrat text-lg font-semibold text-foreground">{user?.name}</h2>
              <span className="text-xs font-mono text-neutral-400">{user?.email}</span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded text-xs font-mono ${
              user?.role === 'ADMIN'
                ? 'border border-emerald-500/30 text-emerald-400'
                : 'border border-[var(--card-edge)] text-neutral-400'
            }`}
          >
            Role: {user?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-neutral-400">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-neutral-500" />
            <span>
              Email: <strong className="text-foreground font-mono font-normal">{user?.email}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-neutral-500" />
            <span>
              Member since:{' '}
              <strong className="text-foreground font-mono font-normal">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Profile Name */}
        <div className="card-chai p-6 space-y-4">
          <h3 className="font-montserrat text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="size-4 text-neutral-400" />
            <span>Update account name</span>
          </h3>

          {nameSuccess && (
            <div className="p-3 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs flex items-center gap-2 font-sans">
              <Check className="size-3.5" />
              <span>{nameSuccess}</span>
            </div>
          )}

          {nameError && (
            <div className="p-3 rounded border border-red-500/30 bg-red-950/20 text-red-400 text-xs flex items-center gap-2 font-sans">
              <AlertTriangle className="size-3.5" />
              <span>{nameError}</span>
            </div>
          )}

          <form onSubmit={handleUpdateName} className="space-y-4 font-sans">
            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground focus:outline-none focus:border-neutral-400 text-xs transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={nameLoading}
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {nameLoading ? 'Saving...' : 'Update name'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="card-chai p-6 space-y-4">
          <h3 className="font-montserrat text-sm font-semibold text-foreground flex items-center gap-2">
            <span>Change password</span>
          </h3>

          {passSuccess && (
            <div className="p-3 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs flex items-center gap-2 font-sans">
              <Check className="size-3.5" />
              <span>{passSuccess}</span>
            </div>
          )}

          {passError && (
            <div className="p-3 rounded border border-red-500/30 bg-red-950/20 text-red-400 text-xs flex items-center gap-2 font-sans">
              <AlertTriangle className="size-3.5" />
              <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-3 font-sans">
            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                Current password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground focus:outline-none focus:border-neutral-400 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-medium text-foreground">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground focus:outline-none focus:border-neutral-400 text-xs transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={passLoading}
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {passLoading ? 'Updating...' : 'Change password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
