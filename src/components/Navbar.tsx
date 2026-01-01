import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress, useScrollNav } from '../hooks/useScroll'
import './Navbar.css'

export const Navbar: React.FC = () => {
  const progress = useScrollProgress()
  const isScrolled = useScrollNav()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      rotateX: -20,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div 
        className="progress-bar"
        style={{ scaleX: progress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ ease: 'easeOut' }}
      />

      {/* Navigation */}
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container">
          <motion.div 
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-cogs"></i> AutoForge
          </motion.div>

          {/* Desktop Menu */}
          <ul className="nav-links">
            <li>
              <motion.a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('services')
                }}
                whileHover={{ color: 'var(--accent-yellow)' }}
              >
                Services
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('features')
                }}
                whileHover={{ color: 'var(--accent-yellow)' }}
              >
                Why Us
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#process"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('process')
                }}
                whileHover={{ color: 'var(--accent-yellow)' }}
              >
                Process
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('portfolio')
                }}
                whileHover={{ color: 'var(--accent-yellow)' }}
              >
                Portfolio
              </motion.a>
            </li>
            <li>
              <motion.button
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Consultation
                <i className="fas fa-arrow-right"></i>
              </motion.button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('services')
                }}
                variants={itemVariants}
              >
                Services
              </motion.a>
              <motion.a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('features')
                }}
                variants={itemVariants}
              >
                Why Us
              </motion.a>
              <motion.a 
                href="#process"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('process')
                }}
                variants={itemVariants}
              >
                Process
              </motion.a>
              <motion.a 
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('portfolio')
                }}
                variants={itemVariants}
              >
                Portfolio
              </motion.a>
              <motion.button
                className="btn btn-primary mobile-cta"
                onClick={() => scrollToSection('contact')}
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
              >
                Get Consultation
                <i className="fas fa-arrow-right"></i>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
