import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'

const Preview = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('id')
  
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
      setError('Failed to fetch resume')
      console.error('Error fetching resume:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleDownload = () => {
    if (!resume) return

    // Create a hidden iframe to avoid "about:blank" and timestamp issues
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    
    const templateStyles = `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 20px;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .header {
        text-align: center;
        margin-bottom: 24px;
      }
      .name {
        font-size: 2rem;
        font-weight: bold;
        color: #111827;
        margin-bottom: 8px;
      }
      .title {
        font-size: 1.25rem;
        color: #6b7280;
        margin-bottom: 16px;
      }
      .summary {
        color: #374151;
        line-height: 1.5;
      }
      .contact-info {
        text-align: center;
        margin-bottom: 24px;
        font-size: 0.875rem;
        padding: 16px 0;
        border-bottom: 1px solid #e5e7eb;
      }
      .contact-info span {
        margin: 0 8px;
        display: inline-block;
      }
      .contact-info a {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
      }
      .section {
        margin-bottom: 24px;
      }
      .section-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        margin-bottom: 12px;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 4px;
      }
      .experience-item, .education-item, .project-item {
        margin-bottom: 16px;
        padding-left: 0;
      }
      .experience-item h4, .education-item h4, .project-item h4 {
        font-weight: 600;
        color: #111827;
        margin-bottom: 4px;
      }
      .company, .institution {
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .date {
        color: #9ca3af;
        font-size: 0.875rem;
        margin-bottom: 8px;
      }
      .description {
        color: #374151;
        line-height: 1.5;
      }
      .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .skill-item {
        padding: 8px 12px;
        background-color: #f8fafc;
        border-radius: 6px;
        margin-bottom: 8px;
        font-weight: 500;
      }
      .hobby-tag {
        display: inline-block;
        padding: 6px 12px;
        background-color: #fef3c7;
        color: #92400e;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        margin: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .project-links {
        margin-top: 8px;
        font-size: 0.875rem;
      }
      .project-links a {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
        margin-right: 16px;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      @media print {
        @page {
          margin: 0.5in;
          size: A4;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none;
        }
        .page-break {
          page-break-before: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
      }
    `

    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume</title>
          <style>${templateStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1 class="name">${resume.profileInfo?.fullname || 'Your Name'}</h1>
            <p class="title">${resume.profileInfo?.designation || 'Your Title'}</p>
            ${resume.profileInfo?.summary ? `<p class="summary">${resume.profileInfo.summary}</p>` : ''}
          </div>

          <div class="contact-info">
            ${resume.contactInfo?.email ? `<span>📧 <a href="mailto:${resume.contactInfo.email}" onclick="navigator.clipboard.writeText('${resume.contactInfo.email}')">${resume.contactInfo.email}</a></span>` : ''}
            ${resume.contactInfo?.phone ? `<span>📱 <a href="tel:${resume.contactInfo.phone}" onclick="navigator.clipboard.writeText('${resume.contactInfo.phone}')">${resume.contactInfo.phone}</a></span>` : ''}
            ${resume.contactInfo?.linkedin ? `<span>💼 <a href="${resume.contactInfo.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
            ${resume.contactInfo?.github ? `<span>🐙 <a href="${resume.contactInfo.github}" target="_blank">GitHub</a></span>` : ''}
            ${resume.contactInfo?.website ? `<span>🌐 <a href="${resume.contactInfo.website}" target="_blank">Website</a></span>` : ''}
          </div>

          ${resume.workExperience && resume.workExperience.length > 0 && resume.workExperience.some(exp => exp.company && exp.role) ? `
            <div class="section">
              <h2 class="section-title">Work Experience</h2>
              ${resume.workExperience.map(exp => 
                exp.company && exp.role ? `
                  <div class="experience-item">
                    <div class="item-header">
                      <h4>${exp.role}</h4>
                      ${exp.startDate || exp.endDate ? `<span class="date">${exp.startDate || ''} - ${exp.endDate || ''}</span>` : ''}
                    </div>
                    <p class="company">${exp.company}</p>
                    ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                  </div>
                ` : ''
              ).join('')}
            </div>
          ` : ''}

          ${resume.education && resume.education.length > 0 && resume.education.some(edu => edu.degree && edu.institution) ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${resume.education.map(edu => 
                edu.degree && edu.institution ? `
                  <div class="education-item">
                    <div class="item-header">
                      <h4>${edu.degree}</h4>
                      ${edu.startDate || edu.endDate ? `<span class="date">${edu.startDate || ''} - ${edu.endDate || ''}</span>` : ''}
                    </div>
                    <p class="institution">${edu.institution}</p>
                  </div>
                ` : ''
              ).join('')}
            </div>
          ` : ''}

          ${resume.skills && resume.skills.length > 0 && resume.skills.some(skill => skill.name) ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills-grid">
                ${resume.skills.map(skill => 
                  skill.name ? `<div class="skill-item">${skill.name}</div>` : ''
                ).join('')}
              </div>
            </div>
          ` : ''}

          ${resume.projects && resume.projects.length > 0 && resume.projects.some(proj => proj.title) ? `
            <div class="section">
              <h2 class="section-title">Projects</h2>
              ${resume.projects.map(proj => 
                proj.title ? `
                  <div class="project-item">
                    <h4>${proj.title}</h4>
                    ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
                    ${(proj.github || proj.liveDemo) ? `
                      <div class="project-links">
                        ${proj.github ? `<a href="${proj.github}" target="_blank">GitHub</a>` : ''}
                        ${proj.liveDemo ? `<a href="${proj.liveDemo}" target="_blank">Live Demo</a>` : ''}
                      </div>
                    ` : ''}
                  </div>
                ` : ''
              ).join('')}
            </div>
          ` : ''}

          ${resume.hobbies && resume.hobbies.length > 0 && resume.hobbies.some(hobby => hobby) ? `
            <div class="section">
              <h2 class="section-title">Hobbies</h2>
              <div>
                ${resume.hobbies.map(hobby => 
                  hobby ? `<span class="hobby-tag">${hobby}</span>` : ''
                ).join('')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `

    // Write content to iframe and print
    iframe.contentDocument.write(pdfContent)
    iframe.contentDocument.close()
    
    setTimeout(() => {
      iframe.contentWindow.print()
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }, 500)
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    )
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Resume not found'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <h1 className="text-xl font-semibold text-gray-900">
              {resume.title || 'Resume Preview'}
            </h1>
            
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="text-center p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {resume.profileInfo?.fullname || 'Your Name'}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {resume.profileInfo?.designation || 'Your Title'}
            </p>
            {resume.profileInfo?.summary && (
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                {resume.profileInfo.summary}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {resume.contactInfo?.email && (
                <span 
                  className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                  onClick={() => copyToClipboard(resume.contactInfo.email)}
                  title="Click to copy email"
                >
                  📧 {resume.contactInfo.email}
                </span>
              )}
              {resume.contactInfo?.phone && (
                <span 
                  className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                  onClick={() => copyToClipboard(resume.contactInfo.phone)}
                  title="Click to copy phone number"
                >
                  📱 {resume.contactInfo.phone}
                </span>
              )}
              {resume.contactInfo?.linkedin && (
                <a 
                  href={resume.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  💼 LinkedIn
                </a>
              )}
              {resume.contactInfo?.github && (
                <a 
                  href={resume.contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  🐙 GitHub
                </a>
              )}
              {resume.contactInfo?.website && (
                <a 
                  href={resume.contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  🌐 Website
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Work Experience */}
            {resume.workExperience && resume.workExperience.length > 0 && resume.workExperience.some(exp => exp.company && exp.role) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {resume.workExperience.map((exp, index) => (
                    exp.company && exp.role && (
                      <div key={index} className="pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{exp.role}</h3>
                          {(exp.startDate || exp.endDate) && (
                            <span className="text-sm text-gray-600">
                              {exp.startDate || ''} - {exp.endDate || ''}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                        {exp.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && resume.education.some(edu => edu.degree && edu.institution) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Education
                </h2>
                <div className="space-y-4">
                  {resume.education.map((edu, index) => (
                    edu.degree && edu.institution && (
                      <div key={index} className="pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                          {(edu.startDate || edu.endDate) && (
                            <span className="text-sm text-gray-600">
                              {edu.startDate || ''} - {edu.endDate || ''}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{edu.institution}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Skills - Simple Text */}
            {resume.skills && resume.skills.length > 0 && resume.skills.some(skill => skill.name) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Skills
                </h2>
                <div className="flex flex-col gap-2">
                  {resume.skills.map((skill, index) => (
                    skill.name && (
                      <div key={index} className="px-3 py-2 bg-gray-100 rounded">
                        {skill.name}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && resume.projects.some(proj => proj.title) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Projects
                </h2>
                <div className="space-y-4">
                  {resume.projects.map((project, index) => (
                    project.title && (
                      <div key={index} className="pl-4">
                        <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                        {project.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-2">
                            {project.description}
                          </p>
                        )}
                        {(project.github || project.liveDemo) && (
                          <div className="flex gap-4 text-sm">
                            {project.github && (
                              <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                              >
                                GitHub
                              </a>
                            )}
                            {project.liveDemo && (
                              <a 
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                              >
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {resume.hobbies && resume.hobbies.length > 0 && resume.hobbies.some(hobby => hobby) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Hobbies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resume.hobbies.map((hobby, index) => (
                    hobby && (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
