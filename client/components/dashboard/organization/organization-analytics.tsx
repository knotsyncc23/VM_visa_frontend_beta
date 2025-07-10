import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Briefcase,
  Star,
  Award,
  Calendar,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export function OrganizationAnalytics() {
  // Mock analytics data
  const monthlyData = [
    { month: "Jan", cases: 45, revenue: 58000, conversion: 78, agents: 8 },
    { month: "Feb", cases: 52, revenue: 67000, conversion: 82, agents: 9 },
    { month: "Mar", cases: 61, revenue: 79000, conversion: 85, agents: 10 },
    { month: "Apr", cases: 58, revenue: 75000, conversion: 83, agents: 11 },
    { month: "May", cases: 69, revenue: 89000, conversion: 87, agents: 12 },
    { month: "Jun", cases: 78, revenue: 125600, conversion: 89, agents: 12 },
  ];

  const agentPerformanceData = [
    { name: "Sarah A.", cases: 18, revenue: 24000, success: 94 },
    { name: "John D.", cases: 15, revenue: 19500, success: 89 },
    { name: "Maria G.", cases: 14, revenue: 18200, success: 92 },
    { name: "David K.", cases: 12, revenue: 15600, success: 88 },
    { name: "Lisa R.", cases: 8, revenue: 10400, success: 85 },
  ];

  const visaTypeDistribution = [
    { name: "Work Visa", value: 35, color: "#0052CC", revenue: 45000 },
    { name: "Study Visa", value: 28, color: "#3B82F6", revenue: 36000 },
    { name: "PR Applications", value: 22, color: "#60A5FA", revenue: 52000 },
    { name: "Visitor Visa", value: 10, color: "#93C5FD", revenue: 8000 },
    { name: "Family Sponsorship", value: 5, color: "#DBEAFE", revenue: 12000 },
  ];

  const conversionFunnelData = [
    { stage: "Inquiries", count: 320, conversion: 100 },
    { stage: "Consultations", count: 256, conversion: 80 },
    { stage: "Proposals Sent", count: 192, conversion: 60 },
    { stage: "Contracts Signed", count: 154, conversion: 48 },
    { stage: "Cases Completed", count: 138, conversion: 43 },
  ];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "$125,600",
      icon: DollarSign,
      growth: "+23.5%",
      trend: "up",
      color: "#0052CC",
    },
    {
      title: "Conversion Rate",
      value: "89%",
      icon: Target,
      growth: "+4.2%",
      trend: "up",
      color: "#10B981",
    },
    {
      title: "Active Agents",
      value: "12",
      icon: Users,
      growth: "+2",
      trend: "up",
      color: "#8B5CF6",
    },
    {
      title: "Cases This Month",
      value: "78",
      icon: Briefcase,
      growth: "+12.8%",
      trend: "up",
      color: "#F59E0B",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                }}
              >
                <card.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{card.growth}</span>
              </div>
            </div>
            <h3
              className="text-sm font-medium mb-1"
              style={{ color: "#666666" }}
            >
              {card.title}
            </h3>
            <p className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1A1A1A" }}
              >
                Revenue & Cases Trend
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Monthly performance overview
              </p>
            </div>
            <Badge style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}>
              Last 6 months
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
                <XAxis dataKey="month" stroke="#666666" fontSize={12} />
                <YAxis stroke="#666666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0052CC"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052CC" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1A1A1A" }}
              >
                Conversion Funnel
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                From inquiry to completion
              </p>
            </div>
            <Badge style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}>
              This month
            </Badge>
          </div>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1A1A1A" }}
                  >
                    {stage.stage}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#0052CC" }}
                    >
                      {stage.count}
                    </span>
                    <span className="text-xs" style={{ color: "#666666" }}>
                      ({stage.conversion}%)
                    </span>
                  </div>
                </div>
                <div
                  className="w-full h-3 rounded-full"
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.conversion}%` }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                    className="h-3 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Agent Performance & Visa Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1A1A1A" }}
              >
                Agent Performance Heatmap
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Revenue and success rate comparison
              </p>
            </div>
            <Badge style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}>
              This month
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
                <XAxis dataKey="name" stroke="#666666" fontSize={12} />
                <YAxis stroke="#666666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                  name="Revenue ($)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#0052CC" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Visa Type Revenue Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1A1A1A" }}
              >
                Visa Type Revenue
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Revenue breakdown by visa category
              </p>
            </div>
            <Badge style={{ backgroundColor: "#EAF2FF", color: "#0052CC" }}>
              This month
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visaTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {visaTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "#1A1A1A" }}
          >
            Monthly Targets
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: "#666666" }}>
                  Revenue Target
                </span>
                <span className="font-semibold" style={{ color: "#1A1A1A" }}>
                  $150k
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "84%",
                    background:
                      "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#666666" }}>
                $125.6k achieved (84%)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: "#666666" }}>
                  Cases Target
                </span>
                <span className="font-semibold" style={{ color: "#1A1A1A" }}>
                  90
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "87%",
                    background:
                      "linear-gradient(90deg, #10B981 0%, #34D399 100%)",
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#666666" }}>
                78 completed (87%)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: "#666666" }}>
                  Client Satisfaction
                </span>
                <span className="font-semibold" style={{ color: "#1A1A1A" }}>
                  95%
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "92%",
                    background:
                      "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#666666" }}>
                4.6/5.0 average (92%)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "#1A1A1A" }}
          >
            Top Performers
          </h3>
          <div className="space-y-4">
            {agentPerformanceData.slice(0, 3).map((agent, index) => (
              <div key={agent.name} className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: "#0052CC" }}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: "#1A1A1A" }}>
                    {agent.name}
                  </p>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    {agent.cases} cases • {agent.success}% success
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#0052CC" }}
                  >
                    ${(agent.revenue / 1000).toFixed(0)}k
                  </p>
                  <div className="flex items-center">
                    <Award
                      className="w-3 h-3 mr-1"
                      style={{ color: "#F59E0B" }}
                    />
                    <span className="text-xs" style={{ color: "#666666" }}>
                      {index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "#1A1A1A" }}
          >
            Quick Insights
          </h3>
          <div className="space-y-4">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4" style={{ color: "#10B981" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#10B981" }}
                >
                  Revenue Growth
                </span>
              </div>
              <p className="text-xs" style={{ color: "#666666" }}>
                Revenue increased by 23.5% compared to last month
              </p>
            </div>

            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Star className="w-4 h-4" style={{ color: "#F59E0B" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#F59E0B" }}
                >
                  Client Satisfaction
                </span>
              </div>
              <p className="text-xs" style={{ color: "#666666" }}>
                Average rating improved to 4.6/5.0 this month
              </p>
            </div>

            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Target className="w-4 h-4" style={{ color: "#0052CC" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#0052CC" }}
                >
                  Best Visa Type
                </span>
              </div>
              <p className="text-xs" style={{ color: "#666666" }}>
                PR Applications generate highest revenue per case
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
