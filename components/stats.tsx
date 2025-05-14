"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Clock, Users, Network } from "lucide-react"

// Custom hook for animating numbers
const useCountAnimation = (end: number, isVisible: boolean, duration = 4000, start = 0) => {
  const [count, setCount] = useState(start)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) {
      setCount(0)
      return
    }

    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Use easeOutExpo for smoother animation near the end
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)

      setCount(Math.floor(start + (end - start) * easeOutExpo))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [end, duration, start, isVisible])

  return count
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      title: "Total Staked",
      value: 2175485,
      prefix: "$",
      icon: DollarSign,
      description: "Assets secured across networks",
    },
    {
      title: "Uptime",
      value: 100,
      suffix: "%",
      icon: Clock,
      description: "Reliable node operation",
    },
    {
      title: "Delegators",
      value: 52,
      suffix: "+",
      icon: Users,
      description: "Trusted by many",
    },
    {
      title: "Networks",
      value: 11,
      suffix: "+",
      icon: Network,
      description: "Diverse blockchain support",
    },
  ]

  // Create animated counters for each stat
  const animatedStats = stats.map((stat) => {
    return {
      ...stat,
      animatedValue: useCountAnimation(stat.value, isVisible, 4000, 0),
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {animatedStats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-medium text-gray-300">{stat.title}</div>
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center group-hover:bg-purple-700 transition-colors duration-300">
                      <stat.icon className="h-5 w-5 text-purple-300" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2 neon-text">
                    {stat.prefix || ""}
                    {stat.animatedValue}
                    {stat.suffix || ""}
                  </div>
                  <p className="text-gray-400">{stat.description}</p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
