"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserSupabaseClient } from "@/lib/supabase-browser"
import type { RealtimeChannel } from "@supabase/supabase-js"
import { AlertCircle, RefreshCw } from "lucide-react"

export function RealtimeUpdates() {
  const [hasUpdates, setHasUpdates] = useState(false)
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<string>("disconnected")
  const router = useRouter()

  useEffect(() => {
    const supabase = getBrowserSupabaseClient()
    if (!supabase) {
      console.error("No Supabase client available")
      return
    }

    // Subscribe to changes in the blog_posts table
    const channel = supabase
      .channel("blog-changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all events (insert, update, delete)
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("Real-time update received:", payload)
          setHasUpdates(true)
        },
      )
      .subscribe((status) => {
        console.log("Supabase real-time subscription status:", status)
        setConnectionStatus(status)
      })

    setSubscription(channel)

    // Cleanup function
    return () => {
      channel.unsubscribe()
    }
  }, [])

  const refreshContent = () => {
    // Refresh the current route
    router.refresh()
    setHasUpdates(false)
  }

  // Debug indicator - ONLY visible in development AND only when explicitly enabled
  // This ensures it's never shown to regular users
  const isDevelopment = process.env.NODE_ENV === "development"
  const isDebugEnabled = false // Set to true only when debugging is needed

  const debugElement =
    isDevelopment && isDebugEnabled ? (
      <div className="fixed top-20 right-6 z-50 bg-black/70 text-xs text-white p-2 rounded">
        Realtime: {connectionStatus}
      </div>
    ) : null

  return (
    <>
      {debugElement}
      {hasUpdates && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={refreshContent}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 animate-pulse"
          >
            <AlertCircle className="h-5 w-5" />
            <span>New content available</span>
            <RefreshCw className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </>
  )
}
