"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Server, BarChart, Code, Clock, Zap, ArrowRight } from "lucide-react"

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      title: "Secure Validation",
      description: "Enterprise-grade security measures to protect your assets and network integrity.",
      icon: Shield,
      url: "https://services.unitynodes.com/secure-validation",
    },
    {
      title: "High-Performance Nodes",
      description: "Optimized hardware and configurations for maximum performance and reliability.",
      icon: Server,
      url: "https://services.unitynodes.com/high-performance",
    },
    {
      title: "Real-time Monitoring",
      description: "24/7 monitoring and alerts to ensure continuous operation and quick issue resolution.",
      icon: BarChart,
      url: "https://services.unitynodes.com/monitoring",
    },
    {
      title: "Custom Solutions",
      description: "Tailored validation services to meet specific blockchain requirements and needs.",
      icon: Code,
      url: "https://services.unitynodes.com/custom-solutions",
    },
    {
      title: "99% Uptime Guarantee",
      description: "Redundant systems and failover mechanisms to maintain consistent uptime.",
      icon: Clock,
      url: "https://services.unitynodes.com/uptime-guarantee",
    },
    {
      title: "Fast Response Time",
      description: "Quick technical support and rapid issue resolution to minimize downtime.",
      icon: Zap,
      url: "https://services.unitynodes.com/support",
    },
  ]

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
    <section id="services" ref={sectionRef} className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unity Nodes provides comprehensive validation services to ensure the security, performance, and reliability
            of blockchain networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-200 h-full group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center mb-4 group-hover:bg-purple-700 transition-colors duration-200">
                    <service.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 gradient-text">{service.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                  <Button
                    variant="outline"
                    className="mt-auto border-purple-500/50 hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-200 w-full"
                    asChild
                  >
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
