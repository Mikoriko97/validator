"use client"

import { useState, useEffect } from "react"

export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore
          navigator.msMaxTouchPoints > 0,
      )
    }

    checkTouch()
  }, [])

  return isTouchDevice
}
