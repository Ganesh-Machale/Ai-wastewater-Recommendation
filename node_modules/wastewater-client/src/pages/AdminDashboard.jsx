import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Shield,
  Users,
  Activity,
  Image as ImageIcon,
  Search,
  Check,
  X,
  BarChart,
  UserCheck,
  UserX,
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        api.get('/admin/users', { params: { search: searchTerm } }),
        api.get('/admin/stats'),
      ]);

      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      setActionLoading(userId);
      const res = await api.patch(`/admin/users/${userId}/status`);
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isActive: res.data.user.isActive } : u))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAdminData();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded">
              Administrator role
            </span>
            <AnimatedBadge>System directory</AnimatedBadge>
          </div>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-semibold text-foreground">
            Administration dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            User directory authorization and systemwide evaluation counters
          </p>
        </div>
      </div>

      {/* Global Analytics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <Users className="size-3.5" /> Total operators
          </span>
          <span className="font-montserrat text-2xl font-semibold text-foreground block mt-1">
            {stats?.totalUsers || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <BarChart className="size-3.5" /> Total analyses
          </span>
          <span className="font-montserrat text-2xl font-semibold text-foreground block mt-1">
            {stats?.totalAnalyses || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <Activity className="size-3.5" /> Parameters
          </span>
          <span className="font-montserrat text-2xl font-semibold text-foreground block mt-1">
            {stats?.totalParameterAnalyses || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <ImageIcon className="size-3.5" /> Images
          </span>
          <span className="font-montserrat text-2xl font-semibold text-foreground block mt-1">
            {stats?.totalImageAnalyses || 0}
          </span>
        </div>
      </div>

      {/* User Management Panel */}
      <div className="card-chai p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--card-edge)] pb-4">
          <div>
            <h2 className="font-montserrat text-base font-semibold text-foreground">
              User directory
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Control account authorization status and review permissions
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-xs w-full">
            <div className="relative w-full">
              <Search className="size-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[var(--card-edge)] bg-card text-xs text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-md bg-primary text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Filter
            </button>
          </form>
        </div>

        {/* User Table */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[var(--card-edge)] text-neutral-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Registered</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-edge)]/50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-card/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-montserrat font-medium text-foreground">{u.name}</div>
                      <div className="text-[11px] font-mono text-neutral-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[11px] ${
                          u.role === 'ADMIN'
                            ? 'border border-emerald-500/30 text-emerald-400'
                            : 'border border-[var(--card-edge)] text-neutral-400'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                          <Check className="size-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono">
                          <X className="size-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-neutral-400 font-mono">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u._id)}
                        disabled={actionLoading === u._id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-montserrat font-medium border transition-colors ${
                          u.isActive
                            ? 'border-red-500/30 text-red-400 hover:bg-red-950/20'
                            : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/20'
                        }`}
                      >
                        {u.isActive ? (
                          <>
                            <UserX className="size-3" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="size-3" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
