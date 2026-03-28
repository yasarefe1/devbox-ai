import { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

export default function ColorTool() {
  const [hex, setHex] = useState('#4f46e5');
  const [rgb, setRgb] = useState('rgb(79, 70, 229)');
  const [hsl, setHsl] = useState('hsl(243, 76%, 59%)');
  const [cmyk, setCmyk] = useState('cmyk(65%, 69%, 0%, 10%)');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // --- Conversion Utilities ---
  const hexToRgb = (h: string) => {
    let c = h.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    if (c.length !== 6) return null;
    const num = parseInt(c, 16);
    if (isNaN(num)) return null;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
  };

  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    c /= 100; m /= 100; y /= 100; k /= 100;
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  const parseNumbers = (str: string) => str.match(/\d+(\.\d+)?/g)?.map(Number) || [];

  // --- Handlers ---
  const handleHexChange = (val: string) => {
    setHex(val);
    const rgbObj = hexToRgb(val);
    if (rgbObj) {
      const { r, g, b } = rgbObj;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const hslObj = rgbToHsl(r, g, b);
      setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
      const cmykObj = rgbToCmyk(r, g, b);
      setCmyk(`cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`);
    }
  };

  const handleRgbChange = (val: string) => {
    setRgb(val);
    const nums = parseNumbers(val);
    if (nums.length >= 3) {
      const [r, g, b] = nums.map((n) => Math.min(255, Math.max(0, n)));
      setHex(rgbToHex(r, g, b));
      const hslObj = rgbToHsl(r, g, b);
      setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
      const cmykObj = rgbToCmyk(r, g, b);
      setCmyk(`cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`);
    }
  };

  const handleHslChange = (val: string) => {
    setHsl(val);
    const nums = parseNumbers(val);
    if (nums.length >= 3) {
      const h = Math.min(360, Math.max(0, nums[0]));
      const s = Math.min(100, Math.max(0, nums[1]));
      const l = Math.min(100, Math.max(0, nums[2]));
      const rgbObj = hslToRgb(h, s, l);
      setHex(rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b));
      setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
      const cmykObj = rgbToCmyk(rgbObj.r, rgbObj.g, rgbObj.b);
      setCmyk(`cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`);
    }
  };

  const handleCmykChange = (val: string) => {
    setCmyk(val);
    const nums = parseNumbers(val);
    if (nums.length >= 4) {
      const c = Math.min(100, Math.max(0, nums[0]));
      const m = Math.min(100, Math.max(0, nums[1]));
      const y = Math.min(100, Math.max(0, nums[2]));
      const k = Math.min(100, Math.max(0, nums[3]));
      const rgbObj = cmykToRgb(c, m, y, k);
      setHex(rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b));
      setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
      const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
      setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Ensure valid hex for preview background
  const previewColor = hexToRgb(hex) ? hex : '#000000';

  return (
    <div className="flex flex-col h-full gap-4 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">Color Converter</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Preview Area */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-400">Preview</label>
          <div 
            className="flex-1 w-full rounded-2xl border border-zinc-800 shadow-inner min-h-[200px] flex items-center justify-center relative overflow-hidden transition-colors duration-200"
            style={{ backgroundColor: previewColor }}
          >
            <input 
              type="color" 
              value={previewColor.slice(0, 7)} 
              onChange={(e) => handleHexChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="bg-zinc-950/50 backdrop-blur-md px-4 py-2 rounded-lg text-white font-mono text-lg pointer-events-none border border-white/10 shadow-xl">
              {previewColor.toUpperCase()}
            </div>
          </div>
          <p className="text-xs text-zinc-500 text-center">Click the color area to open the native color picker.</p>
        </div>

        {/* Inputs Area */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          
          {/* HEX */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">HEX</label>
              <button onClick={() => copyToClipboard(hex, 'hex')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copiedField === 'hex' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500"
              placeholder="#000000"
            />
          </div>

          {/* RGB */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">RGB</label>
              <button onClick={() => copyToClipboard(rgb, 'rgb')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copiedField === 'rgb' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <input
              type="text"
              value={rgb}
              onChange={(e) => handleRgbChange(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500"
              placeholder="rgb(0, 0, 0)"
            />
          </div>

          {/* HSL */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">HSL</label>
              <button onClick={() => copyToClipboard(hsl, 'hsl')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copiedField === 'hsl' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <input
              type="text"
              value={hsl}
              onChange={(e) => handleHslChange(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500"
              placeholder="hsl(0, 0%, 0%)"
            />
          </div>

          {/* CMYK */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">CMYK</label>
              <button onClick={() => copyToClipboard(cmyk, 'cmyk')} className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                {copiedField === 'cmyk' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <input
              type="text"
              value={cmyk}
              onChange={(e) => handleCmykChange(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm text-zinc-300 focus:outline-none focus:border-indigo-500"
              placeholder="cmyk(0%, 0%, 0%, 100%)"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
