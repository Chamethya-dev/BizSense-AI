import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardCard from "../components/DashboardCard";
import RevenueChart from "../components/RevenueChart";
import SalesTrendChart from "../components/SalesTrendchart";
import InventoryChart from "../components/InventoryChart";
import ActivityFeed from "../components/ActivityFeed";
import ProductTable from "../components/ProductTable";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activities, setActivities] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        summaryRes,
        revenueRes,
        salesTrendRes,
        inventoryRes,
        activityRes,
        productsRes,
      ] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/dashboard/monthly-revenue"),
        api.get("/dashboard/sales-trends"),
        api.get("/dashboard/inventory-value"),
        api.get("/dashboard/activity-feed"),
        api.get("/products"),
      ]);

      setSummary(summaryRes.data.summary || {});
      setRevenue(revenueRes.data.monthlyRevenue || []);
      setSalesTrend(salesTrendRes.data.salesTrends || []);
      setInventory(inventoryRes.data.inventoryValue || []);
      setActivities(activityRes.data.activities || []);
      setProducts(productsRes.data.products || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Products"
          value={summary.totalProducts || 0}
        />

        <DashboardCard
          title="Low Stock Products"
          value={summary.lowStockProducts || 0}
        />

        <DashboardCard
          title="Total Revenue"
          value={`Rs. ${summary.totalRevenue || 0}`}
        />

        <DashboardCard
          title="Total Sales"
          value={summary.totalSales || 0}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5 h-80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Monthly Revenue
          </h2>
          <div className="h-60">
            <RevenueChart data={revenue} />
          </div>
        </div>

        <div className="card p-5 h-80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Sales Trends
          </h2>
          <div className="h-60">
            <SalesTrendChart data={salesTrend} />
          </div>
        </div>
      </div>

      {/* Inventory + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5 h-80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Inventory Value
          </h2>
          <div className="h-60">
            <InventoryChart data={inventory} />
          </div>
        </div>

        <div className="card p-5 h-80 overflow-y-auto">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Products Table */}
      <div className="card p-5">
        <h2 className="text-lg font-semibold text-white mb-4">
          Products
        </h2>
        <ProductTable products={products} />
      </div>
    </div>
  );
};

export default Dashboard;