import { useState, useEffect } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export default function HashTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateHash = async () => {
      if (!input) {
        setOutput('');
        return;
      }
      try {
        const msgUint8 = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setOutput(hashHex);
      } catch (err) {
        setOutput('Error generating hash');
      }
    };

    generateHash();
  }, [input, algorithm]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">Hash Generator</h2>
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {(['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as HashAlgorithm[]).map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${algorithm === algo ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Enter text to hash..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400">Hash Output ({algorithm})</label>
            {output && (
              <button onClick={copyToClipboard} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            )}
          </div>
          <div className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm overflow-auto break-all text-zinc-300">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}
