import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Emerald", value: "#10B981" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Rose", value: "#F43F5E" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Slate", value: "#475569" },
        { name: "Dark", value: "#111827" }
    ]

    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all px-3 py-2 rounded-lg'>
        <Palette className="size-4" /> <span>Accent Color</span>
        <span className="size-3 rounded-full border border-black/10" style={{ backgroundColor: selectedColor || '#3B82F6' }}></span>
      </button>
      {isOpen && (
        <div className='grid grid-cols-3 w-56 gap-2 absolute top-full left-0 p-3 mt-2 z-30 bg-white rounded-xl border border-slate-200 shadow-xl'>
            {colors.map((color)=>(
                <div key={color.value} className='relative cursor-pointer group flex flex-col items-center' onClick={()=> {onChange(color.value); setIsOpen(false)}}>
                    <div className="size-10 rounded-full border border-black/10 group-hover:scale-105 transition-all shadow-2xs flex items-center justify-center" style={{backgroundColor : color.value}}>
                      {selectedColor === color.value && (
                          <Check className="size-4 text-white stroke-[3]"/>
                      )}
                    </div>
                    <p className='text-[10px] text-center mt-1 font-medium text-slate-600'>{color.name}</p>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
