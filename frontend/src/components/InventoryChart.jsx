import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PALETTE = ['#6EE7FF', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#FB923C', '#38BDF8', '#4ADE80']

export default function InventoryChart({ data = [], loading = false }) {
  const labels = data.map(d => d.category || d._id || d.name || d.label || '')
  const values = data.map(d => d.totalValue || d.value || d.count || d.total || 0)

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: PALETTE.slice(0, values.length).map(c => c + '33'),
        borderColor: PALETTE.slice(0, values.length),
        borderWidth: 1.5,
        hoverOffset: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.5)',
          font: { family: 'DM Sans', size: 11 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1E2130',
        borderColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.5)',
        bodyColor: '#fff',
        padding: 12,
      },
    },
  }

  if (loading) return <div className="h-full w-full shimmer rounded-lg" />
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-white/30 text-sm font-body">
        No inventory data available
      </div>
    )
  }

  return <Doughnut data={chartData} options={options} />
}