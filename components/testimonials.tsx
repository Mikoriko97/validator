"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      quote:
        "Unity Nodes has been an exceptional validator for our blockchain. Their technical expertise and commitment to uptime have made them a trusted partner.",
      author: "Alex Chen",
      position: "CTO, BlockTech Solutions",
    },
    {
      quote:
        "We've been delegating to Unity Nodes for over a year now. Their consistent performance and transparent communication give us complete confidence.",
      author: "Maria Rodriguez",
      position: "Lead Developer, Crypto Innovations",
    },
    {
      quote:
        "The team at Unity Nodes goes above and beyond in their support. They're not just validators; they're active contributors to the ecosystem.",
      author: "David Kim",
      position: "Blockchain Architect, DeFi Protocol",
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
    <section id="testimonials" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from projects and delegators who trust Unity Nodes with their validation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-purple-500 mb-4" />
                  <p className="text-gray-300 flex-grow mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
