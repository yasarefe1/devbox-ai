import { useState, useEffect } from 'react';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';

export default function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  };

  // Generate initial UUIDs
  useEffect(() => {
    generateUuids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">UUID (v4) Generator</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-400">Count:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-16 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 text-center"
            />
          </div>
          <button onClick={generateUuids} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors cursor-pointer text-sm font-medium">
            <RefreshCw size={16} /> Generate
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-400">Generated UUIDs</label>
          {uuids.length > 0 && (
            <button onClick={copyToClipboard} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
              {copied ? <><Check size={14} className="text-green-500" /> Copied</> : <><Copy size={14} /> Copy All</>}
            </button>
          )}
        </div>
        <div className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm overflow-auto text-zinc-300 leading-relaxed">
          {uuids.map((uuid, index) => (
            <div key={index} className="py-1 border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/50 px-2 rounded transition-colors">
              {uuid}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
