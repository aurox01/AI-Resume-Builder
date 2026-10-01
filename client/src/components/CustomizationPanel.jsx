import React, { useState } from 'react';
import { Check, Palette, Type, Sliders, X, Sparkles, LayoutGrid, Layers, Paintbrush } from 'lucide-react';

const CustomizationPanel = ({
  selectedColor = "#3B82F6",
  onColorChange = () => {},
  selectedFont = "Outfit",
  onFontChange = () => {},
  selectedFontSize = "medium",
  onFontSizeChange = () => {},
  selectedSpacing = "normal",
  onSpacingChange = () => {},
  selectedHeaderStyle = "line",
  onHeaderStyleChange = () => {},
  selectedSkillStyle = "badge",
  onSkillStyleChange = () => {},
  inline = false,
  customTrigger = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customHex, setCustomHex] = useState(selectedColor);

  const colors = [
    { name: "Electric Blue", value: "#2563EB" },
    { name: "Cyan Teal", value: "#06B6D4" },
    { name: "Emerald Green", value: "#10B981" },
    { name: "Royal Indigo", value: "#6366F1" },
    { name: "Violet Purple", value: "#8B5CF6" },
    { name: "Crimson Red", value: "#EF4444" },
    { name: "Sunset Orange", value: "#F97316" },
    { name: "Amber Gold", value: "#D97706" },
    { name: "Graphite Slate", value: "#475569" },
    { name: "Onyx Black", value: "#0F172A" }
  ];

  const fonts = [
    { name: "Outfit", value: "Outfit", sample: "Modern Sans" },
    { name: "Inter", value: "Inter", sample: "Clean SaaS" },
    { name: "Roboto", value: "Roboto", sample: "Standard" },
    { name: "Poppins", value: "Poppins", sample: "Geometric" },
    { name: "Merriweather", value: "Merriweather", sample: "Classic Serif" },
    { name: "Playfair Display", value: "Playfair Display", sample: "Executive Serif" }
  ];

  const fontSizes = [
    { name: "Small", value: "small" },
    { name: "Medium", value: "medium" },
    { name: "Large", value: "large" },
    { name: "X-Large", value: "xlarge" }
  ];

  const spacings = [
    { name: "Compact", value: "compact" },
    { name: "Normal", value: "normal" },
    { name: "Spacious", value: "spacious" }
  ];

  const headerStyles = [
    { id: "line", name: "Underline Bar", desc: "Classic line under headers" },
    { id: "left-accent", name: "Left Accent Bar", desc: "Solid colored bar on the left" },
    { id: "pill", name: "Pill Tag Header", desc: "Accent background pill header" },
    { id: "minimal", name: "Minimal Text", desc: "High contrast clean typography" }
  ];

  const skillStyles = [
    { id: "badge", name: "Pill Badges", desc: "Rounded solid tags" },
    { id: "chip", name: "Border Chips", desc: "Outlined chips" },
    { id: "list", name: "Dot List", desc: "Bullet list format" }
  ];

  const handleCustomHexChange = (e) => {
    const val = e.target.value;
    setCustomHex(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      onColorChange(val);
    }
  };

  const renderCustomizationContent = () => (
    <div className="space-y-6 text-slate-900">
      {/* 1. Accent Color Palette & Hex Picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Paintbrush className="size-4 text-purple-600" /> Theme Accent Color
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Custom Color:</span>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                onColorChange(e.target.value);
                setCustomHex(e.target.value);
              }}
              className="size-7 rounded-lg cursor-pointer border-0 p-0 shadow-2xs"
            />
            <input
              type="text"
              value={customHex}
              onChange={handleCustomHexChange}
              className="w-20 px-2 py-1 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg text-slate-800 uppercase text-center"
              maxLength={7}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                onColorChange(c.value);
                setCustomHex(c.value);
              }}
              className={`relative flex flex-col items-center p-1 rounded-xl border transition-all cursor-pointer ${
                selectedColor.toLowerCase() === c.value.toLowerCase()
                  ? "border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 scale-105"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              title={c.name}
            >
              <span
                className="size-7 rounded-lg shadow-2xs border border-black/10 flex items-center justify-center"
                style={{ backgroundColor: c.value }}
              >
                {selectedColor.toLowerCase() === c.value.toLowerCase() && (
                  <Check className="size-4 text-white stroke-[3]" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Typography Section */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="size-4 text-purple-600" /> Font Family
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {fonts.map((f) => (
            <button
              key={f.value}
              onClick={() => onFontChange(f.value)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedFont === f.value
                  ? "border-purple-600 bg-purple-50 text-purple-900 font-extrabold ring-2 ring-purple-500/15"
                  : "border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
            >
              <div className="text-xs font-bold">{f.name}</div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">{f.sample}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Font Size & Spacing Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Text Scale
          </label>
          <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
            {fontSizes.map((s) => (
              <button
                key={s.value}
                onClick={() => onFontSizeChange(s.value)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedFontSize === s.value
                    ? "bg-white text-purple-900 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Section Spacing
          </label>
          <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
            {spacings.map((sp) => (
              <button
                key={sp.value}
                onClick={() => onSpacingChange(sp.value)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSpacing === sp.value
                    ? "bg-white text-purple-900 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {sp.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Section Header Style */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="size-4 text-purple-600" /> Header Divider Style
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {headerStyles.map((h) => (
            <button
              key={h.id}
              onClick={() => onHeaderStyleChange(h.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedHeaderStyle === h.id
                  ? "border-purple-600 bg-purple-50 text-purple-900 font-extrabold ring-2 ring-purple-500/15"
                  : "border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
            >
              <div className="text-xs font-bold">{h.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{h.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Skill Badge Style */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <LayoutGrid className="size-4 text-purple-600" /> Skills Display Format
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {skillStyles.map((st) => (
            <button
              key={st.id}
              onClick={() => onSkillStyleChange(st.id)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                selectedSkillStyle === st.id
                  ? "border-purple-600 bg-purple-50 text-purple-900 font-extrabold ring-2 ring-purple-500/15"
                  : "border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
            >
              <div className="text-xs font-bold">{st.name}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{st.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className="space-y-4">
        <div className="pb-3 border-b border-slate-200">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Palette className="size-5 text-purple-600" /> Styling & Theme Studio
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize colors, typography, line spacing, section headers, and skill badge formats.
          </p>
        </div>
        {renderCustomizationContent()}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {customTrigger ? (
        <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
          {customTrigger}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 shadow-2xs active:scale-95 transition-all px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <Sliders className="size-4 text-purple-400" />
          <span>Customize Theme</span>
          <div
            className="size-3.5 rounded-full border border-white/50 shadow-2xs shrink-0"
            style={{ backgroundColor: selectedColor }}
          />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" onClick={() => setIsOpen(false)}>
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[88vh] flex flex-col text-slate-900 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
                  <Palette className="size-5 text-purple-600" /> Advanced Design Studio
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  Customize colors, typography, line spacing, section headers, and skill badge styles.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-9 rounded-full hover:bg-slate-200/80 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Customization Options Body */}
            <div className="p-6 flex-1 min-h-0 overflow-y-auto">
              {renderCustomizationContent()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/90 shrink-0 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Sparkles className="size-3.5 text-purple-600" /> Updates preview in real-time
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-purple-600/25 transition-all cursor-pointer"
              >
                Apply Customization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;
