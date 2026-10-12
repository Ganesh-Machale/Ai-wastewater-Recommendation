import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="card-chai max-w-md w-full text-center space-y-5 p-8">
        <div className="space-y-1">
          <span className="font-mono text-3xl font-semibold text-neutral-400">404</span>
          <h1 className="font-montserrat text-xl font-semibold text-foreground">Page not found</h1>
          <p className="text-xs text-neutral-400 font-sans">
            The page or analysis route you are looking for does not exist or has moved.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="btn-asym inline-flex h-9 items-center justify-center gap-2 bg-neutral-900 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <ArrowLeft className="-ml-1 size-4" />
            <span>Return home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
