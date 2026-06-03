import { useEffect, useState } from "react";
import axios from "../api/axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const [revenue, setRevenue] = useState([]);
  const [salesTrends, setSalesTrends] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [profit, setProfit] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [
        revenueRes,
        salesRes,
        inventoryRes,
        profitRes,
        healthRes,
      ] = await Promise.all([
        axios.get("/dashboard/monthly-revenue"),
        axios.get("/dashboard/sales-trends"),
        axios.get("/dashboard/inventory-value"),
        axios.get("/dashboard/profit-analytics"),
        axios.get("/dashboard/business-health"),
      ]);

      setRevenue(revenueRes.data.monthlyRevenue);
      setSalesTrends(salesRes.data.salesTrends);
      setInventory(inventoryRes.data.inventoryValue);
      setProfit(profitRes.data.profitAnalytics);
      setHealth(healthRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const revenueChartData = revenue.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
  }));

  const salesChartData = salesTrends.map((item) => ({
    day: item._id.day,
    sales: item.salesCount,
  }));

  const inventoryChartData = inventory.map((item) => ({
    name: item._id,
    value: item.totalValue,
  }));

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div className="p-6 space-y-6 text-white">

      <h1 className="text-3xl font-bold">
        Business Analytics
      </h1>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-800 p-5 rounded-xl">
          <h3 className="text-gray-400">Revenue</h3>
          <p className="text-2xl font-bold">
            Rs. {profit?.totalRevenue || 0}
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <h3 className="text-gray-400">Profit</h3>
          <p className="text-2xl font-bold text-green-400">
            Rs. {profit?.totalProfit || 0}
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <h3 className="text-gray-400">Margin</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {profit?.profitMargin || 0}%
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <h3 className="text-gray-400">Health Score</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {health?.healthScore || 0}
          </p>
        </div>

      </div>

      {/* Revenue Chart */}

      <div className="bg-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Trend */}

      <div className="bg-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Sales Trends
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Inventory Chart */}

      <div className="bg-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Inventory Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={inventoryChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {inventoryChartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Health Status */}

      <div className="bg-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-semibold">
          Business Health
        </h2>

        <div className="mt-4">
          <p className="text-4xl font-bold">
            {health?.status}
          </p>

          <p className="text-gray-400 mt-2">
            Score: {health?.healthScore}
          </p>
        </div>
      </div>

    </div>
  );
}