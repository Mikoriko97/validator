import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import { fetchNetworkStats } from "@/lib/db-service"

export default async function HomePage() {
  // Отримуємо статистику мережі для початкового рендерингу
  let networkStats = null
  try {
    console.log("HomePage: Fetching network stats...")
    networkStats = await fetchNetworkStats()
    console.log("HomePage: Network stats fetched successfully:", networkStats)
  } catch (error) {
    console.error("HomePage: Error fetching network stats:", error)
    // Використовуємо null при помилці, компонент Hero використає моковані дані
    networkStats = null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <Hero networkStats={networkStats} />
      <Footer />
    </main>
  )
}
