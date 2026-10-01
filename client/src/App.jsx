import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if(token){
        const { data } = await api.get('/api/users/data', {headers: {Authorization: token}})
        if(data.user){
          dispatch(login({token, user: data.user}))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#F8FAFC',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '12px 18px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '-0.01em',
          },
          success: {
            duration: 3500,
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
            style: {
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#F8FAFC',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
            style: {
              background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
              color: '#F8FAFC',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder />}/>
        </Route>

        <Route path='view/:resumeId' element={<Preview />}/>

      </Routes>
    </>
  )
}

export default App
