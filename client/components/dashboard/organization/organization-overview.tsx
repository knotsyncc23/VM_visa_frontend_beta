import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Star,
  Award,
  Plus,
  Eye,
  MessageCircle,
  FileText,
  MapPin,
  Mail,
  Phone,
  Building,
  Shield,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

export function OrganizationOverview() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  // Mock data for the dashboard
  const kpiData = {
    totalCases: 156,
    conversionRate: 87,
    activeAgents: 12,
    revenueGenerated: 125600,
    monthlyGrowth: 23.5,
  };

  // Performance data for charts
  const performanceData = [
    { month: "Jan", cases: 85, revenue: 89000, conversion: 82 },
    { month: "Feb", cases: 92, revenue: 95000, conversion: 85 },
    { month: "Mar", cases: 110, revenue: 115000, conversion: 88 },
    { month: "Apr", cases: 98, revenue: 102000, conversion: 84 },
    { month: "May", cases: 125, revenue: 130000, conversion: 89 },
    { month: "Jun", cases: 156, revenue: 125600, conversion: 87 },
  ];

  // Visa type distribution
  const visaTypeData = [
    { name: "Work Visa", value: 35, color: "#0052CC" },
    { name: "Study Visa", value: 28, color: "#3B82F6" },
    { name: "PR Applications", value: 22, color: "#60A5FA" },
    { name: "Visitor Visa", value: 10, color: "#93C5FD" },
    { name: "Other", value: 5, color: "#DBEAFE" },
  ];

  // Agent performance data
  const agentPerformanceData = [
    { name: "Sarah A.", cases: 18, successRate: 94, revenue: 12400 },
    { name: "John D.", cases: 15, successRate: 89, revenue: 10800 },
    { name: "Maria G.", cases: 14, successRate: 92, revenue: 9800 },
    { name: "David K.", cases: 12, successRate: 88, revenue: 8900 },
    { name: "Lisa R.", cases: 11, successRate: 91, revenue: 8200 },
  ];

  // Recent activities
  const recentActivities = [
    {
      type: "case_assigned",
      agent: "Sarah Ahmad",
      client: "John Smith",
      action: "H1-B visa case assigned",
      time: "2 hours ago",
      status: "assigned",
    },
    {
      type: "docs_submitted",
      agent: "Maria Garcia",
      client: "Emma Johnson",
      action: "Documents submitted for review",
      time: "4 hours ago",
      status: "pending",
    },
    {
      type: "case_completed",
      agent: "David Kim",
      client: "Michael Chen",
      action: "PR application approved",
      time: "6 hours ago",
      status: "completed",
    },
    {
      type: "agent_added",
      agent: "Lisa Rodriguez",
      client: null,
      action: "New agent joined the team",
      time: "1 day ago",
      status: "active",
    },
    {
      type: "license_expiry",
      agent: null,
      client: null,
      action: "License renewal reminder - 30 days",
      time: "2 days ago",
      status: "warning",
    },
  ];

  const kpiCards = [
    {
      title: "Total Cases This Month",
      value: kpiData.totalCases,
      icon: Briefcase,
      growth: "+15%",
      trend: "up",
      color: "#0052CC",
    },
    {
      title: "Conversion Rate",
      value: `${kpiData.conversionRate}%`,
      icon: Target,
      growth: "+3%",
      trend: "up",
      color: "#0052CC",
    },
    {
      title: "Active Agents",
      value: kpiData.activeAgents,
      icon: Users,
      growth: "+2",
      trend: "up",
      color: "#0052CC",
    },
    {
      title: "Revenue Generated",
      value: `$${(kpiData.revenueGenerated / 1000).toFixed(0)}k`,
      icon: DollarSign,
      growth: `+${kpiData.monthlyGrowth}%`,
      trend: "up",
      color: "#0052CC",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "case_assigned":
        return <Briefcase className="w-4 h-4" />;
      case "docs_submitted":
        return <FileText className="w-4 h-4" />;
      case "case_completed":
        return <CheckCircle className="w-4 h-4" />;
      case "agent_added":
        return <Users className="w-4 h-4" />;
      case "license_expiry":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "assigned":
        return "#0052CC";
      case "pending":
        return "#F59E0B";
      case "warning":
        return "#EF4444";
      case "active":
        return "#0052CC";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="space-y-6">
      {/* Organization Info Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Organization Details */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                  }}
                >
                  GI
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "#1A1A1A" }}
                  >
                    Global Immigration Services
                  </h2>
                  <p className="text-sm" style={{ color: "#666666" }}>
                    ICCRC License: R123456
                  </p>
                  <div
                    className="flex items-center space-x-4 mt-2 text-sm"
                    style={{ color: "#666666" }}
                  >
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Toronto, Canada</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>admin@globalimmig.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* About Section */}
            <div className="space-y-3">
              <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
                About Us
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#666666" }}
              >
                Global Immigration Services is a premier immigration consultancy
                firm with over 15 years of experience helping individuals and
                families navigate complex immigration processes. We specialize
                in Canadian immigration law and provide comprehensive services
                for work permits, study visas, permanent residency, and family
                sponsorship applications.
              </p>
            </div>

            {/* License Status */}
            <div
              className="flex items-center justify-between mt-4 p-3 rounded-lg"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: "#0052CC" }} />
                <span className="font-medium" style={{ color: "#0052CC" }}>
                  License Status: Active
                </span>
              </div>
              <div className="text-sm" style={{ color: "#666666" }}>
                Expires: Dec 31, 2024 (345 days remaining)
              </div>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="space-y-4">
            <div
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <p className="text-3xl font-bold" style={{ color: "#0052CC" }}>
                89
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Active Cases
              </p>
            </div>
            <div
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <p className="text-3xl font-bold" style={{ color: "#0052CC" }}>
                12
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Team Members
              </p>
            </div>
            <div
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: "#EAF2FF" }}
            >
              <p className="text-3xl font-bold" style={{ color: "#0052CC" }}>
                4.9
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Avg Rating
              </p>
            </div>
          </div>
        </div>
      </div>

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
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
              <AreaChart data={performanceData}>
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

        {/* Visa Type Distribution */}
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
                Visa Type Distribution
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Case breakdown by visa category
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
                  data={visaTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {visaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Agent Performance & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Agents */}
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
                Top Performing Agents
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                This month's star performers
              </p>
            </div>
            <Button
              size="sm"
              style={{ backgroundColor: "#0052CC", color: "white" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </div>

          <div className="space-y-4">
            {agentPerformanceData.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 rounded-xl hover:shadow-sm transition-all duration-200"
                style={{ backgroundColor: "#F4F6FA" }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: "#0052CC" }}
                  >
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-medium" style={{ color: "#1A1A1A" }}>
                      {agent.name}
                    </h4>
                    <p className="text-xs" style={{ color: "#666666" }}>
                      {agent.cases} cases • {agent.successRate}% success
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: "#0052CC" }}>
                    ${agent.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" style={{ color: "#F59E0B" }} />
                    <span className="text-xs" style={{ color: "#666666" }}>
                      4.{8 + index}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities Timeline */}
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
                Recent Activities
              </h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Latest updates and notifications
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start space-x-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1A1A1A" }}
                  >
                    {activity.action}
                  </p>
                  {activity.agent && (
                    <p className="text-xs" style={{ color: "#666666" }}>
                      {activity.agent}
                      {activity.client && ` → ${activity.client}`}
                    </p>
                  )}
                  <p className="text-xs" style={{ color: "#666666" }}>
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1A1A1A" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="flex flex-col items-center space-y-2 h-20"
            style={{ backgroundColor: "#0052CC", color: "white" }}
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Add Agent</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center space-y-2 h-20"
          >
            <Briefcase className="w-6 h-6" />
            <span className="text-sm">Assign Case</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center space-y-2 h-20"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">Message Client</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center space-y-2 h-20"
          >
            <FileText className="w-6 h-6" />
            <span className="text-sm">Generate Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
