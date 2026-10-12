import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
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
} from 'recharts';
import {
  Activity,
  Image as ImageIcon,
  Check,
  ArrowUpRight,
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
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-neutral-400 font-sans">Loading metrics...</span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const recentAnalyses = data?.recentAnalyses || [];

  // ChaiUI restrained palette for charts
  const pieColors = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome Banner */}
      <div className="card-chai p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">Authenticated workspace</span>
            <AnimatedBadge>Active session</AnimatedBadge>
          </div>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-semibold text-foreground">
            Welcome back, {user?.name || 'Operator'}
          </h1>
          <p className="text-sm text-neutral-400 font-sans">
            Real-time environmental metrics aggregated from your <span className="highlight">persisted database records</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Solid asymmetric button - primary action */}
          <Link
            to="/analysis/parameters"
            className="btn-asym inline-flex h-9 items-center gap-2 bg-neutral-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            New analysis <ArrowUpRight className="-ml-1 size-4" />
          </Link>
          <Link
            to="/analysis/image"
            className="btn-asym-mirror inline-flex h-9 items-center gap-2 border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-black/90"
          >
            <ImageIcon className="size-4" />
            <span>Upload image</span>
          </Link>
        </div>
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 block">Total</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.totalAnalyses || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 block">Parameters</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.parameterAnalyses || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-neutral-400 block">Images</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.imageAnalyses || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-emerald-400 block">Good</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.goodQualityCount || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-amber-400 block">Moderate</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.moderateQualityCount || 0}
          </span>
        </div>

        <div className="card-chai p-4 space-y-1">
          <span className="text-xs font-mono text-red-400 block">Poor</span>
          <span className="font-montserrat text-2xl font-semibold text-foreground">
            {stats.poorQualityCount || 0}
          </span>
        </div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Distribution Pie Chart */}
        <div className="card-chai p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
            <h3 className="font-montserrat text-sm font-semibold text-foreground">
              Water quality distribution
            </h3>
            <span className="text-xs font-mono text-neutral-400">Parameter tests</span>
          </div>

          <div className="h-64 w-full">
            {charts.qualityDistribution && charts.qualityDistribution.some((item) => item.count > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.qualityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {charts.qualityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.205 0 0)',
                      border: '1px solid var(--card-edge)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-neutral-400 font-sans">
                No parameter test records found yet.
              </div>
            )}
          </div>
        </div>

        {/* Parameter Trend Line Chart */}
        <div className="card-chai p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
            <h3 className="font-montserrat text-sm font-semibold text-foreground">
              pH and TDS parameter trends
            </h3>
            <span className="text-xs font-mono text-neutral-400">Last 10 tests</span>
          </div>

          <div className="h-64 w-full">
            {charts.parameterTrends && charts.parameterTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.parameterTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#10b981" fontSize={11} domain={[0, 14]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.205 0 0)',
                      border: '1px solid var(--card-edge)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="pH"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    name="pH Level"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tds"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                    name="TDS (mg/L)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-neutral-400 font-sans">
                Submit parameter tests to render trend charts.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Analyses Log */}
      <div className="card-chai p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
          <h3 className="font-montserrat text-sm font-semibold text-foreground flex items-center gap-2">
            <History className="size-4 text-neutral-400" />
            <span>Recent analysis submissions</span>
          </h3>
          <Link
            to="/history"
            className="text-xs font-montserrat text-neutral-400 hover:text-foreground transition-colors"
          >
            View all history &rarr;
          </Link>
        </div>

        {recentAnalyses.length === 0 ? (
          <p className="text-xs text-neutral-400 py-6 text-center font-sans">
            No recent records available.
          </p>
        ) : (
          <div className="space-y-2">
            {recentAnalyses.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--card-edge)] bg-black/20 text-xs font-sans"
              >
                <div className="flex items-center gap-3">
                  {item.type === 'parameter' ? (
                    <Activity className="size-4 text-neutral-400 shrink-0" />
                  ) : (
                    <ImageIcon className="size-4 text-neutral-400 shrink-0" />
                  )}
                  <div>
                    <div className="font-montserrat font-medium text-foreground">{item.title}</div>
                    <div className="text-[11px] font-mono text-neutral-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <span className="border border-[var(--card-edge)] text-neutral-300 px-2 py-0.5 rounded font-mono text-[11px]">
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
