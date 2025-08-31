import axios from 'axios'

const APYHUB_API_KEY = 'YOUR_APYHUB_API_KEY' // Replace with your actual API key
const APYHUB_API_URL = 'https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume'

export const checkATSScore = async (resumeData) => {
  try {
    // Convert resume data to text format for ATS analysis
    const resumeText = convertResumeToText(resumeData)
    
    const response = await axios.post(APYHUB_API_URL, {
      resume: resumeText
    }, {
      headers: {
        'Authorization': `Bearer ${APYHUB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('ATS Score API Error:', error)
    // Return mock data for testing purposes
    return getMockATSData()
  }
}

const convertResumeToText = (resumeData) => {
  let text = ''
  
  // Profile section
  if (resumeData.profileInfo) {
    text += 'PROFILE\n'
    text += '='.repeat(20) + '\n'
    text += `Name: ${resumeData.profileInfo.fullname || ''}\n`
    text += `Title: ${resumeData.profileInfo.designation || ''}\n`
    text += `Email: ${resumeData.contactInfo?.email || ''}\n`
    text += `Phone: ${resumeData.contactInfo?.phone || ''}\n`
    text += `LinkedIn: ${resumeData.contactInfo?.linkedin || ''}\n`
    text += `Summary: ${resumeData.profileInfo.summary || ''}\n\n`
  }
  
  // Experience section
  if (resumeData.workExperience && resumeData.workExperience.length > 0) {
    text += 'WORK EXPERIENCE\n'
    text += '='.repeat(20) + '\n'
    resumeData.workExperience.forEach((exp, index) => {
      text += `${index + 1}. ${exp.role || ''} at ${exp.company || ''}\n`
      text += `   ${exp.startDate || ''} - ${exp.endDate || ''}\n`
      text += `   ${exp.description || ''}\n\n`
    })
  }
  
  // Education section
  if (resumeData.education && resumeData.education.length > 0) {
    text += 'EDUCATION\n'
    text += '='.repeat(20) + '\n'
    resumeData.education.forEach((edu, index) => {
      text += `${index + 1}. ${edu.degree || ''} from ${edu.institution || ''}\n`
      text += `   ${edu.startDate || ''} - ${edu.endDate || ''}\n\n`
    })
  }
  
  // Skills section
  if (resumeData.skills && resumeData.skills.length > 0) {
    text += 'SKILLS\n'
    text += '='.repeat(20) + '\n'
    resumeData.skills.forEach(skill => {
      text += `• ${skill.name || ''}\n`
    })
    text += '\n'
  }
  
  // Projects section
  if (resumeData.projects && resumeData.projects.length > 0) {
    text += 'PROJECTS\n'
    text += '='.repeat(20) + '\n'
    resumeData.projects.forEach((proj, index) => {
      text += `${index + 1}. ${proj.title || ''}\n`
      text += `   ${proj.description || ''}\n`
      text += `   GitHub: ${proj.github || ''}\n`
      text += `   Live Demo: ${proj.liveDemo || ''}\n\n`
    })
  }
  
  return text
}

const getMockATSData = () => {
  return {
    score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
    feedback: [
      "Your resume has good structure and formatting",
      "Consider adding more quantifiable achievements",
      "Skills section could be more specific",
      "Overall professional appearance"
    ],
    suggestions: [
      "Use action verbs to start bullet points",
      "Include metrics and numbers where possible",
      "Tailor skills to match job requirements",
      "Ensure consistent formatting throughout"
    ]
  }
}

export const getATSScoreColor = (score) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 80) return 'text-blue-600'
  if (score >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

export const getATSScoreLabel = (score) => {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Good'
  if (score >= 70) return 'Fair'
  return 'Needs Improvement'
}
