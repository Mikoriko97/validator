"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserSupabaseClient } from "@/lib/supabase-browser"
import type { RealtimeChannel } from "@supabase/supabase-js"
import { AlertCircle, RefreshCw } from "lucide-react"

type UpdateType = {
  type: "new" | "updated" | "deleted"
  count: number
}

export function BlogRealtimeUpdates() {
  const [updates, setUpdates] = useState<UpdateType | null>(null)
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = getBrowserSupabaseClient()
    if (!supabase) return

    // Track changes
    const newPosts: Record<string, boolean> = {}
    const updatedPosts: Record<string, boolean> = {}
    const deletedPosts: Record<string, boolean> = {}

    // Створюємо унікальне ім'я каналу для запобігання конфліктам
    const channelName = `blog-changes-${Math.random().toString(36).substring(2, 9)}`

    // Subscribe to changes in the blog_posts table
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("New post detected:", payload)
          const id = payload.new?.id
          if (id) newPosts[id] = true
          updateNotification()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("Post updated:", payload)
          const id = payload.new?.id
          if (id) updatedPosts[id] = true
          updateNotification()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          console.log("Post deleted:", payload)
          const id = payload.old?.id
          if (id) deletedPosts[id] = true
          updateNotification()
        },
      )
      .subscribe((status) => {
        console.log("Supabase real-time subscription status:", status)
        setStatus(status)

        // Видаляємо автоматичну спробу перепідписки, яка викликала помилку
      })

    setSubscription(channel)

    function updateNotification() {
      const newCount = Object.keys(newPosts).length
      const updatedCount = Object.keys(updatedPosts).length
      const deletedCount = Object.keys(deletedPosts).length

      if (newCount > 0) {
        setUpdates({ type: "new", count: newCount })
      } else if (updatedCount > 0) {
        setUpdates({ type: "updated", count: updatedCount })
      } else if (deletedCount > 0) {
        setUpdates({ type: "deleted", count: deletedCount })
      }
    }

    // Cleanup function - важливо правильно відписатися
    return () => {
      console.log("Unsubscribing from channel:", channelName)
      channel.unsubscribe()
    }
  }, [])

  const refreshContent = () => {
    // Refresh the current route
    router.refresh()
    setUpdates(null)
  }

  // Додаємо кнопку для ручного перепідключення при помилці
  const handleReconnect = () => {
    // Спочатку відписуємося від поточного каналу
    if (subscription) {
      subscription.unsubscribe()
    }

    // Перезавантажуємо компонент, щоб створити нову підписку
    router.refresh()
  }

  if (!updates && status !== "CHANNEL_ERROR") return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {status === "CHANNEL_ERROR" ? (
        <button
          onClick={handleReconnect}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          <AlertCircle className="h-5 w-5" />
          <span>Помилка підключення. Натисніть, щоб перепідключитися</span>
          <RefreshCw className="h-4 w-4 ml-1" />
        </button>
      ) : updates ? (
        <button
          onClick={refreshContent}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 animate-pulse"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{getMessage()}</span>
          <RefreshCw className="h-4 w-4 ml-1" />
        </button>
      ) : null}
    </div>
  )

  function getMessage() {
    if (!updates) return "Оновлення контенту"

    switch (updates.type) {
      case "new":
        return `${updates.count} new post${updates.count > 1 ? "s" : ""} available`
      case "updated":
        return `${updates.count} post${updates.count > 1 ? "s" : ""} updated`
      case "deleted":
        return `${updates.count} post${updates.count > 1 ? "s" : ""} removed`
      default:
        return "Content changes detected"
    }
  }
}
