import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authStyles as s } from '../assets/dummyStyle'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const { updateUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password
      })
      
      console.log('Login response data:', response.data)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        updateUser(response.data)
        navigate('/', { replace: true })
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className={s.container}>
        <div className={s.headerWrapper}>
          <h1 className={s.title}>Welcome back</h1>
          <p className={s.subtitle}>Login to continue building your resume</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <form className={s.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-4 bg-white border rounded-xl outline-none transition-colors ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-violet-200 focus:border-violet-500'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-4 bg-white border rounded-xl outline-none transition-colors ${
                errors.password ? 'border-red-500 focus:border-red-500' : 'border-violet-200 focus:border-violet-500'
              }`}
              required
              minLength={6}
            />
            {errors.password && (
              <p className="mt-2 text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className={`${s.submitButton} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className={s.switchText}>
          New here? <Link to="/signup" className={s.switchButton}>Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
