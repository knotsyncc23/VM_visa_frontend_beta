import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
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
} from "recharts";
import {
  Calendar,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";

function AgentInsightsPage() {
  const [filterPeriod, setFilterPeriod] = useState<string>("6months");

  // Chart data
  const proposalTrendData = [
    { month: "Jan", sent: 85, accepted: 78, rate: 92 },
    { month: "Feb", sent: 92, accepted: 85, rate: 92 },
    { month: "Mar", sent: 110, accepted: 102, rate: 93 },
    { month: "Apr", sent: 98, accepted: 89, rate: 91 },
    { month: "May", sent: 125, accepted: 115, rate: 92 },
    { month: "Jun", sent: 120, accepted: 110, rate: 92 },
  ];

  const visaTypesData = [
    { name: "Work Visa", value: 35, color: "#0288D1" },
    { name: "Study Visa", value: 25, color: "#10B981" },
    { name: "PR Applications", value: 20, color: "#F59E0B" },
    { name: "Visitor Visa", value: 15, color: "#8B5CF6" },
    { name: "Other", value: 5, color: "#6B7280" },
  ];

  const monthlyEarningsData = [
    { month: "Jan", earnings: 4200, proposals: 85 },
    { month: "Feb", earnings: 4800, proposals: 92 },
    { month: "Mar", earnings: 5600, proposals: 110 },
    { month: "Apr", earnings: 4900, proposals: 98 },
    { month: "May", earnings: 6200, proposals: 125 },
    { month: "Jun", earnings: 5800, proposals: 120 },
  ];

  const filterOptions = [
    { value: "30days", label: "Last 30 Days" },
    { value: "3months", label: "Last 3 Months" },
    { value: "6months", label: "Last 6 Months" },
    { value: "year", label: "This Year" },
    { value: "all", label: "All Time" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton dashboardType="agent" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Insights & Reports
              </h1>
              <p className="text-gray-600">
                Detailed analytics and performance metrics
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Period Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Proposals",
              value: "630",
              change: "+12%",
              trend: "up",
              color: "blue",
            },
            {
              title: "Success Rate",
              value: "92.3%",
              change: "+2.1%",
              trend: "up",
              color: "green",
            },
            {
              title: "Avg. Response Time",
              value: "2.4h",
              change: "-15%",
              trend: "up",
              color: "purple",
            },
            {
              title: "Total Revenue",
              value: "$32,400",
              change: "+18%",
              trend: "up",
              color: "orange",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <div
                  className={`flex items-center space-x-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proposals vs Acceptance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Proposals vs Acceptance
                </h3>
                <p className="text-sm text-gray-600">
                  Track your proposal success over time
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                {filterPeriod === "6months"
                  ? "Last 6 months"
                  : filterOptions.find((opt) => opt.value === filterPeriod)
                      ?.label}
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={proposalTrendData}>
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
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#0288D1"
                    strokeWidth={3}
                    dot={{ fill: "#0288D1", strokeWidth: 2, r: 4 }}
                    name="Proposals Sent"
                  />
                  <Line
                    type="monotone"
                    dataKey="accepted"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    name="Proposals Accepted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Visa Types Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Visa Types Distribution
                </h3>
                <p className="text-sm text-gray-600">
                  Breakdown of your case types
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                Current Period
              </Badge>
            </div>
            <div className="h-80 flex items-center">
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visaTypesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {visaTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Monthly Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Earnings & Proposals
              </h3>
              <p className="text-sm text-gray-600">
                Revenue correlation with proposal activity
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              Financial Overview
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarningsData}>
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
                  dataKey="earnings"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  name="Earnings ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AgentInsightsPage;
