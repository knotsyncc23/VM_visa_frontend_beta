import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Folder,
  File,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Share,
} from "lucide-react";

export function AgentDocuments() {
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const folders = [
    { id: "all", name: "All Documents", count: 45, icon: FileText },
    { id: "templates", name: "Templates", count: 12, icon: Folder },
    { id: "client-docs", name: "Client Documents", count: 18, icon: User },
    { id: "forms", name: "Government Forms", count: 8, icon: FileText },
    { id: "certificates", name: "Certificates", count: 7, icon: CheckCircle },
  ];

  const documents = [
    {
      id: "1",
      name: "H1B_Application_Template.pdf",
      type: "template",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      client: null,
      status: "verified",
      category: "Work Visa",
      downloads: 24,
      shared: true,
    },
    {
      id: "2",
      name: "John_Smith_Passport.pdf",
      type: "client-doc",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      client: "John Smith",
      status: "pending",
      category: "Identity",
      downloads: 3,
      shared: false,
    },
    {
      id: "3",
      name: "Study_Visa_Checklist.docx",
      type: "template",
      size: "156 KB",
      uploadDate: "2024-01-12",
      client: null,
      status: "verified",
      category: "Study Visa",
      downloads: 18,
      shared: true,
    },
    {
      id: "4",
      name: "Sarah_Johnson_Transcripts.pdf",
      type: "client-doc",
      size: "3.2 MB",
      uploadDate: "2024-01-10",
      client: "Sarah Johnson",
      status: "verified",
      category: "Education",
      downloads: 1,
      shared: false,
    },
    {
      id: "5",
      name: "I-94_Form_Template.pdf",
      type: "form",
      size: "890 KB",
      uploadDate: "2024-01-08",
      client: null,
      status: "verified",
      category: "Government Form",
      downloads: 15,
      shared: true,
    },
    {
      id: "6",
      name: "IELTS_Certificate_David_Kim.pdf",
      type: "certificate",
      size: "1.1 MB",
      uploadDate: "2024-01-06",
      client: "David Kim",
      status: "verified",
      category: "Language Test",
      downloads: 2,
      shared: false,
    },
    {
      id: "7",
      name: "PR_Application_Guide.pdf",
      type: "template",
      size: "4.5 MB",
      uploadDate: "2024-01-05",
      client: null,
      status: "verified",
      category: "Permanent Residency",
      downloads: 31,
      shared: true,
    },
    {
      id: "8",
      name: "Medical_Exam_Report_Maria.pdf",
      type: "client-doc",
      size: "2.1 MB",
      uploadDate: "2024-01-03",
      client: "Maria Garcia",
      status: "expired",
      category: "Medical",
      downloads: 1,
      shared: false,
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesFolder =
      selectedFolder === "all" ||
      (selectedFolder === "templates" && doc.type === "template") ||
      (selectedFolder === "client-docs" && doc.type === "client-doc") ||
      (selectedFolder === "forms" && doc.type === "form") ||
      (selectedFolder === "certificates" && doc.type === "certificate");

    const matchesSearch =
      searchTerm === "" ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.client &&
        doc.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "expired":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-8 h-8 text-blue-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const calculateStats = () => {
    const total = documents.length;
    const verified = documents.filter((d) => d.status === "verified").length;
    const pending = documents.filter((d) => d.status === "pending").length;
    const totalSize = documents.reduce((sum, d) => {
      const size = parseFloat(d.size.split(" ")[0]);
      return sum + size;
    }, 0);

    return { total, verified, pending, totalSize: totalSize.toFixed(1) };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#f0f4ff" }}
            >
              <FileText className="w-6 h-6" style={{ color: "#326dee" }} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Documents
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Verified</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Pending Review
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Storage Used
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalSize} MB
          </p>
        </motion.div>
      </div>

      {/* Header with Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Document Library
            </h2>
            <p className="text-gray-600">
              Manage your templates and client documents
            </p>
          </div>
          <Button style={{ backgroundColor: "#326dee" }}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              style={{
                backgroundColor:
                  viewMode === "grid" ? "#326dee" : "transparent",
              }}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              style={{
                backgroundColor:
                  viewMode === "list" ? "#326dee" : "transparent",
              }}
            >
              List
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Folders</h3>
          <div className="space-y-2">
            {folders.map((folder) => (
              <motion.button
                key={folder.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  selectedFolder === folder.id
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor:
                    selectedFolder === folder.id ? "#326dee" : "transparent",
                }}
              >
                <div className="flex items-center space-x-3">
                  <folder.icon className="w-5 h-5" />
                  <span className="font-medium">{folder.name}</span>
                </div>
                <Badge
                  className={`text-xs ${
                    selectedFolder === folder.id
                      ? "bg-white/20 text-white hover:bg-white/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {folder.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Documents Grid/List */}
        <div className="lg:col-span-3">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.name)}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-gray-600">{doc.size}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Category</span>
                      <span className="text-gray-900">{doc.category}</span>
                    </div>
                    {doc.client && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Client</span>
                        <span className="text-gray-900">{doc.client}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Uploaded</span>
                      <span className="text-gray-900">{doc.uploadDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Downloads</span>
                      <span className="text-gray-900">{doc.downloads}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {getFileIcon(doc.name)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {doc.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.category}</span>
                            {doc.client && (
                              <>
                                <span>•</span>
                                <span>{doc.client}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status}</span>
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
            >
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#f0f4ff" }}
              >
                <FileText className="w-8 h-8" style={{ color: "#326dee" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No documents found
              </h3>
              <p className="text-gray-600 mb-4">
                Upload your first document or adjust your search criteria.
              </p>
              <Button style={{ backgroundColor: "#326dee" }}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
