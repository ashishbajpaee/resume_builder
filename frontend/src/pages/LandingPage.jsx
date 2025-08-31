import React, { useContext, useState } from 'react'
import { LayoutTemplate, Menu, X } from 'lucide-react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { landingPageStyles as s } from '../assets/dummyStyle'
import Resume1 from '../assets/Resume1.png'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerContainer}>
          {/* Logo */}
          <div className={s.logoContainer}>
            <div className={s.logoIcon}>
              <LayoutTemplate className={s.logoIconInner} />
            </div>
            <span className={s.logoText}>ResumeXpert</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={s.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className={s.mobileMenuIcon} />
            ) : (
              <Menu size={24} className={s.mobileMenuIcon} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={s.mobileMenu}>
            <div className={s.mobileMenuContainer}>
              <div className={s.mobileUserInfo}>
                <div className={s.mobileUserWelcome}>
                  {user?.name ? `Welcome, ${user.name}` : 'Welcome'}
                </div>
                <button className={s.mobileAuthButton} onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className={s.main}>
        {/* Hero Section */}
        <section className={s.heroSection}>
          <div className={s.heroGrid}>
            {/* Left Content */}
            <div className={s.heroLeft}>
              <span className={s.tagline}>Professional Resume Builder</span>

              <h1 className={s.heading}>
                <span className={s.headingText}>Craft</span>
                <span className={s.headingGradient}>Professional Resumes</span>
              </h1>

              <p className={s.description}>
                Create job‑winning resumes with expertly designed templates.
                ATS‑friendly, recruiter‑approved, and tailored to your career goals.
              </p>

              <div className={s.ctaButtons}>
                <button className={s.primaryButton} onClick={() => navigate('/dashboard')}>
                  <span className={s.primaryButtonOverlay}></span>
                  <span className={s.primaryButtonContent}>Start Building</span>
                </button>
                <button className={s.secondaryButton} onClick={() => navigate('/templates')}>
                  View Templates
                </button>
              </div>

              <div className={s.statsContainer}>
                <div className={s.statItem}>
                  <p className={`${s.statNumber} from-violet-600 to-fuchsia-600`}>50K+</p>
                  <p className={s.statLabel}>Resumes Created</p>
                </div>
                <div className={s.statItem}>
                  <p className={`${s.statNumber} from-yellow-500 to-orange-500`}>4.9★</p>
                  <p className={s.statLabel}>User Rating</p>
                </div>
                <div className={s.statItem}>
                  <p className={`${s.statNumber} from-emerald-500 to-green-600`}>5 Min</p>
                  <p className={s.statLabel}>Build Time</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className={s.heroIllustration}>
              <div className={s.heroIllustrationBg}></div>
              <div className={s.heroIllustrationContainer}>
                <img src={Resume1} alt="Resume preview" className="w-full h-auto rounded-2xl shadow-xl border border-gray-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={s.featuresSection}>
          <div className={s.featuresContainer}>
            <div className={s.featuresHeader}>
              <h2 className={s.featuresTitle}>
                Everything you need to build a <span className={s.featuresTitleGradient}>standout resume</span>
              </h2>
              <p className={s.featuresDescription}>
                Simple, fast, and modern tools focused on what matters: showcasing your skills and experience.
              </p>
            </div>

            <div className={s.featuresGrid}>
              {/* Feature 1 */}
              <div className={s.featureCard}>
                <div className={s.featureCardHover}></div>
                <div className={`${s.featureCardContent} ${s.featureCardViolet}`}>
                  <div className={`${s.featureIconContainer} ${s.featureIconViolet}`}>
                    <LayoutTemplate className={s.featureIcon} />
                  </div>
                  <h3 className={s.featureTitle}>Beautiful Templates</h3>
                  <p className={s.featureDescription}>Craft professional resumes with pixel‑perfect, ATS‑friendly templates.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className={s.featureCard}>
                <div className={s.featureCardHover}></div>
                <div className={`${s.featureCardContent} ${s.featureCardFuchsia}`}>
                  <div className={`${s.featureIconContainer} ${s.featureIconFuchsia}`}>
                    <LayoutTemplate className={s.featureIcon} />
                  </div>
                  <h3 className={s.featureTitle}>Real‑time Preview</h3>
                  <p className={s.featureDescription}>See changes instantly as you edit your information and sections.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className={s.featureCard}>
                <div className={s.featureCardHover}></div>
                <div className={`${s.featureCardContent} ${s.featureCardOrange}`}>
                  <div className={`${s.featureIconContainer} ${s.featureIconOrange}`}>
                    <LayoutTemplate className={s.featureIcon} />
                  </div>
                  <h3 className={s.featureTitle}>One‑click Export</h3>
                  <p className={s.featureDescription}>Download polished PDFs optimized for recruiter screening.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={s.ctaSection}>
          <div className={s.ctaContainer}>
            <div className={s.ctaCard}>
              <div className={s.ctaCardBg}></div>
              <div className={s.ctaCardContent}>
                <h3 className={s.ctaTitle}>Ready to build your next opportunity?</h3>
                <p className={s.ctaDescription}>Get started for free. No signup required to try templates.</p>
                <button className={s.ctaButton} onClick={() => navigate('/dashboard')}>
                  <span className={s.ctaButtonOverlay}></span>
                  <span className={s.ctaButtonText}>Start Building</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.footerContainer}>
          <p className={s.footerText}>
            Built with <span className={s.footerHeart}>♥</span> to help you land your dream job.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
