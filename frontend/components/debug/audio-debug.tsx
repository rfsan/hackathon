"use client";

import { useState } from 'react';
import { getFileUrl } from '@/lib/file-utils';

interface AudioDebugProps {
  reportId: string;
  fileName: string;
  extension: string;
}

export function AudioDebug({ reportId, fileName, extension }: AudioDebugProps) {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testAudioUrl = () => {
    setIsLoading(true);
    const url = getFileUrl(reportId, fileName);
    setDebugInfo(`Testing URL: ${url}`);
    
    // Test if the URL is accessible
    fetch(url, { method: 'HEAD' })
      .then(response => {
        setDebugInfo(prev => `${prev}\n\nResponse Status: ${response.status}`);
        setDebugInfo(prev => `${prev}\nContent-Type: ${response.headers.get('content-type') || 'Not set'}`);
        setDebugInfo(prev => `${prev}\nCORS Headers: ${response.headers.get('access-control-allow-origin') || 'Not set'}`);
      })
      .catch(error => {
        setDebugInfo(prev => `${prev}\n\nError: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="text-sm font-medium text-yellow-800 mb-2">Debug Info</div>
      <div className="space-y-2">
        <button 
          onClick={testAudioUrl}
          disabled={isLoading}
          className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-xs hover:bg-yellow-300 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test URL'}
        </button>
        {debugInfo && (
          <pre className="text-xs text-yellow-700 whitespace-pre-wrap bg-yellow-100 p-2 rounded">
            {debugInfo}
          </pre>
        )}
      </div>
    </div>
  );
}