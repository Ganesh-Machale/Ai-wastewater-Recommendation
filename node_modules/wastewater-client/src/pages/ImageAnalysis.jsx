import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PrototypeBadge from '../components/PrototypeBadge';
import { Image as ImageIcon, UploadCloud, X, RefreshCw, CheckCircle2, AlertTriangle, ShieldAlert, Cpu, FileText, History, ArrowRight } from 'lucide-react';

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const fileInputRef = useRef(null);

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB

  const handleFileValidationAndSet = (file) => {
    setError(null);
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setError(`Invalid file format (.${ext}). Only JPG, JPEG, PNG, and WEBP images are allowed.`);
      return;
    }

    if (file.size > maxSizeBytes) {
      setError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select a smaller image.`);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidationAndSet(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidationAndSet(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await api.post('/analysis/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setUploadResult(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    handleRemoveImage();
    setUploadResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
            <ImageIcon className="w-5 h-5" />
            <span>Method 2</span>
          </div>
          <PrototypeBadge text="AI Model Status: Coming Soon" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Image-Based Wastewater Analysis
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Upload a wastewater image for visual analysis. The image classification model will be integrated in the next development phase.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Upload or Result Area */}
      {!uploadResult ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {!selectedFile ? (
            /* Drag and drop box */
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50 hover:bg-sky-50/50 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-4 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-800 font-semibold text-base">
                  Click to select image or drag & drop here
                </p>
                <p className="text-slate-500 text-xs">
                  Supports JPG, JPEG, PNG, WEBP (Maximum file size: 5 MB)
                </p>
              </div>
            </div>
          ) : (
            /* Image Preview Area */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold text-sm text-slate-800">Selected Image Preview</span>
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
                >
                  <X className="w-4 h-4" />
                  <span>Remove Image</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Image Element */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-64 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Wastewater preview"
                    className="max-h-64 w-full object-contain"
                  />
                </div>

                {/* File Details */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">File Name</span>
                    <span className="text-sm font-bold text-slate-800 break-all">{selectedFile.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">File Size</span>
                    <span className="text-sm font-bold text-slate-800">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">MIME Type</span>
                    <span className="text-xs font-medium text-slate-600 uppercase">{selectedFile.type}</span>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Change / Replace Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>Only uploads when you click "Analyze Image"</span>
            </div>

            <button
              onClick={handleUploadAndAnalyze}
              disabled={!selectedFile || loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Uploading Image...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Image Analysis Result Screen */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Success Message Banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Image Uploaded Successfully</span>
                <span className="text-xs text-emerald-700">Stored safely on server as: {uploadResult.imageId}</span>
              </div>
            </div>

            {/* Upload Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-64 flex items-center justify-center">
                <img
                  src={uploadResult.imageUrl}
                  alt="Uploaded wastewater"
                  className="max-h-64 w-full object-contain"
                />
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">Analysis Status</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Prototype Mode
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Original Filename</span>
                  <span className="text-sm font-bold text-slate-800">{uploadResult.originalName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">AI Classification Model</span>
                  <span className="text-sm font-bold text-sky-600">Coming Soon (Phase 2)</span>
                </div>
              </div>
            </div>

            {/* Expected Future ML Output Preview Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Cpu className="w-5 h-5" />
                  <span>Sample Output — Not an Actual AI Prediction</span>
                </div>
                <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Preview Card</span>
              </div>

              <p className="text-xs text-slate-400">
                Below is an illustration of the computer vision output format once MobileNetV2 / CNN models are connected in Phase 2.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Visual Classification</span>
                  <span className="font-bold text-amber-300 text-sm">Turbid / High Suspended Solids</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Confidence Score</span>
                  <span className="font-bold text-emerald-300 text-sm">94.8% (Sample)</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Expected Model</span>
                  <span className="font-bold text-sky-300 text-sm">CNN / Transfer Learning</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Upload Another Image</span>
              </button>

              <Link
                to="/history"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5"
              >
                <History className="w-4 h-4" />
                <span>View History</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
