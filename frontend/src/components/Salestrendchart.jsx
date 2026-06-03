import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SalesTrendChart({ data = [], loading = false }) {
  const labels = data.map(d => d.date || d._id?.day || d.month || d.label || '')
  const values = data.map(d => d.salesCount || d.sales || d.count || d.value || 0)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: values,
        backgroundColor: 'rgba(52,211,153,0.25)',
        borderColor: '#34D399',
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
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
        bodyColor: '#34D399',
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255,255,255,0.35)', font: { family: 'DM Sans', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: 'rgba(255,255,255,0.35)', font: { family: 'DM Sans', size: 11 } },
        border: { display: false },
      },
    },
  }

  if (loading) return <div className="h-full w-full shimmer rounded-lg" />
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-white/30 text-sm font-body">
        No sales trend data available
      </div>
    )
  }

  return <Bar data={chartData} options={options} />
}