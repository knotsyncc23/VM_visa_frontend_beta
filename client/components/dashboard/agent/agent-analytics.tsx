import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Clock,
  Star,
  Award,
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
import { api } from "@shared/api";
import { useAuth } from "@/components/auth/auth-context";

interface AgentAnalyticsProps {
  filterPeriod: "today" | "7days" | "month" | "year";
}

export function AgentAnalytics({ filterPeriod }: AgentAnalyticsProps) {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [filterPeriod, user]);

  const fetchAnalyticsData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const stats = await api.getDashboardStats();
      setAnalyticsData(stats);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Fallback to mock data
      setAnalyticsData(getMockAnalyticsData());
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback
  const getMockAnalyticsData = () => {
    const baseData = {
      today: {
        revenue: 1240,
        proposals: 3,
        clientSatisfaction: 4.9,
        responseTime: 2.5,
        growth: 8.5,
      },
      "7days": {
        revenue: 3800,
        proposals: 18,
        clientSatisfaction: 4.8,
        responseTime: 3.2,
        growth: 12.3,
      },
      month: {
        revenue: 5200,
        proposals: 120,
        clientSatisfaction: 4.7,
        responseTime: 4.1,
        growth: 15.2,
      },
      year: {
        revenue: 62400,
        proposals: 1450,
        clientSatisfaction: 4.6,
        responseTime: 5.8,
        growth: 18.7,
      },
    };
    return baseData[filterPeriod];
  };

  const data = analyticsData ? {
    revenue: analyticsData.totalEarnings || 0,
    proposals: analyticsData.totalProposals || 0,
    clientSatisfaction: 4.7,
    responseTime: 4.1,
    growth: parseFloat(analyticsData.successRate) || 0,
  } : getMockAnalyticsData();

  // Revenue trend data
  const revenueTrendData = [
    { month: "Jan", revenue: 4200, proposals: 95 },
    { month: "Feb", revenue: 4800, proposals: 108 },
    { month: "Mar", revenue: 5500, revenues: 125 },
    { month: "Apr", revenue: 4900, proposals: 102 },
    { month: "May", revenue: 6200, proposals: 145 },
    { month: "Jun", revenue: 5200, proposals: 120 },
  ];

  // Performance metrics over time
  const performanceData = [
    { week: "Week 1", satisfaction: 4.5, responseTime: 6.2 },
    { week: "Week 2", satisfaction: 4.6, responseTime: 5.8 },
    { week: "Week 3", satisfaction: 4.8, responseTime: 4.5 },
    { week: "Week 4", satisfaction: 4.7, responseTime: 4.1 },
  ];

  // Visa type distribution
  const visaTypeRevenue = [
    { name: "Work Visa", value: 2200, color: "#326dee" },
    { name: "Study Visa", value: 1800, color: "#c3dafe" },
    { name: "PR Applications", value: 2400, color: "#e6f2ff" },
    { name: "Visitor Visa", value: 800, color: "#f0f4ff" },
    { name: "Investment Visa", value: 1200, color: "#ddd6fe" },
  ];

  // Client retention data
  const clientRetentionData = [
    { month: "Jan", new: 15, returning: 25 },
    { month: "Feb", new: 18, returning: 28 },
    { month: "Mar", new: 22, returning: 32 },
    { month: "Apr", new: 16, returning: 29 },
    { month: "May", new: 25, returning: 35 },
    { month: "Jun", new: 20, returning: 30 },
  ];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: `$${data.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "#326dee",
      bgColor: "#f0f4ff",
      growth: `+${data.growth}%`,
      trend: "up",
      period: filterPeriod,
    },
    {
      title: "Proposals Sent",
      value: data.proposals,
      icon: Target,
      color: "#10b981",
      bgColor: "#ecfdf5",
      growth: "+12%",
      trend: "up",
      period: filterPeriod,
    },
    {
      title: "Client Satisfaction",
      value: `${data.clientSatisfaction}/5.0`,
      icon: Star,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      growth: "+0.2",
      trend: "up",
      period: filterPeriod,
    },
    {
      title: "Avg Response Time",
      value: `${data.responseTime}h`,
      icon: Clock,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      growth: "-1.2h",
      trend: "down",
      period: filterPeriod,
    },
  ];

  const achievements = [
    {
      title: "Top Performer",
      description: "Highest success rate this month",
      icon: Award,
      color: "#fbbf24",
      earned: "2024-01-15",
    },
    {
      title: "Client Favorite",
      description: "95% positive client feedback",
      icon: Star,
      color: "#10b981",
      earned: "2024-01-10",
    },
    {
      title: "Fast Responder",
      description: "Average response time under 4 hours",
      icon: Clock,
      color: "#3b82f6",
      earned: "2024-01-08",
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
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <div
                className={`flex items-center space-x-1 ${
                  card.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{card.growth}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {card.period === "7days" ? "This week" : `This ${card.period}`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <p className="text-sm text-gray-600">
                Monthly revenue performance
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              +15.2% growth
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#326dee"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#326dee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#326dee" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Metrics
              </h3>
              <p className="text-sm text-gray-600">
                Satisfaction vs Response Time
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Last 4 weeks
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="week"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#326dee"
                  strokeWidth={3}
                  dot={{ fill: "#326dee", strokeWidth: 2, r: 4 }}
                  name="Satisfaction Rating"
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Response Time (hours)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Revenue by Visa Type and Client Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Visa Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue by Visa Type
              </h3>
              <p className="text-sm text-gray-600">
                Distribution of revenue sources
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
              This month
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visaTypeRevenue}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {visaTypeRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Client Retention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Client Acquisition
              </h3>
              <p className="text-sm text-gray-600">New vs returning clients</p>
            </div>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              Last 6 months
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientRetentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="new"
                  stackId="a"
                  fill="#326dee"
                  radius={[0, 0, 4, 4]}
                  name="New Clients"
                />
                <Bar
                  dataKey="returning"
                  stackId="a"
                  fill="#c3dafe"
                  radius={[4, 4, 0, 0]}
                  name="Returning Clients"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Achievements and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <achievement.icon
                    className="w-6 h-6"
                    style={{ color: achievement.color }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Earned on {achievement.earned}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Stats
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Total Clients</p>
                  <p className="text-sm text-gray-600">All time</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">147</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Success Rate</p>
                  <p className="text-sm text-gray-600">Applications approved</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">92%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Avg Rating</p>
                  <p className="text-sm text-gray-600">From 89 reviews</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">4.8</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rank</p>
                  <p className="text-sm text-gray-600">Among all agents</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">#12</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
