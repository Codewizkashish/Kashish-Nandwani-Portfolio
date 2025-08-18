"use client"
import { useEffect, useState, useRef, useCallback } from "react"
import type React from "react"
import { motion, useMotionValue, useSpring, transform, animate } from "framer-motion"

interface StickyCursorProps {
  stickyElement?: React.RefObject<HTMLElement>
}

export default function StickyCursor({ stickyElement }: StickyCursorProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cursor = useRef<HTMLDivElement>(null)
  const cursorSize = isHovered ? 60 : 15

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  }

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x)
    if (cursor.current) {
      animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 })
    }
  }

  const manageMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e

      if (!stickyElement?.current) {
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
        return
      }

      const { left, top, height, width } = stickyElement.current.getBoundingClientRect()
      const center = { x: left + width / 2, y: top + height / 2 }

      if (isHovered) {
        const distance = { x: clientX - center.x, y: clientY - center.y }
        rotate(distance)

        const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y))
        const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3])
        const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8])
        scale.x.set(newScaleX)
        scale.y.set(newScaleY)

        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1)
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1)
      } else {
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
      }
    },
    [stickyElement, isHovered, cursorSize, mouse.x, mouse.y, scale.x, scale.y]
  )

  const manageMouseOver = () => setIsHovered(true)
  const manageMouseLeave = () => {
    setIsHovered(false)
    if (cursor.current) {
      animate(cursor.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 })
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove)

    if (stickyElement?.current) {
      const element = stickyElement.current
      element.addEventListener("mouseenter", manageMouseOver)
      element.addEventListener("mouseleave", manageMouseLeave)

      return () => {
        element.removeEventListener("mouseenter", manageMouseOver)
        element.removeEventListener("mouseleave", manageMouseLeave)
        window.removeEventListener("mousemove", manageMouseMove)
      }
    }

    return () => {
      window.removeEventListener("mousemove", manageMouseMove)
    }
  }, [manageMouseMove, stickyElement]) // ✅ fixed deps

  const template = ({
    rotate,
    scaleX,
    scaleY,
  }: { rotate?: string | number; scaleX?: string | number; scaleY?: string | number }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
  }

  return (
    <motion.div
      ref={cursor}
      className="fixed w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      transformTemplate={template}
      animate={{ width: cursorSize, height: cursorSize }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  )
}
