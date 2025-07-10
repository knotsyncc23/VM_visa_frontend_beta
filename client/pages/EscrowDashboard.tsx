import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Shield,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Plus,
} from "lucide-react";
import { Project, EscrowTransaction, EscrowStatus } from "@/types/escrow";
import { EscrowCard } from "@/components/escrow/EscrowCard";
import { EscrowTimeline } from "@/components/escrow/EscrowTimeline";

export default function EscrowDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterStatus, setFilterStatus] = useState<EscrowStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "Canada PR Application",
        description:
          "Complete permanent residence application with document preparation and submission.",
        clientId: "client1",
        agentId: "agent1",
        status: "in_progress",
        budget: 2500,
        proposals: [
          {
            id: "prop1",
            projectId: "1",
            agentId: "agent1",
            title: "Canada PR Complete Service",
            description: "Full service including documentation and filing",
            amount: 2500,
            timeline: "45-60 days",
            status: "accepted",
            createdAt: new Date("2024-01-15"),
          },
        ],
        escrow: {
          id: "escrow1",
          projectId: "1",
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
              description: "Escrow transaction created",
              timestamp: new Date("2024-01-16"),
              userId: "client1",
              userRole: "client",
            },
            {
              id: "2",
              type: "funded",
              description: "Funds deposited to escrow",
              timestamp: new Date("2024-01-16"),
              userId: "client1",
              userRole: "client",
            },
            {
              id: "3",
              type: "started",
              description: "Work started by agent",
              timestamp: new Date("2024-01-17"),
              userId: "agent1",
              userRole: "agent",
            },
          ],
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        title: "Study Visa Application",
        description: "Student visa application for University of Toronto",
        clientId: "client1",
        agentId: "agent2",
        status: "completed",
        budget: 800,
        proposals: [
          {
            id: "prop2",
            projectId: "2",
            agentId: "agent2",
            title: "Study Visa Service",
            description: "Complete student visa application",
            amount: 800,
            timeline: "30 days",
            status: "accepted",
            createdAt: new Date("2024-01-01"),
          },
        ],
        escrow: {
          id: "escrow2",
          projectId: "2",
          clientId: "client1",
          agentId: "agent2",
          amount: 800,
          platformFee: 80,
          netAmount: 720,
          currency: "USD",
          status: "completed",
          createdAt: new Date("2024-01-02"),
          updatedAt: new Date("2024-01-25"),
          completedAt: new Date("2024-01-25"),
          timeline: [
            {
              id: "1",
              type: "created",
              description: "Escrow transaction created",
              timestamp: new Date("2024-01-02"),
              userId: "client1",
              userRole: "client",
            },
            {
              id: "2",
              type: "funded",
              description: "Funds deposited to escrow",
              timestamp: new Date("2024-01-02"),
              userId: "client1",
              userRole: "client",
            },
            {
              id: "3",
              type: "started",
              description: "Work started by agent",
              timestamp: new Date("2024-01-03"),
              userId: "agent2",
              userRole: "agent",
            },
            {
              id: "4",
              type: "completed",
              description: "Work completed by agent",
              timestamp: new Date("2024-01-25"),
              userId: "agent2",
              userRole: "agent",
            },
          ],
        },
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-25"),
      },
      {
        id: "3",
        title: "Family Sponsorship",
        description: "Spouse sponsorship application for Canada",
        clientId: "client1",
        status: "open",
        budget: 3200,
        proposals: [
          {
            id: "prop3",
            projectId: "3",
            agentId: "agent3",
            title: "Family Sponsorship Service",
            description: "Complete family sponsorship application",
            amount: 3200,
            timeline: "60-90 days",
            status: "accepted",
            createdAt: new Date("2024-01-20"),
          },
        ],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
    ];
    setProjects(mockProjects);
  }, []);

  const stats = [
    {
      title: "Total in Escrow",
      value: "$3,300",
      change: "+$800 this month",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Released Funds",
      value: "$720",
      change: "1 completed project",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Projects",
      value: "2",
      change: "1 pending funding",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Success Rate",
      value: "100%",
      change: "All projects completed",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      filterStatus === "all" ||
      (project.escrow && project.escrow.status === filterStatus) ||
      (filterStatus === "unfunded" && !project.escrow);
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDepositFunds = async (amount: number, paymentMethod: string) => {
    // Mock API call
    console.log("Depositing funds:", { amount, paymentMethod });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Update project status
    // This would normally be handled by the backend and state management
  };

  const handleReleaseFunds = async (rating: number, feedback: string) => {
    // Mock API call
    console.log("Releasing funds:", { rating, feedback });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Update project status
  };

  const getUserRole = (): "client" | "agent" | "organization" => {
    // This would come from auth context
    return "client";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton dashboardType="client" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Escrow Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your secure payments and project funds
              </p>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
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

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
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
              <option value="unfunded">Unfunded</option>
              <option value="funded">Funded</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="released">Released</option>
              <option value="dispute">Dispute</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Projects
            </h2>
            {filteredProjects.map((project) => (
              <EscrowCard
                key={project.id}
                project={project}
                userRole={getUserRole()}
                onDepositFunds={handleDepositFunds}
                onReleaseFunds={handleReleaseFunds}
              />
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {/* Timeline Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            {selectedProject?.escrow && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <EscrowTimeline events={selectedProject.escrow.timeline} />
              </div>
            )}

            {!selectedProject && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <p className="text-gray-600 text-center">
                  Select a project to view timeline
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
