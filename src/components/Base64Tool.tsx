import { useState } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (!input.trim()) return;
    try {
      setError('');
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err: any) {
      setError('Invalid Base64 string');
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
        <h2 className="text-xl font-semibold text-zinc-100">Base64 Encoder / Decoder</h2>
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setMode('encode')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${mode === 'encode' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${mode === 'decode' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Decode
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Input</label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
          />
          <button onClick={process} className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors cursor-pointer">
            <ArrowRightLeft size={16} /> {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
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
          <div className={`flex-1 w-full p-4 bg-zinc-900 border rounded-lg font-mono text-sm overflow-auto break-all ${error ? 'border-red-500/50 text-red-400' : 'border-zinc-800 text-zinc-300'}`}>
            {error ? error : output}
          </div>
        </div>
      </div>
    </div>
  );
}
