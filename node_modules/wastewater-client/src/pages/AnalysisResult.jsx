import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import PrototypeBadge from '../components/PrototypeBadge';
import { Activity, Image as ImageIcon, ArrowLeft, CheckCircle2, ShieldAlert, Calendar, User, Cpu } from 'lucide-react';

const AnalysisResult = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        // Try parameter endpoint first, fallback to image endpoint
        try {
          const res = await api.get(`/analysis/parameters/${id}`);
          if (res.data.success) {
            setData({ ...res.data.data, category: 'parameter' });
            setLoading(false);
            return;
          }
        } catch (err) {
          // Try image endpoint
          const resImg = await api.get(`/analysis/images/${id}`);
          if (resImg.data.success) {
            setData({ ...resImg.data.data, category: 'image' });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        setError('Analysis record not found or access restricted.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Record Not Found</h2>
        <p className="text-slate-600 text-sm">{error || 'The requested analysis ID could not be loaded.'}</p>
        <Link
          to="/history"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analysis History</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/history"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to History</span>
        </Link>
        <PrototypeBadge text="Prototype Record" />
      </div>

      {data.category === 'parameter' ? (
        /* Parameter Result Detail */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-teal-600 font-bold text-xs">
                <Activity className="w-4 h-4" />
                <span>Parameter Analysis Record</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">Water Quality Assessment</h1>
            </div>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">pH Level</span>
              <span className="text-2xl font-extrabold text-slate-900">{data.parameters?.pH}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">TDS</span>
              <span className="text-2xl font-extrabold text-slate-900">{data.parameters?.tds} mg/L</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Quality Assessment</span>
              <span className="text-xl font-bold text-teal-700 block mt-1">{data.qualityLevel} Quality</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">Treatment Recommendations</h3>
            <ul className="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {data.recommendations?.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Prototype recommendation only. Final treatment decisions must be based on laboratory testing and qualified environmental professionals.</span>
          </div>
        </div>
      ) : (
        /* Image Result Detail */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
                <ImageIcon className="w-4 h-4" />
                <span>Image Analysis Record</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">{data.originalName}</h1>
            </div>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-64 flex items-center justify-center">
              <img src={data.imagePath} alt={data.originalName} className="max-h-64 object-contain" />
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Original Name</span>
                <span className="font-bold text-slate-900">{data.originalName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block">File Size</span>
                <span className="font-bold text-slate-900">{(data.fileSize / 1024).toFixed(1)} KB</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block">AI Image Classification</span>
                <span className="font-bold text-sky-600">Coming Soon in Phase 2</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
