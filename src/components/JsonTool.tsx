import { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

export default function JsonTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">JSON Formatter & Validator</h2>
        <button onClick={formatJson} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors cursor-pointer">
          <Play size={16} /> Format
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder='{"key": "value"}'
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400">Output</label>
            {output && (
              <button onClick={copyToClipboard} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            )}
          </div>
          <div className={`flex-1 w-full p-4 bg-zinc-900 border rounded-lg font-mono text-sm overflow-auto ${error ? 'border-red-500/50 text-red-400' : 'border-zinc-800 text-zinc-300'}`}>
            {error ? (
              <div>
                <p className="font-semibold text-red-500 mb-2">Invalid JSON</p>
                <p>{error}</p>
              </div>
            ) : (
              <pre>{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
