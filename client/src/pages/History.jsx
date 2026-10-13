import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  History as HistoryIcon,
  Activity,
  Image as ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar
} from 'lucide-react';

const History = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'parameter', 'image'
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [historyData, setHistoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/analysis/history', {
        params: {
          type: activeTab,
          search: searchTerm,
          page,
          limit,
        },
      });

      if (res.data.success) {
        setHistoryData(res.data.data);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [activeTab, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchHistory();
  };

  const getQualityStyle = (quality) => {
    if (quality === 'Good') return 'text-emerald-400 border border-emerald-500/30';
    if (quality === 'Moderate') return 'text-amber-400 border border-amber-500/30';
    return 'text-red-400 border border-red-500/30';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Listing Head */}
      <div className="space-y-3">
        <div className="flex justify-center">
          <AnimatedBadge>Database archive</AnimatedBadge>
        </div>
        <h1 className="text-2xl font-medium sm:text-center sm:text-3xl text-foreground">
          Analysis history
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-neutral-600 sm:text-center dark:text-neutral-400 font-sans">
          Review historical effluent samples and <span className="highlight">persisted treatment recommendations</span>.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pt-2">
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Showing <span className="font-mono font-medium text-foreground">{totalCount}</span> total records
          </p>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="text-xs sm:text-sm text-neutral-400 hidden sm:inline">
            Chemical and image tests
          </span>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-md border border-[var(--card-edge)] bg-card p-0.5 text-xs font-montserrat font-medium">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-orange-100 text-orange-950 dark:bg-orange-900/40 dark:text-orange-100'
                  : 'text-neutral-400 hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('parameter');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'parameter'
                  ? 'bg-orange-100 text-orange-950 dark:bg-orange-900/40 dark:text-orange-100'
                  : 'text-neutral-400 hover:text-foreground'
              }`}
            >
              Parameters
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('image');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'image'
                  ? 'bg-orange-100 text-orange-950 dark:bg-orange-900/40 dark:text-orange-100'
                  : 'text-neutral-400 hover:text-foreground'
              }`}
            >
              Images
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="size-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-md border border-[var(--card-edge)] bg-card text-xs text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
          </form>
        </div>
      </div>

      {/* History Records Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center card-chai">
            <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <span className="text-xs text-neutral-400 mt-2 block font-sans">
              Loading analysis history...
            </span>
          </div>
        ) : historyData.length === 0 ? (
          <div className="py-16 text-center space-y-2 card-chai">
            <HistoryIcon className="size-8 text-neutral-500 mx-auto" />
            <h3 className="font-montserrat text-sm font-semibold text-foreground">
              No analysis records found
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Perform a parameter analysis or upload an effluent image to generate entries.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Header on Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 border-b border-[var(--card-edge)]">
              <span className="col-span-2">Date</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-4">Parameters / file</span>
              <span className="col-span-2">Status / quality</span>
              <span className="col-span-2 text-right">Action</span>
            </div>

            {historyData.map((item) => (
              <div
                key={item._id}
                className="card-chai p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs font-sans"
              >
                {/* Date */}
                <div className="md:col-span-2 flex items-center gap-2 text-neutral-400 font-mono">
                  <Calendar className="size-3.5 shrink-0" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Category Type */}
                <div className="md:col-span-2">
                  {item.category === 'parameter' ? (
                    <span className="inline-flex items-center gap-1 font-mono text-neutral-300">
                      <Activity className="size-3.5 text-neutral-400" /> Parameter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-neutral-300">
                      <ImageIcon className="size-3.5 text-neutral-400" /> Image
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="md:col-span-4">
                  {item.category === 'parameter' ? (
                    <div className="space-y-0.5">
                      <div className="font-montserrat font-medium text-foreground">
                        pH: {item.parameters?.pH} • TDS: {item.parameters?.tds} mg/L
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">
                        {item.recommendations?.[0] || 'Standard guidelines'}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imagePath}
                        alt="thumbnail"
                        className="size-8 rounded object-cover border border-[var(--card-edge)] bg-black/40 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-montserrat font-medium text-foreground truncate">
                          {item.originalName}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          {(item.fileSize / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quality / Status */}
                <div className="md:col-span-2">
                  {item.category === 'parameter' ? (
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-montserrat font-medium ${getQualityStyle(
                        item.qualityLevel
                      )}`}
                    >
                      {item.qualityLevel}
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono border border-[var(--card-edge)] text-neutral-400">
                      Image Record
                    </span>
                  )}
                </div>

                {/* Action Link */}
                <div className="md:col-span-2 text-right">
                  <Link
                    to={`/analysis/result/${item._id}`}
                    className="inline-flex h-7 items-center gap-1 rounded bg-primary px-3 text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Eye className="size-3" />
                    <span>View</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[var(--card-edge)] pt-4 text-xs font-sans text-neutral-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="size-8 inline-flex items-center justify-center rounded border border-[var(--card-edge)] hover:border-neutral-400 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="size-8 inline-flex items-center justify-center rounded border border-[var(--card-edge)] hover:border-neutral-400 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
