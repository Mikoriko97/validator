"use client"

import { useEffect, useState, useRef } from "react"
import { getBrowserSupabaseClient } from "@/lib/supabase-browser"
import type { RealtimeChannel } from "@supabase/supabase-js"

type SubscriptionOptions = {
  table: string
  schema?: string
  event?: "INSERT" | "UPDATE" | "DELETE" | "*"
  filter?: string
}

export function useRealtimeSubscription(options: SubscriptionOptions, callback: (payload: any) => void) {
  const [status, setStatus] = useState<"SUBSCRIBED" | "TIMED_OUT" | "CLOSED" | "CHANNEL_ERROR" | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const optionsRef = useRef(options)

  // Оновлюємо optionsRef при зміні options
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const supabase = getBrowserSupabaseClient()
    if (!supabase) return

    const { table, schema = "public", event = "*", filter } = optionsRef.current

    // Create a unique channel name
    const channelName = `${table}-${event}-${Math.random().toString(36).substring(2, 9)}`

    // Subscribe to changes
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event,
          schema,
          table,
          filter,
        },
        (payload) => {
          callback(payload)
        },
      )
      .subscribe((status) => {
        console.log(`Subscription status for ${channelName}:`, status)
        setStatus(status)
      })

    // Зберігаємо канал у ref для доступу в cleanup
    channelRef.current = channel

    // Cleanup function
    return () => {
      console.log(`Unsubscribing from ${channelName}`)
      if (channelRef.current) {
        channelRef.current.unsubscribe()
        channelRef.current = null
      }
    }
  }, [callback]) // Залежність тільки від callback, щоб уникнути повторних підписок

  // Функція для ручного перепідключення
  const reconnect = () => {
    if (channelRef.current) {
      // Спочатку відписуємося
      channelRef.current.unsubscribe()

      // Потім підписуємося знову
      channelRef.current.subscribe((status) => {
        console.log("Resubscription status:", status)
        setStatus(status)
      })
    }
  }

  return { status, reconnect }
}
