import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Shield,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Check,
  X,
  Filter,
  Search,
  Download,
  Calendar,
} from "lucide-react";
import { EscrowTransaction, EscrowStatus } from "@/types/escrow";
import { EscrowStatusBadge } from "@/components/escrow/EscrowStatusBadge";

export default function AdminEscrowPage() {
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([]);
  const [filterStatus, setFilterStatus] = useState<EscrowStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTransactions: EscrowTransaction[] = [
      {
        id: "escrow1",
        projectId: "proj1",
        clientId: "client1",
        agentId: "agent1",
        amount: 2500,
        platformFee: 250,
        netAmount: 2250,
        currency: "USD",
        status: "in_progress",
        createdAt: new Date("2024-01-16"),
        updatedAt: new Date("2024-01-20"),
        timeline: [
          {
            id: "1",
            type: "created",
            description: "Escrow created",
            timestamp: new Date("2024-01-16"),
            userId: "client1",
            userRole: "client",
          },
          {
            id: "2",
            type: "funded",
            description: "Funds deposited",
            timestamp: new Date("2024-01-16"),
            userId: "client1",
            userRole: "client",
          },
        ],
      },
      {
        id: "escrow2",
        projectId: "proj2",
        clientId: "client2",
        agentId: "agent2",
        amount: 800,
        platformFee: 80,
        netAmount: 720,
        currency: "USD",
        status: "dispute",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-25"),
        disputedAt: new Date("2024-01-25"),
        timeline: [
          {
            id: "1",
            type: "created",
            description: "Escrow created",
            timestamp: new Date("2024-01-10"),
            userId: "client2",
            userRole: "client",
          },
          {
            id: "2",
            type: "funded",
            description: "Funds deposited",
            timestamp: new Date("2024-01-10"),
            userId: "client2",
            userRole: "client",
          },
          {
            id: "3",
            type: "disputed",
            description: "Dispute raised by client",
            timestamp: new Date("2024-01-25"),
            userId: "client2",
            userRole: "client",
          },
        ],
      },
      {
        id: "escrow3",
        projectId: "proj3",
        clientId: "client3",
        agentId: "agent3",
        amount: 1200,
        platformFee: 120,
        netAmount: 1080,
        currency: "USD",
        status: "released",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-22"),
        releasedAt: new Date("2024-01-22"),
        timeline: [
          {
            id: "1",
            type: "created",
            description: "Escrow created",
            timestamp: new Date("2024-01-05"),
            userId: "client3",
            userRole: "client",
          },
          {
            id: "2",
            type: "funded",
            description: "Funds deposited",
            timestamp: new Date("2024-01-05"),
            userId: "client3",
            userRole: "client",
          },
          {
            id: "3",
            type: "completed",
            description: "Work completed",
            timestamp: new Date("2024-01-20"),
            userId: "agent3",
            userRole: "agent",
          },
          {
            id: "4",
            type: "released",
            description: "Funds released",
            timestamp: new Date("2024-01-22"),
            userId: "client3",
            userRole: "client",
          },
        ],
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const stats = [
    {
      title: "Total Escrow Volume",
      value: "$4,500",
      change: "+18% this month",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Platform Fees Earned",
      value: "$450",
      change: "+22% this month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Disputes",
      value: "1",
      change: "Needs attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1% this month",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    const matchesSearch = transaction.projectId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleResolveDispute = async (
    transactionId: string,
    resolution: "release" | "refund",
  ) => {
    console.log("Resolving dispute:", { transactionId, resolution });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update transaction status
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId
          ? {
              ...t,
              status: resolution === "release" ? "released" : "refunded",
              updatedAt: new Date(),
            }
          : t,
      ),
    );
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
                Escrow Management
              </h1>
              <p className="text-gray-600">
                Monitor and manage platform escrow transactions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as EscrowStatus | "all")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="funded">Funded</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="released">Released</option>
              <option value="dispute">Disputes</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="year">This year</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Escrow Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Client
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Agent
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Created
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {transaction.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        Project: {transaction.projectId}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Fee: ${transaction.platformFee.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <EscrowStatusBadge status={transaction.status} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {transaction.clientId}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {transaction.agentId}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">
                        {transaction.createdAt.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.createdAt.toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        {transaction.status === "dispute" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleResolveDispute(transaction.id, "release")
                              }
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                              onClick={() =>
                                handleResolveDispute(transaction.id, "refund")
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Disputes
            </h3>
            <div className="space-y-4">
              {transactions
                .filter((t) => t.status === "dispute")
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-red-900">
                        Dispute #{transaction.id}
                      </p>
                      <p className="text-sm text-red-700">
                        Amount: ${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-red-600">
                        Raised:{" "}
                        {transaction.disputedAt?.toLocaleDateString() || "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleResolveDispute(transaction.id, "release")
                        }
                      >
                        Release
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600"
                        onClick={() =>
                          handleResolveDispute(transaction.id, "refund")
                        }
                      >
                        Refund
                      </Button>
                    </div>
                  </div>
                ))}
              {transactions.filter((t) => t.status === "dispute").length ===
                0 && (
                <p className="text-gray-500 text-center py-4">
                  No active disputes
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Revenue
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Fees Collected</span>
                <span className="font-bold text-green-600">$450.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="font-medium">$250.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Month</span>
                <span className="font-medium">$200.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth</span>
                  <span className="font-medium text-green-600">+25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
