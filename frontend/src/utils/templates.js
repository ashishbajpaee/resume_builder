export const templates = [
  {
    id: 1,
    name: 'Classic',
    description: 'A traditional, professional resume template with clean lines and classic typography.',
    image: '/src/assets/Resume1.png',
    styles: {
      header: {
        textAlign: 'center',
        marginBottom: '1.5rem'
      },
      name: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      title: {
        fontSize: '1.25rem',
        color: '#64748b',
        marginBottom: '1rem'
      },
      summary: {
        color: '#475569',
        lineHeight: '1.6',
        marginBottom: '1.5rem'
      },
      contactInfo: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        padding: '1rem 0',
        borderBottom: '1px solid #e2e8f0'
      },
      section: {
        marginBottom: '1.5rem'
      },
      sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem',
        borderBottom: '2px solid #d1d5db',
        paddingBottom: '0.5rem'
      },
      item: {
        marginBottom: '1.5rem',
        paddingLeft: '1rem',
        borderLeft: '3px solid #8b5cf6'
      },
      itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
      },
      itemTitle: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#1e293b'
      },
      itemSubtitle: {
        fontWeight: '500',
        color: '#64748b',
        marginBottom: '0.25rem'
      },
      itemDates: {
        fontSize: '0.875rem',
        color: '#64748b',
        backgroundColor: '#f1f5f9',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem'
      },
      itemDescription: {
        fontSize: '0.875rem',
        color: '#475569',
        lineHeight: '1.6'
      },
      skillsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      },
      skillItem: {
        padding: '0.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.375rem',
        borderLeft: '3px solid #8b5cf6',
        marginBottom: '0.5rem'
      },
      skillName: {
        fontWeight: '500',
        color: '#1e293b'
      }
    }
  },
  {
    id: 2,
    name: 'Modern',
    description: 'A contemporary design with bold colors and modern layout.',
    image: '/src/assets/Resume2.png',
    styles: {
      header: {
        textAlign: 'left',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#8b5cf6',
        color: 'white',
        borderRadius: '0.5rem'
      },
      name: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      },
      title: {
        fontSize: '1.5rem',
        opacity: '0.9',
        marginBottom: '1rem'
      },
      summary: {
        fontSize: '1.1rem',
        lineHeight: '1.7',
        opacity: '0.8'
      },
      contactInfo: {
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem'
      },
      section: {
        marginBottom: '2rem'
      },
      sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#8b5cf6',
        marginBottom: '1.5rem',
        borderBottom: '3px solid #8b5cf6',
        paddingBottom: '0.5rem'
      },
      item: {
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #8b5cf6'
      },
      itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.75rem'
      },
      itemTitle: {
        fontWeight: 'bold',
        fontSize: '1.125rem',
        color: '#1e293b'
      },
      itemSubtitle: {
        fontWeight: '600',
        color: '#8b5cf6',
        marginBottom: '0.5rem'
      },
      itemDates: {
        fontSize: '0.875rem',
        color: '#64748b',
        backgroundColor: '#e2e8f0',
        padding: '0.25rem 0.75rem',
        borderRadius: '1rem'
      },
      itemDescription: {
        fontSize: '0.95rem',
        color: '#475569',
        lineHeight: '1.7'
      },
      skillsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      },
      skillItem: {
        padding: '0.75rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #8b5cf6',
        marginBottom: '0.5rem'
      },
      skillName: {
        fontWeight: '600',
        color: '#1e293b',
        fontSize: '1rem'
      }
    }
  },
  {
    id: 3,
    name: 'Elegant',
    description: 'A sophisticated template with elegant typography and refined spacing.',
    image: '/src/assets/Resume3.png',
    styles: {
      header: {
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem 0',
        borderBottom: '2px solid #e5e7eb'
      },
      name: {
        fontSize: '2.25rem',
        fontWeight: '300',
        color: '#111827',
        marginBottom: '0.75rem',
        fontFamily: 'Georgia, serif'
      },
      title: {
        fontSize: '1.375rem',
        color: '#6b7280',
        marginBottom: '1.5rem',
        fontStyle: 'italic'
      },
      summary: {
        color: '#4b5563',
        lineHeight: '1.8',
        fontSize: '1rem',
        maxWidth: '600px',
        margin: '0 auto'
      },
      contactInfo: {
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '0.95rem',
        color: '#6b7280'
      },
      section: {
        marginBottom: '2rem'
      },
      sectionTitle: {
        fontSize: '1.375rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '1.25rem',
        borderBottom: '1px solid #d1d5db',
        paddingBottom: '0.5rem'
      },
      item: {
        marginBottom: '1.5rem',
        padding: '1rem 0'
      },
      itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
      },
      itemTitle: {
        fontWeight: '600',
        fontSize: '1.125rem',
        color: '#111827'
      },
      itemSubtitle: {
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem',
        fontSize: '1rem'
      },
      itemDates: {
        fontSize: '0.875rem',
        color: '#9ca3af',
        fontStyle: 'italic'
      },
      itemDescription: {
        fontSize: '0.9rem',
        color: '#4b5563',
        lineHeight: '1.7'
      },
      skillsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      },
      skillItem: {
        padding: '0.75rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.375rem',
        border: '1px solid #f3f4f6',
        borderLeft: '3px solid #8b5cf6',
        marginBottom: '0.5rem'
      },
      skillName: {
        fontWeight: '400',
        color: '#111827',
        fontSize: '0.95rem'
      }
    }
  }
]

export const getTemplateById = (id) => {
  return templates.find(template => template.id === id) || templates[0]
}

export const getDefaultTemplate = () => {
  return templates[0]
} 
