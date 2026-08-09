import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PrototypeBadge from '../components/PrototypeBadge';
import { useAuth } from '../context/AuthContext';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {
  LayoutDashboard,
  Activity,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle,
  TrendingUp,
  History,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-slate-500 font-medium">Fetching real MongoDB statistics...</span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const recentAnalyses = data?.recentAnalyses || [];

  const pieColors = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
            <LayoutDashboard className="w-5 h-5" />
            <span>Authenticated Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back, {user?.name || 'Operator'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Real-time analytical metrics aggregated directly from your saved database records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/analysis/parameters"
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Parameter Test</span>
          </Link>
          <Link
            to="/analysis/image"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload Image</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Total Analyses</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalAnalyses || 0}</span>
        </div>

        {/* Parameter */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-teal-600 block">Parameter Tests</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.parameterAnalyses || 0}</span>
        </div>

        {/* Image */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-sky-600 block">Image Uploads</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.imageAnalyses || 0}</span>
        </div>

        {/* Good */}
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-emerald-700 block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Good Quality
          </span>
          <span className="text-2xl font-extrabold text-emerald-900">{stats.goodQualityCount || 0}</span>
        </div>

        {/* Moderate */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-amber-700 block flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Moderate
          </span>
          <span className="text-2xl font-extrabold text-amber-900">{stats.moderateQualityCount || 0}</span>
        </div>

        {/* Poor */}
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-red-700 block flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Poor Quality
          </span>
          <span className="text-2xl font-extrabold text-red-900">{stats.poorQualityCount || 0}</span>
        </div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quality Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Water Quality Distribution</h3>
            <span className="text-xs text-slate-400 font-medium">Parameter Breakdown</span>
          </div>

          <div className="h-64 w-full">
            {charts.qualityDistribution && charts.qualityDistribution.some((item) => item.count > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.qualityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {charts.qualityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No parameter test records found yet to generate distribution chart.
              </div>
            )}
          </div>
        </div>

        {/* Parameter Trend Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">pH & TDS Parameter Trends</h3>
            <span className="text-xs text-slate-400 font-medium">Recent 10 Submissions</span>
          </div>

          <div className="h-64 w-full">
            {charts.parameterTrends && charts.parameterTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.parameterTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#0d9488" fontSize={11} domain={[0, 14]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#0284c7" fontSize={11} />
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                  <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#0d9488" strokeWidth={2} name="pH Level" />
                  <Line yAxisId="right" type="monotone" dataKey="tds" stroke="#0284c7" strokeWidth={2} name="TDS (mg/L)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Submit parameter tests to render trend charts.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Analyses Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <History className="w-5 h-5 text-teal-600" />
            <span>Recent Analysis Submissions</span>
          </h3>
          <Link to="/history" className="text-xs font-bold text-teal-600 hover:text-teal-800">
            View All History →
          </Link>
        </div>

        {recentAnalyses.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No recent records available.</p>
        ) : (
          <div className="space-y-3">
            {recentAnalyses.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm"
              >
                <div className="flex items-center gap-3">
                  {item.type === 'parameter' ? (
                    <Activity className="w-5 h-5 text-teal-600 shrink-0" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-sky-600 shrink-0" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
