import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Resume1 from '../assets/Resume1.png'
import Resume2 from '../assets/Resume2.png'
import Resume3 from '../assets/Resume3.png'

const Templates = () => {
  const navigate = useNavigate()

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Professional and traditional resume template',
      image: Resume1,
      features: ['Clean layout', 'Professional appearance', 'ATS friendly']
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with visual appeal',
      image: Resume2,
      features: ['Modern design', 'Visual elements', 'Creative layout']
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated and refined template',
      image: Resume3,
      features: ['Elegant typography', 'Refined spacing', 'Professional look']
    }
  ]

  const handleTemplateSelect = (templateId) => {
    navigate(`/builder?template=${templateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Choose Your Resume Template
            </h1>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully crafted templates designed to help you stand out to employers.
            Each template is optimized for ATS systems and professional presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Template Image */}
              <div className="relative h-64 bg-gray-100">
                <img
                  src={template.image}
                  alt={`${template.name} Template`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {template.description}
                </p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  Use This Template
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Templates?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">ATS Optimized</h4>
              <p className="text-gray-600">Designed to pass Applicant Tracking Systems</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Design</h4>
              <p className="text-gray-600">Clean, modern layouts that impress employers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Customization</h4>
              <p className="text-gray-600">Simple to edit and personalize for your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
