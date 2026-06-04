import { useEffect, useState } from "react";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  BarChart3,
} from "lucide-react";
import API from "../api/axios";

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [clv, setClv] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIInsightsData();
  }, []);

  const fetchAIInsightsData = async () => {
    try {
      setLoading(true);

      const [
        insightsRes,
        recommendationsRes,
        categoryRes,
        customersRes,
        clvRes,
      ] = await Promise.all([
        API.get("/dashboard/ai-insights"),
        API.get("/dashboard/recommendations"),
        API.get("/dashboard/category-performance"),
        API.get("/dashboard/top-customers"),
        API.get("/dashboard/customer-lifetime-value"),
      ]);

      setInsights({
        ...insightsRes.data,
        healthScore: insightsRes.data.insights?.length > 0 ? 75 : 0,
        status:
          insightsRes.data.insights?.length > 0
            ? "AI analysis active"
            : "No data",
      });

      setRecommendations(recommendationsRes.data.recommendations || []);
      setCategoryPerformance(categoryRes.data.categoryPerformance || []);
      console.log(
  "CATEGORY PERFORMANCE DATA:",
  categoryRes.data.categoryPerformance
);
      setTopCustomers(customersRes.data.topCustomers || []);
      setClv(clvRes.data.customers || []);
    } catch (error) {
      console.error("Error fetching AI insights data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return `Rs. ${Number(value || 0).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-surface border border-surface-border rounded-2xl p-6">
          <p className="text-white/50">Loading AI insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center">
            <Brain size={22} className="text-electric" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-700 text-white">
              AI Insights
            </h1>
            <p className="text-white/45 mt-1">
              Intelligent recommendations powered by your business data.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-surface-border rounded-2xl p-6 hover:border-electric/30 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Business Health</p>
            <Sparkles size={18} className="text-electric" />
          </div>
          <h2 className="text-4xl font-display font-700 text-white mt-4">
            {insights?.healthScore || 0}%
          </h2>
          <p className="text-sm text-emerald-400 mt-3">
            {insights?.status || "No status available"}
          </p>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-6 hover:border-electric/30 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Best Category</p>
            <TrendingUp size={18} className="text-electric" />
          </div>
          <h2 className="text-2xl font-display font-700 text-white mt-4">
            {categoryPerformance[0]?._id || "No data"}
          </h2>
          <p className="text-sm text-white/45 mt-3">
            Based on revenue performance
          </p>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-6 hover:border-electric/30 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Top Customer</p>
            <Trophy size={18} className="text-electric" />
          </div>
          <h2 className="text-2xl font-display font-700 text-white mt-4">
            {topCustomers[0]?.name || "No data"}
          </h2>
          <p className="text-sm text-white/45 mt-3">Highest value customer</p>
        </div>
      </div>

      {/* AI Generated Insights */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={20} className="text-electric" />
          <h2 className="text-xl font-display font-700 text-white">
            AI Generated Insights
          </h2>
        </div>

        <div className="space-y-3">
          {insights?.insights?.length > 0 ? (
            insights.insights.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-electric/5 border border-electric/20 hover:border-electric/40 transition-all"
              >
                <p className="font-display font-700 text-white">
                  {item.title || item.type || `Insight ${index + 1}`}
                </p>
                <p className="text-white/60 mt-2">
                  {item.message || JSON.stringify(item)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white/45">No AI insights available yet.</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={20} className="text-electric" />
          <h2 className="text-xl font-display font-700 text-white">
            Business Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-surface-border bg-surface-overlay hover:border-electric/30 transition-all"
              >
                <h3 className="font-display font-700 text-white">
                  {rec.title || rec.type || `Recommendation ${index + 1}`}
                </h3>
                <p className="text-white/60 mt-2">
                  {rec.message || JSON.stringify(rec)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white/45">No recommendations available yet.</p>
          )}
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 size={20} className="text-electric" />
          <h2 className="text-xl font-display font-700 text-white">
            Category Performance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-surface-border text-white/40 text-sm">
                <th className="py-3 font-medium">Category</th>
                <th className="py-3 font-medium">Revenue</th>
                <th className="py-3 font-medium">Sales</th>
                <th className="py-3 font-medium">Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {categoryPerformance.length > 0 ? (
                categoryPerformance.map((cat, index) => (
                  <tr
                    key={index}
                    className="border-b border-surface-border text-white/80"
                  >
                    <td className="py-4 font-medium text-white">{cat._id}</td>
                    <td className="py-4 text-electric font-semibold">
                      {formatCurrency(cat.totalRevenue)}
                    </td>
                    <td className="py-4">{cat.totalSales || 0}</td>
                    <td className="py-4">{cat.totalUnitsSold || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-white/45" colSpan="4">
                    No category data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers + CLV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users size={20} className="text-electric" />
            <h2 className="text-xl font-display font-700 text-white">
              Top Customers
            </h2>
          </div>

          <div className="space-y-3">
            {topCustomers.length > 0 ? (
              topCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-xl bg-surface-overlay border border-surface-border"
                >
                  <div>
                    <p className="font-display font-700 text-white">
                      {customer.name}
                    </p>
                    <p className="text-sm text-white/40">
                      {customer.email || "No email"}
                    </p>
                  </div>
                  <p className="font-display font-700 text-electric">
                    {formatCurrency(customer.totalSpent)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/45">No top customers available.</p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={20} className="text-electric" />
            <h2 className="text-xl font-display font-700 text-white">
              Customer Lifetime Value
            </h2>
          </div>

          <div className="space-y-3">
            {clv.length > 0 ? (
              clv.map((customer, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-xl bg-surface-overlay border border-surface-border"
                >
                  <div>
                    <p className="font-display font-700 text-white">
                      {customer.name}
                    </p>
                    <p className="text-sm text-white/40">
                      Orders: {customer.totalOrders || 0}
                    </p>
                  </div>
                  <p className="font-display font-700 text-electric">
                    {formatCurrency(customer.totalSpent)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/45">
                No lifetime value data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;