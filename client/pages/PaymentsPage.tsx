import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  CreditCard,
  DollarSign,
  FileText,
  Download,
  Eye,
  Plus,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "invoices" | "payments"
  >("overview");
  const [filterPeriod, setFilterPeriod] = useState("30days");

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+18.2%",
      trend: "up",
      period: "This month",
    },
    {
      title: "Pending Invoices",
      value: "$3,200",
      change: "+5 invoices",
      trend: "up",
      period: "Awaiting payment",
    },
    {
      title: "Paid This Month",
      value: "$8,750",
      change: "+22.1%",
      trend: "up",
      period: "From 12 clients",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      period: "Payment collection",
    },
  ];

  const recentInvoices = [
    {
      id: "INV-2024-001",
      client: "John Smith",
      service: "Canada PR Application",
      amount: 2500,
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
    },
    {
      id: "INV-2024-002",
      client: "Emma Johnson",
      service: "Study Visa Consultation",
      amount: 800,
      status: "pending",
      date: "2024-01-18",
      dueDate: "2024-02-02",
    },
    {
      id: "INV-2024-003",
      client: "Michael Chen",
      service: "Work Permit Application",
      amount: 1800,
      status: "overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
    },
    {
      id: "INV-2024-004",
      client: "Sarah Wilson",
      service: "Family Sponsorship",
      amount: 3200,
      status: "draft",
      date: "2024-01-20",
      dueDate: "2024-02-05",
    },
  ];

  const recentPayments = [
    {
      id: "PAY-001",
      invoice: "INV-2024-001",
      client: "John Smith",
      amount: 2500,
      method: "Bank Transfer",
      date: "2024-01-16",
      status: "completed",
    },
    {
      id: "PAY-002",
      invoice: "INV-2023-089",
      client: "Lisa Rodriguez",
      amount: 1200,
      method: "Credit Card",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "PAY-003",
      invoice: "INV-2024-002",
      client: "Emma Johnson",
      amount: 400,
      method: "PayPal",
      date: "2024-01-12",
      status: "processing",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton dashboardType="agent" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payments & Invoices
              </h1>
              <p className="text-gray-600">
                Manage your billing, invoices, and payment tracking
              </p>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "invoices", label: "Invoices" },
              { id: "payments", label: "Payments" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
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
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      <span className="text-xs font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Invoices */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Invoices
                  </h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentInvoices.slice(0, 3).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {invoice.client}
                        </p>
                        <p className="text-sm text-gray-500">{invoice.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize">
                            {invoice.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Payments
                  </h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.client}
                        </p>
                        <p className="text-sm text-gray-500">
                          {payment.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          +${payment.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1 capitalize">
                            {payment.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Invoice
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Service
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900">
                            {invoice.id}
                          </span>
                        </td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4">{invoice.service}</td>
                        <td className="py-3 px-4">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1 capitalize">
                              {invoice.status}
                            </span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{invoice.dueDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Payment ID
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Invoice
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Method
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900">
                            {payment.id}
                          </span>
                        </td>
                        <td className="py-3 px-4">{payment.invoice}</td>
                        <td className="py-3 px-4">{payment.client}</td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-green-600">
                            +${payment.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">{payment.method}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1 capitalize">
                              {payment.status}
                            </span>
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
