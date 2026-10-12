import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Image as ImageIcon,
  UploadCloud,
  X,
  RefreshCw,
  AlertTriangle,
  Cpu,
  FileText,
  History,
  ArrowUpRight,
  Check
} from 'lucide-react';

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
      setError(
        `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(
          2
        )} MB). Please select a smaller image.`
      );
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
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
            <ImageIcon className="size-4 text-neutral-300" />
            <span>Method 02</span>
          </div>
          <AnimatedBadge>Vision neural network next</AnimatedBadge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Image-based wastewater analysis
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans">
          Upload an effluent sample photo for visual inspection and <span className="highlight">clarity observation records</span>.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-sm flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Upload or Result Area */}
      {!uploadResult ? (
        <div className="card-chai p-6 sm:p-8 space-y-6">
          {!selectedFile ? (
            /* Drag and drop box */
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[var(--card-edge)] hover:border-neutral-400 bg-black/10 rounded-xl p-10 text-center cursor-pointer transition-colors space-y-4 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
              />
              <div className="size-12 rounded-full border border-[var(--card-edge)] bg-card text-neutral-300 flex items-center justify-center mx-auto transition-transform group-hover:scale-105">
                <UploadCloud className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="font-montserrat text-sm font-semibold text-foreground">
                  Select effluent image or drag and drop
                </p>
                <p className="text-neutral-400 text-xs font-sans">
                  JPG, PNG or WEBP formats up to 5 MB
                </p>
              </div>
            </div>
          ) : (
            /* Image Preview Area */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-neutral-400" />
                  <span className="font-montserrat font-medium text-xs text-foreground">
                    Selected sample preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <X className="size-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Image Element */}
                <div className="relative rounded-lg overflow-hidden border border-[var(--card-edge)] bg-black/40 max-h-64 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Wastewater preview"
                    className="max-h-64 w-full object-contain"
                  />
                </div>

                {/* File Details */}
                <div className="space-y-3 p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 text-xs font-sans">
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Filename</span>
                    <span className="font-mono text-foreground break-all">{selectedFile.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">File size</span>
                    <span className="font-mono text-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">MIME type</span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-300 uppercase">{selectedFile.type}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-foreground transition-colors"
                    >
                      Choose another file
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
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[var(--card-edge)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-400 font-sans">
              Image storage: encrypted multipart upload to storage directory
            </span>

            {/* Solid asymmetric button */}
            <button
              type="button"
              onClick={handleUploadAndAnalyze}
              disabled={!selectedFile || loading}
              className="btn-asym inline-flex h-9 items-center gap-2 bg-neutral-900 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="size-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span>Upload and analyze</span>
                  <ArrowUpRight className="-ml-1 size-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Image Analysis Result Screen */
        <div className="card-chai p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-sans flex items-center gap-3">
            <Check className="size-4 shrink-0" />
            <div>
              <span className="font-semibold block text-emerald-300">Image uploaded successfully</span>
              <span className="text-neutral-400 font-mono">Reference ID: {uploadResult.imageId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="rounded-lg overflow-hidden border border-[var(--card-edge)] bg-black/40 max-h-64 flex items-center justify-center">
              <img
                src={uploadResult.imageUrl}
                alt="Uploaded wastewater"
                className="max-h-64 w-full object-contain"
              />
            </div>

            <div className="space-y-3 p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-2">
                <span className="text-neutral-500 dark:text-neutral-400">Analysis status</span>
                <span className="border border-amber-500/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-mono">
                  Prototype mode
                </span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Original filename</span>
                <span className="font-mono text-foreground">{uploadResult.originalName}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Machine learning classifier</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-300">Phase 2 integration</span>
              </div>
            </div>
          </div>

          {/* Expected Future ML Output Card */}
          <div className="p-5 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
              <div className="flex items-center gap-2 text-foreground font-montserrat text-sm font-semibold">
                <Cpu className="size-4 text-neutral-500 dark:text-neutral-400" />
                <span>Sample preview (illustrative format)</span>
              </div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Phase 2 schema</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Future vision output once convolutional networks (CNN / MobileNet) are attached.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded border border-[var(--card-edge)] bg-card">
                <span className="text-neutral-500 dark:text-neutral-400 block">Visual classification</span>
                <span className="font-montserrat font-semibold text-foreground text-sm mt-0.5 block">
                  Turbid effluent
                </span>
              </div>
              <div className="p-3 rounded border border-[var(--card-edge)] bg-card">
                <span className="text-neutral-500 dark:text-neutral-400 block">Confidence indicator</span>
                <span className="font-mono text-emerald-400 text-sm mt-0.5 block">
                  94.8% simulated
                </span>
              </div>
              <div className="p-3 rounded border border-[var(--card-edge)] bg-card">
                <span className="text-neutral-500 dark:text-neutral-400 block">Target model</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-300 text-sm mt-0.5 block">
                  ResNet50 / Transfer
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[var(--card-edge)] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn-asym-mirror inline-flex h-9 items-center gap-2 border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-black/90"
            >
              <RefreshCw className="size-3.5" />
              <span>Upload another image</span>
            </button>

            <Link
              to="/history"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <History className="size-4" />
              <span>View history</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
