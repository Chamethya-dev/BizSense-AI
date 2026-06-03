import { useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function RevenueChart({ data = [], loading = false }) {
  const labels = data.map(d => d.month || d.label || '')
  const values = data.map(d => d.revenue || d.value || 0)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: values,
        borderColor: '#6EE7FF',
        backgroundColor: 'rgba(110,231,255,0.08)',
        borderWidth: 2,
        pointBackgroundColor: '#6EE7FF',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E2130',
        borderColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.5)',
        bodyColor: '#6EE7FF',
        padding: 12,
        callbacks: {
          label: ctx => ` $${ctx.parsed.y?.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: 'rgba(255,255,255,0.35)', font: { family: 'DM Sans', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font: { family: 'DM Sans', size: 11 },
          callback: val => `$${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`,
        },
        border: { display: false },
      },
    },
  }

  if (loading) {
    return <div className="h-full w-full shimmer rounded-lg" />
  }

  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-white/30 text-sm font-body">
        No revenue data available
      </div>
    )
  }

  return <Line data={chartData} options={options} />
}