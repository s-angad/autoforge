import React from 'react'
import { motion } from 'framer-motion'
import { useScrollY } from '../hooks/useScroll'
import './Hero.css'

export const Hero: React.FC = () => {
  const scrollY = useScrollY()

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480
  const fadeStartDistance = 600 // Start fade after scrolling this far
  const fadeEndDistance = 900 // Complete fade after scrolling this far
  
  // Calculate fade intensity based on scroll distance
  const fadeIntensity = Math.max(0, Math.min(1, (scrollY - fadeStartDistance) / (fadeEndDistance - fadeStartDistance)))
  const heroOpacity = 1 - fadeIntensity

  const titleVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 + index * 0.15,
        ease: 'easeOut'
      }
    })
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 4.5,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -45 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: 0.6 + index * 0.1,
        ease: 'easeOut'
      }
    }),
    hover: {
      scale: 1.08,
      rotateY: 8,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <section className="hero" id="hero">
      {/* Animated Background */}
      <motion.div 
        className="hero-bg"
        style={{ 
          y: scrollY * 0.5,
          opacity: Math.max(1 - scrollY / 800, 0)
        }}
      >
        <motion.div
          className="gradient-blur gradient-blur-1"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="gradient-blur gradient-blur-2"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="hero-content"
        style={{ 
          opacity: heroOpacity,
          perspective: '1000px',
          rotateX: fadeIntensity * -5
        }}
      >
        <motion.div className="hero-text">
          <h1 className="hero-title">
            {['Engineering', 'Intelligent', 'Automation'].map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="title-word"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero-subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            AI-powered systems, automation, and modern digital solutions for growing businesses.
          </motion.p>

          <motion.div
            className="hero-ctas"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get a Free Consultation
              <i className="fas fa-arrow-right"></i>
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Our Services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Cards */}
        <motion.div className="hero-visual">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="floating-card"
              style={{
                right: `${index * 120}px`,
                top: `${index * 100}px`,
              }}
              variants={floatingVariants}
              animate="animate"
              custom={index}
            >
              <div className="card-inner">
                {index === 0 && <i className="fas fa-robot"></i>}
                {index === 1 && <i className="fas fa-cogs"></i>}
                {index === 2 && <i className="fas fa-bolt"></i>}
                <p>
                  {index === 0 && 'AI Automation'}
                  {index === 1 && 'Custom Solutions'}
                  {index === 2 && 'Enterprise Grade'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div className="hero-stats">
        {[
          { label: '50+', desc: 'Projects Delivered' },
          { label: '30+', desc: 'Enterprise Clients' },
          { label: '10+', desc: 'Years Experience' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <h3>{stat.label}</h3>
            <p>{stat.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <i className="fas fa-chevron-down"></i>
      </motion.div>
    </section>
  )
}
