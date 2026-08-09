import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PrototypeBadge from '../components/PrototypeBadge';
import { History as HistoryIcon, Activity, Image as ImageIcon, Search, Filter, ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';

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

  const getQualityColor = (quality) => {
    if (quality === 'Good') return 'bg-emerald-100 text-emerald-800';
    if (quality === 'Moderate') return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
            <HistoryIcon className="w-5 h-5" />
            <span>Analysis Archive</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Analysis History
          </h1>
        </div>
        <PrototypeBadge text="Saved Database Records" />
      </div>

      {/* Tabs and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start">
            <button
              onClick={() => {
                setActiveTab('all');
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => {
                setActiveTab('parameter');
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'parameter' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              Parameter Analysis
            </button>
            <button
              onClick={() => {
                setActiveTab('image');
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'image' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Image Analysis
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search quality, pH, filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800"
            >
              Filter
            </button>
          </form>
        </div>

        {/* History List */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span className="text-xs text-slate-500 mt-2 block">Loading analysis history...</span>
          </div>
        ) : historyData.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <HistoryIcon className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-slate-700 font-bold">No Analysis Records Found</h3>
            <p className="text-xs text-slate-500">Perform a parameter analysis or upload an image to generate records.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-slate-100 text-slate-500 font-bold text-xs uppercase rounded-lg">
              <span className="col-span-2">Date</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-4">Details / Parameters</span>
              <span className="col-span-2">Status / Quality</span>
              <span className="col-span-2 text-right">Action</span>
            </div>

            {historyData.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 transition-colors items-center text-sm"
              >
                {/* Date */}
                <div className="md:col-span-2 flex items-center gap-2 text-slate-500 text-xs font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Category Type */}
                <div className="md:col-span-2">
                  {item.category === 'parameter' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                      <Activity className="w-3.5 h-3.5" /> Parameter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
                      <ImageIcon className="w-3.5 h-3.5" /> Image
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="md:col-span-4">
                  {item.category === 'parameter' ? (
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-900">
                        pH: {item.parameters?.pH} • TDS: {item.parameters?.tds} mg/L
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        Rec: {item.recommendations?.[0] || 'Standard guidelines'}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imagePath}
                        alt="thumbnail"
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-semibold text-slate-900 truncate">{item.originalName}</div>
                        <div className="text-xs text-slate-400">{(item.fileSize / 1024).toFixed(1)} KB</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quality / Status */}
                <div className="md:col-span-2">
                  {item.category === 'parameter' ? (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getQualityColor(item.qualityLevel)}`}>
                      {item.qualityLevel} Quality
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      Prototype Status
                    </span>
                  )}
                </div>

                {/* Action Link */}
                <div className="md:col-span-2 text-right">
                  <Link
                    to={`/analysis/result/${item._id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-800 hover:bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
            <span className="text-slate-500">
              Showing page {page} of {totalPages} ({totalCount} total records)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
