import { useState } from 'react';
import { Braces, Binary, Sparkles, TerminalSquare, Key, Link, Hash, Fingerprint, Palette } from 'lucide-react';
import JsonTool from './components/JsonTool';
import Base64Tool from './components/Base64Tool';
import AiAssistantTool from './components/AiAssistantTool';
import JwtTool from './components/JwtTool';
import UrlTool from './components/UrlTool';
import HashTool from './components/HashTool';
import UuidTool from './components/UuidTool';
import ColorTool from './components/ColorTool';

type Tool = 'ai' | 'json' | 'base64' | 'jwt' | 'url' | 'hash' | 'uuid' | 'color';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>('ai');

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TerminalSquare size={18} className="text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">DevBox</h1>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          <button
            onClick={() => setActiveTool('ai')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'ai' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Sparkles size={18} /> AI Code Assistant
          </button>
          <button
            onClick={() => setActiveTool('json')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'json' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Braces size={18} /> JSON Formatter
          </button>
          <button
            onClick={() => setActiveTool('jwt')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'jwt' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Key size={18} /> JWT Decoder
          </button>
          <button
            onClick={() => setActiveTool('base64')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'base64' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Binary size={18} /> Base64 Converter
          </button>
          <button
            onClick={() => setActiveTool('url')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'url' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Link size={18} /> URL Encoder
          </button>
          <button
            onClick={() => setActiveTool('hash')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'hash' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Hash size={18} /> Hash Generator
          </button>
          <button
            onClick={() => setActiveTool('uuid')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'uuid' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Fingerprint size={18} /> UUID Generator
          </button>
          <button
            onClick={() => setActiveTool('color')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTool === 'color' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
          >
            <Palette size={18} /> Color Converter
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500 text-center">
          Open Source Developer Tools
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-8 overflow-hidden">
          {activeTool === 'ai' && <AiAssistantTool />}
          {activeTool === 'json' && <JsonTool />}
          {activeTool === 'jwt' && <JwtTool />}
          {activeTool === 'base64' && <Base64Tool />}
          {activeTool === 'url' && <UrlTool />}
          {activeTool === 'hash' && <HashTool />}
          {activeTool === 'uuid' && <UuidTool />}
          {activeTool === 'color' && <ColorTool />}
        </main>
      </div>
    </div>
  );
}
