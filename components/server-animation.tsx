"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useDeviceType } from "@/hooks/use-device-type"
import { useTouchDevice } from "@/hooks/use-touch-device"

export default function ServerAnimation() {
  const [isHovered, setIsHovered] = useState(false)
  const [blinkingLights, setBlinkingLights] = useState<Record<string, boolean>>({})
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; path: string; duration: number; delay: number }>>(
    [],
  )
  const packetIdRef = useRef(0)
  const deviceType = useDeviceType()
  const isTouchDevice = useTouchDevice()

  // Simplify animation for mobile devices
  const isMobile = deviceType === "mobile"
  const shouldSimplify = isMobile || isTouchDevice

  // Initialize blinking lights
  useEffect(() => {
    const initialLights: Record<string, boolean> = {}
    for (let i = 0; i < 24; i++) {
      initialLights[`light-${i}`] = Math.random() > 0.5
    }
    setBlinkingLights(initialLights)

    // Blink the lights randomly
    const interval = setInterval(() => {
      setBlinkingLights((prev) => {
        const newLights = { ...prev }
        const randomLight = `light-${Math.floor(Math.random() * 24)}`
        newLights[randomLight] = !newLights[randomLight]
        return newLights
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Generate data packets
  useEffect(() => {
    // Reduce number of packets for mobile
    const packetInterval = shouldSimplify ? 500 : 300

    const generatePacket = () => {
      const paths = [
        "M 180,120 C 220,120 260,80 300,80",
        "M 180,160 C 240,160 260,200 320,200",
        "M 180,200 C 230,200 250,240 290,240",
        "M 180,240 C 220,240 240,280 280,280",
        "M 180,280 C 250,280 270,320 330,320",
      ]

      const randomPath = paths[Math.floor(Math.random() * paths.length)]
      const duration = 1 + Math.random() * 2
      const delay = Math.random() * 0.5

      setDataPackets((prev) => [
        ...prev,
        {
          id: packetIdRef.current++,
          path: randomPath,
          duration,
          delay,
        },
      ])

      // Remove old packets to prevent memory issues
      if (packetIdRef.current > 100) {
        setDataPackets((prev) => prev.slice(-20))
      }
    }

    const interval = setInterval(generatePacket, packetInterval)
    return () => clearInterval(interval)
  }, [shouldSimplify])

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 500 400"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        style={{ filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))" }}
      >
        {/* Background grid */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse" className="text-purple-900/20">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Server rack outer case */}
        <motion.rect
          x="60"
          y="40"
          width="140"
          height="320"
          rx="2"
          fill="#1a1a2e"
          stroke="#a855f7"
          strokeWidth="1.5"
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: [0.8, 0.9, 0.8],
            filter: ["drop-shadow(0 0 3px #a855f7)", "drop-shadow(0 0 8px #a855f7)", "drop-shadow(0 0 3px #a855f7)"],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Rack mount holes */}
        {Array.from({ length: shouldSimplify ? 8 : 16 }).map((_, i) => (
          <g key={`mount-${i}`}>
            <circle cx="70" cy={60 + i * (shouldSimplify ? 40 : 20)} r="2" fill="#4b5563" />
            <circle cx="190" cy={60 + i * (shouldSimplify ? 40 : 20)} r="2" fill="#4b5563" />
          </g>
        ))}

        {/* Server units */}
        {Array.from({ length: shouldSimplify ? 4 : 8 }).map((_, i) => (
          <g key={`server-${i}`}>
            <motion.rect
              x="75"
              y={60 + i * (shouldSimplify ? 70 : 35)}
              width="110"
              height="25"
              rx="1"
              fill="#111827"
              stroke={isHovered && i === (shouldSimplify ? 1 : 3) ? "#ec4899" : "#6d28d9"}
              strokeWidth="1"
              initial={{ strokeWidth: 1 }}
              animate={{
                strokeWidth: isHovered && i === (shouldSimplify ? 1 : 3) ? [1, 2, 1] : 1,
                filter:
                  isHovered && i === (shouldSimplify ? 1 : 3)
                    ? ["drop-shadow(0 0 1px #ec4899)", "drop-shadow(0 0 4px #ec4899)", "drop-shadow(0 0 1px #ec4899)"]
                    : "none",
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Server front panel details */}
            <rect x="80" y={65 + i * (shouldSimplify ? 70 : 35)} width="100" height="15" rx="1" fill="#1f2937" />

            {/* Status LEDs */}
            <circle
              cx="85"
              cy={72.5 + i * (shouldSimplify ? 70 : 35)}
              r="2"
              fill={blinkingLights[`light-${i * 3}`] ? "#22c55e" : "#15803d"}
            >
              <animate
                attributeName="opacity"
                values="1;0.7;1"
                dur={`${1 + Math.random() * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="95"
              cy={72.5 + i * (shouldSimplify ? 70 : 35)}
              r="2"
              fill={blinkingLights[`light-${i * 3 + 1}`] ? "#ef4444" : "#b91c1c"}
            >
              <animate
                attributeName="opacity"
                values="1;0.7;1"
                dur={`${1 + Math.random() * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="105"
              cy={72.5 + i * (shouldSimplify ? 70 : 35)}
              r="2"
              fill={blinkingLights[`light-${i * 3 + 2}`] ? "#3b82f6" : "#1d4ed8"}
            >
              <animate
                attributeName="opacity"
                values="1;0.6;1"
                dur={`${1 + Math.random() * 2}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Drive bays */}
            {Array.from({ length: shouldSimplify ? 2 : 4 }).map((_, j) => (
              <g key={`drive-${i}-${j}`}>
                <rect
                  x={120 + j * (shouldSimplify ? 26 : 13)}
                  y={67 + i * (shouldSimplify ? 70 : 35)}
                  width="10"
                  height="10"
                  rx="1"
                  fill="#374151"
                  stroke="#4b5563"
                  strokeWidth="0.5"
                />
                <motion.rect
                  x={122 + j * (shouldSimplify ? 26 : 13)}
                  y={72 + i * (shouldSimplify ? 70 : 35)}
                  width="6"
                  height="1"
                  fill={blinkingLights[`light-${i * 3 + j}`] ? "#a855f7" : "#6d28d9"}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Number.POSITIVE_INFINITY }}
                />
              </g>
            ))}
          </g>
        ))}

        {/* Server rack front handle */}
        <rect x="65" y="30" width="130" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
        <rect x="65" y="360" width="130" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />

        {/* Network connections */}
        <g className="network-connections">
          {/* Connection ports */}
          {Array.from({ length: shouldSimplify ? 3 : 6 }).map((_, i) => (
            <g key={`port-${i}`}>
              <rect
                x="180"
                y={80 + i * (shouldSimplify ? 80 : 40)}
                width="10"
                height="10"
                fill="#1f2937"
                stroke="#6d28d9"
                strokeWidth="1"
              />
              <motion.circle
                cx="185"
                cy={85 + i * (shouldSimplify ? 80 : 40)}
                r="2"
                fill="#a855f7"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  fill: ["#a855f7", "#d946ef", "#a855f7"],
                }}
                transition={{ duration: 2 + i * 0.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </g>
          ))}

          {/* Data packets animation */}
          {!shouldSimplify &&
            dataPackets.map((packet) => (
              <motion.circle
                key={packet.id}
                cx="0"
                cy="0"
                r="3"
                fill="#d946ef"
                filter="drop-shadow(0 0 2px #d946ef)"
                initial={{ pathOffset: 0, opacity: 0 }}
                animate={{
                  pathOffset: 1,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: packet.duration,
                  delay: packet.delay,
                  ease: "linear",
                  times: [0, 0.1, 1],
                }}
                onAnimationComplete={() => {
                  setDataPackets((prev) => prev.filter((p) => p.id !== packet.id))
                }}
              >
                <animateMotion
                  dur={`${packet.duration}s`}
                  begin={`${packet.delay}s`}
                  fill="freeze"
                  path={packet.path}
                />
              </motion.circle>
            ))}
        </g>

        {/* Connection lines */}
        <path
          d="M 190,85 C 230,85 250,120 300,120"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
          strokeOpacity="0.6"
        />
        <path
          d="M 190,125 C 240,125 260,160 320,160"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
          strokeOpacity="0.6"
        />
        <path
          d="M 190,165 C 230,165 250,200 290,200"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
          strokeOpacity="0.6"
        />
        {!shouldSimplify && (
          <>
            <path
              d="M 190,205 C 220,205 240,240 280,240"
              stroke="#a855f7"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 2"
              strokeOpacity="0.6"
            />
            <path
              d="M 190,245 C 250,245 270,280 330,280"
              stroke="#a855f7"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 2"
              strokeOpacity="0.6"
            />
          </>
        )}

        {/* Cloud/Network elements */}
        <g transform="translate(300, 120)">
          <motion.path
            d="M 0,0 C 10,-15 30,-15 40,0 C 55,-5 70,5 65,20 C 75,25 75,45 65,50 C 70,65 55,75 40,70 C 30,85 10,85 0,70 C -15,75 -30,65 -25,50 C -35,45 -35,25 -25,20 C -30,5 -15,-5 0,0 Z"
            fill="#1a1a2e"
            stroke="#a855f7"
            strokeWidth="1.5"
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: [0.8, 0.9, 0.8],
              filter: ["drop-shadow(0 0 2px #a855f7)", "drop-shadow(0 0 5px #a855f7)", "drop-shadow(0 0 2px #a855f7)"],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <text x="20" y="35" fontFamily="monospace" fontSize="12" fill="#d946ef" textAnchor="middle">
            API
          </text>
          {/* Blinking dots */}
          {Array.from({ length: shouldSimplify ? 3 : 5 }).map((_, i) => (
            <motion.circle
              key={`cloud-light-${i}`}
              cx={-15 + i * 15}
              cy="35"
              r="2"
              fill="#a855f7"
              animate={{
                opacity: [0.4, 1, 0.4],
                fill: ["#a855f7", "#d946ef", "#a855f7"],
              }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </g>

        <g transform="translate(320, 200)">
          <motion.rect
            x="-30"
            y="-20"
            width="60"
            height="40"
            rx="5"
            fill="#1a1a2e"
            stroke="#a855f7"
            strokeWidth="1.5"
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: [0.8, 0.9, 0.8],
              filter: ["drop-shadow(0 0 2px #a855f7)", "drop-shadow(0 0 5px #a855f7)", "drop-shadow(0 0 2px #a855f7)"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <text x="0" y="5" fontFamily="monospace" fontSize="10" fill="#d946ef" textAnchor="middle">
            RPC/gRPC
          </text>
          {/* Blinking lights */}
          {Array.from({ length: shouldSimplify ? 2 : 4 }).map((_, i) => (
            <motion.circle
              key={`router-light-${i}`}
              cx={-15 + i * (shouldSimplify ? 20 : 10)}
              cy="15"
              r="2"
              fill={blinkingLights[`light-${i + 16}`] ? "#22c55e" : "#15803d"}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 1 + Math.random(), repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </g>

        {!shouldSimplify && (
          <g transform="translate(290, 280)">
            <motion.path
              d="M -20,-15 L 20,-15 L 30,0 L 20,15 L -20,15 L -30,0 Z"
              fill="#1a1a2e"
              stroke="#a855f7"
              strokeWidth="1.5"
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: [0.8, 0.9, 0.8],
                filter: [
                  "drop-shadow(0 0 2px #a855f7)",
                  "drop-shadow(0 0 5px #a855f7)",
                  "drop-shadow(0 0 2px #a855f7)",
                ],
              }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <text x="0" y="5" fontFamily="monospace" fontSize="10" fill="#d946ef" textAnchor="middle">
              Network
            </text>
            {/* Blinking lights */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={`switch-light-${i}`}
                cx={-15 + i * 8}
                cy="-5"
                r="1.5"
                fill={blinkingLights[`light-${i + 20}`] ? "#3b82f6" : "#1d4ed8"}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 1 + Math.random(), repeat: Number.POSITIVE_INFINITY }}
              />
            ))}
          </g>
        )}

        {/* Floating particles */}
        {Array.from({ length: shouldSimplify ? 8 : 15 }).map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={250 + Math.random() * 150}
            cy={50 + Math.random() * 300}
            r={0.5 + Math.random() * 1.5}
            fill="#a855f7"
            initial={{ opacity: 0.3 }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Glow effects */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hover interaction area */}
        <motion.rect
          x="60"
          y="40"
          width="140"
          height="320"
          fill="transparent"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 0.1,
            fill: "#a855f7",
          }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  )
}
