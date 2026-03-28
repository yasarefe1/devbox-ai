import { useState } from 'react';
import { Sparkles, Bug, FileCode2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AiAssistantTool() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeCode = async (action: 'explain' | 'refactor' | 'bugs') => {
    if (!code.trim()) return;
    setLoading(true);
    setResponse('');

    let prompt = '';
    if (action === 'explain') {
      prompt = `Explain the following code in a clear, concise manner. Highlight its purpose and how it works:\n\n\`\`\`\n${code}\n\`\`\``;
    } else if (action === 'refactor') {
      prompt = `Refactor the following code to improve readability, performance, and best practices. Provide the refactored code and briefly explain the changes:\n\n\`\`\`\n${code}\n\`\`\``;
    } else if (action === 'bugs') {
      prompt = `Analyze the following code for potential bugs, security vulnerabilities, or edge cases. If any are found, explain them and provide a fix:\n\n\`\`\`\n${code}\n\`\`\``;
    }

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
      });
      setResponse(result.text || 'No response generated.');
    } catch (error: any) {
      setResponse(`**Error:** ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">AI Code Assistant</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => analyzeCode('explain')} disabled={loading || !code} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-200 text-sm rounded-md transition-colors cursor-pointer">
            <FileCode2 size={16} /> Explain
          </button>
          <button onClick={() => analyzeCode('refactor')} disabled={loading || !code} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-200 text-sm rounded-md transition-colors cursor-pointer">
            <Sparkles size={16} /> Refactor
          </button>
          <button onClick={() => analyzeCode('bugs')} disabled={loading || !code} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-200 text-sm rounded-md transition-colors cursor-pointer">
            <Bug size={16} /> Find Bugs
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Your Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="// Paste your code here..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">AI Analysis</label>
          <div className="flex-1 w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm overflow-auto text-zinc-300">
            {loading ? (
              <div className="flex items-center justify-center h-full text-zinc-500 gap-2">
                <Loader2 className="animate-spin" size={20} /> Analyzing...
              </div>
            ) : response ? (
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-600">
                Select an action above to analyze your code.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
