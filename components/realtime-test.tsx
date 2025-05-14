"use client"

import { useState } from "react"
import { getBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"

export function RealtimeTest() {
  const [status, setStatus] = useState<string>("Ready")
  const [error, setError] = useState<string | null>(null)

  const testRealtime = async () => {
    try {
      setStatus("Testing...")
      setError(null)

      const supabase = getBrowserSupabaseClient()
      if (!supabase) {
        throw new Error("No Supabase client available")
      }

      // Get a random post to update
      const { data: posts, error: fetchError } = await supabase.from("blog_posts").select("id, title").limit(1)

      if (fetchError) throw fetchError
      if (!posts || posts.length === 0) throw new Error("No posts found to test with")

      const post = posts[0]

      // Update the post with a timestamp to trigger realtime
      const timestamp = new Date().toISOString()
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update({ updated_at: timestamp })
        .eq("id", post.id)

      if (updateError) throw updateError

      setStatus(`Test successful! Updated post: ${post.title}`)
    } catch (err: any) {
      console.error("Realtime test error:", err)
      setError(err.message || "Unknown error")
      setStatus("Test failed")
    }
  }

  return (
    <div className="p-4 bg-black/30 rounded-lg border border-purple-500/30 mb-6">
      <h3 className="text-lg font-medium mb-2">Realtime Functionality Test</h3>
      <p className="text-sm text-gray-300 mb-4">
        Click the button below to test if realtime updates are working correctly. This will make a small update to a
        post to trigger the realtime notification.
      </p>

      <div className="flex items-center gap-4">
        <Button onClick={testRealtime} variant="outline">
          Test Realtime Updates
        </Button>
        <span className="text-sm">
          Status: <span className={error ? "text-red-400" : "text-green-400"}>{status}</span>
        </span>
      </div>

      {error && <p className="mt-2 text-sm text-red-400">Error: {error}</p>}
    </div>
  )
}
