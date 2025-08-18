"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Preloader from "@/components/preloader"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  useEffect(() => {
    if (!isLoading && showContent) {
      const initSmoothScrolling = async () => {
        const Lenis = (await import("@studio-freight/lenis")).default
        const lenis = new Lenis()

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
      }

      initSmoothScrolling()
    }
  }, [isLoading, showContent])

  const pageVariants = {
    initial: {
      y: "100vh",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        staggerChildren: 0.1,
      },
    },
  }

  const childVariants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className="min-h-screen"
          >
            <motion.div variants={childVariants}>
              <Navigation />
            </motion.div>
            <motion.div variants={childVariants}>
              <HeroSection />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
