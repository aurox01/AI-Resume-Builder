import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { LogOut, User, Sparkles } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.svg"
            alt="Resume Builder Logo"
            className="h-9 sm:h-11 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl shadow-md group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* User Info & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full shadow-2xs">
            <div className="size-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-200 max-sm:hidden">
              Hi, {user?.name || 'User'}
            </span>
          </div>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 bg-slate-800 hover:bg-red-600/90 text-slate-200 hover:text-white border border-slate-700 hover:border-red-500 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold active:scale-95 transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <LogOut className="size-4" />
            <span className="max-sm:hidden">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
