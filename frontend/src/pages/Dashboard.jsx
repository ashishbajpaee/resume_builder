import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { dashboardStyles as s } from '../assets/dummyStyle'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'
import { Plus, Edit, Trash2, Eye, LineChart } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteResumeId, setDeleteResumeId] = useState(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [showATSModal, setShowATSModal] = useState(false)
  const [selectedResumeForATS, setSelectedResumeForATS] = useState(null)
  const [atsScore, setAtsScore] = useState(null)
  const [atsLoading, setAtsLoading] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)
      setResumes(data)
    } catch (err) {
      setError('Failed to load resumes')
      console.error('Error fetching resumes:', err)
    } finally {
      setLoading(false)
    }
  }

  const createNewResume = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title: 'Untitled Resume'
      })
      navigate(`/builder?id=${data._id}`)
    } catch (err) {
      setError('Failed to create resume')
      console.error('Error creating resume:', err)
    }
  }

  const initiateDelete = (id) => {
    setDeleteResumeId(id)
    setShowDeleteConfirm(true)
    setDeleteConfirmText('')
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete') {
      setError('Please type "delete" to confirm')
      return
    }
    
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(deleteResumeId))
      setResumes(resumes.filter(resume => resume._id !== deleteResumeId))
      setShowDeleteConfirm(false)
      setDeleteResumeId(null)
      setDeleteConfirmText('')
    } catch (err) {
      setError('Failed to delete resume')
      console.error('Error deleting resume:', err)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeleteResumeId(null)
    setDeleteConfirmText('')
  }

  const getATSScore = async (resume) => {
    setSelectedResumeForATS(resume)
    setAtsLoading(true)
    setShowATSModal(true)
    
    try {
      // Create the resume data in the required format
      const resumeData = {
        profile: {
          name: resume.profileInfo.fullName,
          title: resume.profileInfo.designation,
          email: resume.contactInfo.email,
          phone: resume.contactInfo.phone,
          linkedin: resume.contactInfo.linkedin,
          summary: resume.profileInfo.summary
        },
        experience: resume.workExperience.map(exp => ({
          company: exp.company,
          title: exp.role,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description
        })),
        education: resume.education.map(edu => ({
          school: edu.institution,
          degree: edu.degree,
          startDate: edu.startDate,
          endDate: edu.endDate
        })),
        skills: resume.skills.map(skill => skill.name),
        projects: resume.projects.map(proj => ({
          name: proj.title,
          description: proj.description
        }))
      }

      const response = await axiosInstance.post(API_PATHS.ATS.GET_SCORE, resumeData)
      setAtsScore(response.data)
    } catch (err) {
      setError('Failed to get ATS score')
      console.error('Error getting ATS score:', err)
    } finally {
      setAtsLoading(false)
    }
  }

  const closeATSModal = () => {
    setShowATSModal(false)
    setSelectedResumeForATS(null)
    setAtsScore(null)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className={s.container}>
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.headerWrapper}>
        <div>
          <h1 className={s.headerTitle}>Your Resumes</h1>
          <p className={s.headerSubtitle}>Manage and create resumes</p>
        </div>
        <button className={s.createButton} onClick={createNewResume}>
          <span className={s.createButtonOverlay}></span>
          <span className={s.createButtonContent}>
            <Plus size={20} />
            Create Resume
          </span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <div className={s.emptyStateWrapper}>
          <div className={s.emptyIconWrapper}>📄</div>
          <h2 className={s.emptyTitle}>No resumes yet</h2>
          <p className={s.emptyText}>Click "Create Resume" to start building your first resume.</p>
        </div>
      ) : (
        <div className={s.grid}>
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{resume.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/builder?id=${resume._id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => navigate(`/preview?id=${resume._id}`)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => getATSScore(resume)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="ATS Score"
                  >
                    <LineChart size={16} />
                  </button>
                  <button
                    onClick={() => initiateDelete(resume._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                Last updated: {formatDate(resume.updatedAt)}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>Name: {resume.profileInfo?.fullName || 'Not set'}</div>
                <div>Email: {resume.contactInfo?.email || 'Not set'}</div>
                <div>Experience: {resume.workExperience?.length || 0} entries</div>
                <div>Education: {resume.education?.length || 0} entries</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Resume</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this resume? This action cannot be undone.
              Type "delete" to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type 'delete' to confirm"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={deleteConfirmText.toLowerCase() !== 'delete'}
              >
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
