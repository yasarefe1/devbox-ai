import { useState } from 'react';
import { Key, Copy, Check } from 'lucide-react';

export default function JwtTool() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const decodeJwt = (token: string) => {
    setInput(token);
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      setError('');
      return;
    }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad) {
          if (pad === 1) throw new Error('Invalid base64url string');
          base64 += new Array(5 - pad).join('=');
        }
        return decodeURIComponent(escape(atob(base64)));
      };

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError('');
    } catch (err: any) {
      setError('Invalid JWT token');
      setHeader('');
      setPayload('');
    }
  };

  const copyToClipboard = (text: string, type: 'header' | 'payload') => {
    navigator.clipboard.writeText(text);
    if (type === 'header') {
      setCopiedHeader(true);
      setTimeout(() => setCopiedHeader(false), 2000);
    } else {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">JWT Decoder</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Encoded Token</label>
          <textarea
            value={input}
            onChange={(e) => decodeJwt(e.target.value)}
            className={`flex-1 w-full p-4 bg-zinc-900 border rounded-lg font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none break-all ${error ? 'border-red-500/50 text-red-400' : 'border-zinc-800 text-zinc-300'}`}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
        <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-auto">
          {/* Header */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">Header <span className="text-xs text-zinc-500">(Algorithm & Type)</span></label>
              {header && (
                <button onClick={() => copyToClipboard(header, 'header')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                  {copiedHeader ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              )}
            </div>
            <div className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm overflow-auto text-zinc-300">
              <pre>{header || 'Waiting for token...'}</pre>
            </div>
          </div>
          {/* Payload */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">Payload <span className="text-xs text-zinc-500">(Data)</span></label>
              {payload && (
                <button onClick={() => copyToClipboard(payload, 'payload')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                  {copiedPayload ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              )}
            </div>
            <div className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm overflow-auto text-zinc-300">
              <pre>{payload || 'Waiting for token...'}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
