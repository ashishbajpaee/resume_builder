import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { containerStyles as s, buttonStyles } from '../assets/dummyStyle'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react'

const Builder = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('id')
  
  const [resume, setResume] = useState({
    title: 'Untitled Resume',
    profileInfo: {
      fullName: '',
      designation: '',
      summary: '',
      profilePreviewUrl: ''
    },
    contactInfo: {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      website: ''
    },
    workExperience: [{
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      isOptional: true
    }],
    hobbies: [],
    education: [{
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    }],
    skills: [{
      name: '',
      progress: 50
    }],
    projects: [{
      title: '',
      description: '',
      github: '',
      liveDemo: ''
    }],
    certifications: [{
      title: '',
      issuer: '',
      year: ''
    }],
    languages: [{
      name: '',
      progress: 50
    }],
    interests: ['']
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [dateErrors, setDateErrors] = useState({})

  useEffect(() => {
    if (resumeId) {
      fetchResume()
    }
  }, [resumeId])

  const fetchResume = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId))
      setResume(data)
    } catch (err) {
      setError('Failed to load resume')
      console.error('Error fetching resume:', err)
    } finally {
      setLoading(false)
    }
  }

  const validateDates = (startDate, endDate, section, index) => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (end < start) {
        setDateErrors(prev => ({
          ...prev,
          [`${section}-${index}`]: 'End date must be after start date'
        }))
        return false
      }
    }
    setDateErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[`${section}-${index}`]
      return newErrors
    })
    return true
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email) {
      setEmailError('Email is required')
      return false
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  const saveResume = async () => {
    // Validate email before saving
    if (!validateEmail(resume.contactInfo.email)) {
      return
    }

    // Validate all dates
    let hasDateErrors = false
    resume.workExperience.forEach((exp, index) => {
      if (!validateDates(exp.startDate, exp.endDate, 'workExperience', index)) {
        hasDateErrors = true
      }
    })
    resume.education.forEach((edu, index) => {
      if (!validateDates(edu.startDate, edu.endDate, 'education', index)) {
        hasDateErrors = true
      }
    })

    if (hasDateErrors) {
      setError('Please fix date validation errors before saving')
      return
    }

    try {
      setSaving(true)
      if (resumeId) {
        await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), resume)
      } else {
        const { data } = await axiosInstance.post(API_PATHS.RESUME.CREATE, resume)
        navigate(`/builder?id=${data._id}`)
      }
      setError('')
    } catch (err) {
      setError('Failed to save resume')
      console.error('Error saving resume:', err)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (section, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }))
  }

  const addItem = (section, template) => {
    setResume(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }))
  }

  const removeItem = (section, index) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (section, index, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? 
          field === null ? value : { ...item, [field]: value }
          : item
      )
    }))
  }

  if (loading) {
    return (
      <div className={s.container}>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <button 
          onClick={() => navigate('/dashboard')} 
          className={buttonStyles.back}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h1 className="text-xl font-bold">Resume Builder</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/preview?id=${resumeId}`)} 
            className={buttonStyles.download}
          >
            <Eye size={16} />
            Preview
          </button>
          <button 
            onClick={saveResume} 
            disabled={saving}
            className={buttonStyles.save}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <div className={s.grid}>
        <div className={s.formContainer}>
          <div className="p-6 space-y-8">
            {/* Work Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Work Experience</h2>
                <button
                  onClick={() => addItem('workExperience', {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    isOptional: true
                  })}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {resume.workExperience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Experience {index + 1}</h3>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!exp.isOptional}
                            onChange={(e) => updateArrayItem('workExperience', index, 'isOptional', !e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600">Required</span>
                        </label>
                      </div>
                      {resume.workExperience.length > 1 && (
                        <button
                          onClick={() => removeItem('workExperience', index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayItem('workExperience', index, 'company', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => updateArrayItem('workExperience', index, 'role', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              updateArrayItem('workExperience', index, 'startDate', newValue);
                              validateDates(newValue, exp.endDate, 'workExperience', index);
                            }}
                            className={`w-full p-2 border rounded ${
                              dateErrors[`workExperience-${index}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">End Date</label>
                          <input
                            type="date"
                            value={exp.endDate}
                            min={exp.startDate}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              updateArrayItem('workExperience', index, 'endDate', newValue);
                              validateDates(exp.startDate, newValue, 'workExperience', index);
                            }}
                            className={`w-full p-2 border rounded ${
                              dateErrors[`workExperience-${index}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        {dateErrors[`workExperience-${index}`] && (
                          <p className="text-red-500 text-sm">{dateErrors[`workExperience-${index}`]}</p>
                        )}
                      </div>
                      <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => updateArrayItem('workExperience', index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded h-20 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Education</h2>
                <button
                  onClick={() => addItem('education', {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: ''
                  })}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">Education {index + 1}</h3>
                      {resume.education.length > 1 && (
                        <button
                          onClick={() => removeItem('education', index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              updateArrayItem('education', index, 'startDate', newValue);
                              validateDates(newValue, edu.endDate, 'education', index);
                            }}
                            className={`w-full p-2 border rounded ${
                              dateErrors[`education-${index}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">End Date</label>
                          <input
                            type="date"
                            value={edu.endDate}
                            min={edu.startDate}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              updateArrayItem('education', index, 'endDate', newValue);
                              validateDates(edu.startDate, newValue, 'education', index);
                            }}
                            className={`w-full p-2 border rounded ${
                              dateErrors[`education-${index}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        {dateErrors[`education-${index}`] && (
                          <p className="text-red-500 text-sm">{dateErrors[`education-${index}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Builder
