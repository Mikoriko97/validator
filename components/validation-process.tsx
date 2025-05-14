"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Clock, Server, FileText, Globe, Bot, Camera, Users, UserCheck, ArrowRight } from "lucide-react"
import { useInView } from "framer-motion"
import { useDeviceType } from "@/hooks/use-device-type"
import { useTouchDevice } from "@/hooks/use-touch-device"
import { Button } from "@/components/ui/button"

export default function ValidationProcess() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const deviceType = useDeviceType()
  const isTouchDevice = useTouchDevice()

  // Simplify for mobile
  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"

  const steps = [
    {
      title: "SERVICE",
      description: "A service where you can find installation guides and a lot of information about projects",
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
      url: "https://services.unitynodes.com/",
    },
    {
      title: "EXPLORER",
      description: "In our explorer, you can check from a transaction to a proposal and info validator",
      icon: Globe,
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/20",
      borderColor: "border-indigo-500/30",
      url: "https://explorer.unitynodes.com/",
    },
    {
      title: "GOVERNANCE BOT",
      description: "Telegram bot, Governance bot in which you can track proposals for voting",
      icon: Bot,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
      url: "https://t.me/governance_unity_bot",
    },
    {
      title: "SNAPSHOTS",
      description: "Our snapshot service provided on the testnet and mainnet",
      icon: Camera,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-900/20",
      borderColor: "border-fuchsia-500/30",
      url: "https://services.unitynodes.com/snapshots",
    },
    {
      title: "MEETUPS",
      description:
        "Meetings are where we create an unforgettable experience for your project that helps strengthen the local community and merchandise",
      icon: Users,
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-500/30",
      url: "https://services.unitynodes.com/meetups",
    },
    {
      title: "PROJECT MANAGMENT",
      description: "Guides in which we actively participate, manual or automatic installation",
      icon: UserCheck,
      color: "text-rose-400",
      bgColor: "bg-rose-900/20",
      borderColor: "border-rose-500/30",
      url: "https://services.unitynodes.com/ambassador",
    },
  ]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      if (isAutoPlaying) {
        const interval = setInterval(() => {
          setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
        }, 3000)
        return () => clearInterval(interval)
      }
    } else {
      controls.start("hidden")
    }
  }, [isInView, isAutoPlaying, controls, steps.length])

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setIsAutoPlaying(false)
  }

  const handleResumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  return (
    <section className="py-20 relative" ref={containerRef}>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We are not only professionally engaged in launching and supporting blockchain nodes, but also professionals
            in providing a full range of services for projects with their subsequent support as responsible partners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Visualization - Only show on tablet and desktop */}
          {!isMobile && (
            <motion.div
              className="relative h-[400px] md:h-[500px] order-2 lg:order-1"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0">
                {/* Central node */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(168, 85, 247, 0.4)",
                        "0 0 20px rgba(168, 85, 247, 0.6)",
                        "0 0 0 rgba(168, 85, 247, 0.4)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Server className="w-10 h-10 text-purple-400" />
                  </motion.div>
                </div>

                {/* Orbiting elements */}
                {steps.map((step, index) => {
                  const angle = (index * (2 * Math.PI)) / steps.length
                  const radius = isTablet ? 120 : 150
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <motion.div
                      key={index}
                      className={`absolute top-1/2 left-1/2 w-16 h-16 rounded-full ${step.bgColor} border ${
                        currentStep === index ? "border-white" : step.borderColor
                      } flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        currentStep === index ? "scale-125 z-10" : "scale-100 z-0"
                      }`}
                      style={{
                        x: x,
                        y: y,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => handleStepClick(index)}
                      animate={{
                        boxShadow:
                          currentStep === index
                            ? [
                                "0 0 0 rgba(168, 85, 247, 0.4)",
                                "0 0 20px rgba(168, 85, 247, 0.6)",
                                "0 0 0 rgba(168, 85, 247, 0.4)",
                              ]
                            : "none",
                      }}
                      transition={{ duration: 2, repeat: currentStep === index ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {React.createElement(step.icon, { className: `w-6 h-6 ${step.color}` })}

                      {/* Connection line */}
                      <motion.div
                        className={`absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-purple-500/80 to-transparent ${
                          currentStep === index ? "opacity-100" : "opacity-30"
                        }`}
                        style={{
                          width: radius,
                          transformOrigin: "left center",
                          rotate: angle * (180 / Math.PI) + 180,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentStep === index ? [0, 1, 1, 0] : 1 }}
                        transition={{
                          duration: 2,
                          repeat: currentStep === index ? Number.POSITIVE_INFINITY : 0,
                          repeatType: "loop",
                          times: currentStep === index ? [0, 0.3, 0.7, 1] : [0, 1],
                        }}
                      />

                      {/* Data packet animation */}
                      {currentStep === index && (
                        <motion.div
                          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                          initial={{ x: 0, y: 0 }}
                          animate={{ x: -x, y: -y }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.div>
                  )
                })}

                {/* Animated particles */}
                {Array.from({ length: isTablet ? 10 : 20 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-purple-400"
                    initial={{
                      x: Math.random() * 400 - 200 + 200,
                      y: Math.random() * 400 - 200 + 200,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.random() * 400 - 200 + 200,
                      y: Math.random() * 400 - 200 + 200,
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step Description */}
          <div className={`order-1 ${isMobile ? "col-span-1" : "lg:order-2"}`}>
            <motion.div
              className="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full ${steps[currentStep].bgColor} flex items-center justify-center`}
                    >
                      {React.createElement(steps[currentStep].icon, {
                        className: `w-6 h-6 ${steps[currentStep].color}`,
                      })}
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">{steps[currentStep].title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{steps[currentStep].description}</p>

                  <Button
                    variant="outline"
                    className={`mt-4 border-${steps[currentStep].color.replace("text-", "")} hover:bg-${steps[currentStep].bgColor.replace("bg-", "")} transition-all duration-200 w-full`}
                    asChild
                  >
                    <a
                      href={steps[currentStep].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Visit {steps[currentStep].title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <div className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Step {currentStep + 1} of {steps.length}
                      </div>
                      {!isAutoPlaying && (
                        <button
                          onClick={handleResumeAutoPlay}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                        >
                          <Clock className="w-4 h-4" />
                          <span>Auto-play</span>
                        </button>
                      )}
                    </div>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                        initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentStep === index ? "bg-purple-500 scale-125" : "bg-gray-700"
                        }`}
                        onClick={() => handleStepClick(index)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
