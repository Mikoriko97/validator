"use client"

import { createClient } from "@supabase/supabase-js"

// Singleton pattern for browser Supabase client
let browserSupabaseClient: ReturnType<typeof createClient> | null = null

export function getBrowserSupabaseClient() {
  // Перевіряємо, чи ми в браузері
  if (typeof window === "undefined") {
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase credentials")
    return null
  }

  // Використовуємо існуючий клієнт, якщо він вже створений
  if (!browserSupabaseClient) {
    try {
      browserSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    } catch (error) {
      console.error("Error creating browser Supabase client:", error)
      return null
    }
  }

  return browserSupabaseClient
}
