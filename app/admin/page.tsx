import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RealtimeTest } from "@/components/realtime-test"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="w-4/5 mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Tools</h1>

            <Suspense fallback={<div>Loading...</div>}>
              <RealtimeTest />
            </Suspense>

            <div className="bg-black/30 rounded-lg border border-purple-500/30 p-6">
              <h2 className="text-xl font-semibold mb-4">Content Management</h2>
              <p className="text-gray-300 mb-4">
                This is a placeholder for admin tools. In a real application, you would have content management features
                here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
