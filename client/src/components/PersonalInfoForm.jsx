import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Upload } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location / Address", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession / Job Title", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile URL", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website / Portfolio", icon: Globe, type: "url" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Personal Information</h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Get started with your contact details and headline.</p>
      </div>

      {/* User Image Upload & Background Removal Toggle */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <label className="cursor-pointer group">
          {data.image ? (
            <div className="relative">
              <img
                src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                alt="user-profile"
                className="size-16 rounded-full object-cover border-2 border-blue-500 shadow-md group-hover:opacity-80 transition-opacity"
              />
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">Change</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-300 hover:border-blue-500 text-slate-700 font-bold text-xs sm:text-sm rounded-xl shadow-2xs group-hover:text-blue-600 transition-all">
              <Upload className="size-4 text-blue-600" />
              <span>Upload Profile Photo</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === 'object' && data.image !== null && (
          <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-slate-700 pl-4 border-l border-slate-200">
            <span>AI Background Removal</span>
            <label className="relative inline-flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground(prev => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-emerald-600 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
              <span className="text-xs font-bold text-slate-600">{removeBackground ? "Enabled" : "Disabled"}</span>
            </label>
          </div>
        )}
      </div>

      {/* Form Input Fields */}
      <div className="grid grid-cols-1 gap-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <Icon className="size-4 text-blue-600 shrink-0" />
                <span>{field.label}</span>
                {field.required && <span className="text-red-500 font-bold">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400 transition-all"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm
