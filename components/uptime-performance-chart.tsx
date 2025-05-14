"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Performance {
  date: string
  uptime: number
}

interface UptimePerformanceChartProps {
  performance: Performance[]
  className?: string
}

export default function UptimePerformanceChart({ performance, className }: UptimePerformanceChartProps) {
  // Format data for the chart
  const chartData = performance.map((item) => ({
    date: item.date,
    uptime: item.uptime,
  }))

  return (
    <Card className={`bg-gray-900/60 border border-gray-800 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5 text-green-400"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Uptime Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 70%, 65%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(270, 70%, 65%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "rgba(255,255,255,0.7)" }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <YAxis
                domain={[95, 100]}
                tick={{ fill: "rgba(255,255,255,0.7)" }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 20, 60, 0.9)",
                  border: "1px solid rgba(168, 85, 247, 0.5)",
                  borderRadius: "4px",
                  color: "white",
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, "Uptime"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="uptime"
                stroke="hsl(270, 70%, 65%)"
                strokeWidth={3}
                fill="url(#uptimeGradient)"
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
