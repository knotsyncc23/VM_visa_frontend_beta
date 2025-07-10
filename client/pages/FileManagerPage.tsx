import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/dashboard/shared/BackButton";
import {
  Upload,
  FolderOpen,
  FileText,
  Image,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Plus,
  Star,
  Share2,
} from "lucide-react";

export default function FileManagerPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const folders = [
    {
      id: "1",
      name: "Client Documents",
      files: 45,
      color: "bg-blue-100 text-blue-600",
      icon: FolderOpen,
    },
    {
      id: "2",
      name: "Templates",
      files: 12,
      color: "bg-green-100 text-green-600",
      icon: FolderOpen,
    },
    {
      id: "3",
      name: "Certificates",
      files: 8,
      color: "bg-purple-100 text-purple-600",
      icon: FolderOpen,
    },
    {
      id: "4",
      name: "Proposals",
      files: 23,
      color: "bg-orange-100 text-orange-600",
      icon: FolderOpen,
    },
  ];

  const files = [
    {
      id: "1",
      name: "John_Smith_Passport.pdf",
      type: "PDF",
      size: "2.4 MB",
      modified: "2 hours ago",
      client: "John Smith",
      starred: true,
    },
    {
      id: "2",
      name: "Visa_Application_Template.docx",
      type: "Document",
      size: "156 KB",
      modified: "1 day ago",
      client: "Template",
      starred: false,
    },
    {
      id: "3",
      name: "Client_Photo_Emma.jpg",
      type: "Image",
      size: "890 KB",
      modified: "3 days ago",
      client: "Emma Johnson",
      starred: false,
    },
    {
      id: "4",
      name: "Canada_PR_Proposal.pdf",
      type: "PDF",
      size: "1.8 MB",
      modified: "1 week ago",
      client: "Michael Chen",
      starred: true,
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "Document":
        return <FileText className="w-8 h-8 text-blue-500" />;
      case "Image":
        return <Image className="w-8 h-8 text-green-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
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
              <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
              <p className="text-gray-600">
                Organize and manage your documents and client files
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? (
                <List className="w-4 h-4" />
              ) : (
                <Grid className="w-4 h-4" />
              )}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Quick Actions */}
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedFiles.length} file(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Folders Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${folder.color}`}
                  >
                    <folder.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{folder.name}</h3>
                    <p className="text-sm text-gray-500">
                      {folder.files} files
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Files Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Files
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer ${
                    selectedFiles.includes(file.id)
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {getFileIcon(file.type)}
                      <div className="flex items-center space-x-1">
                        {file.starred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {file.size} • {file.modified}
                      </p>
                      <Badge variant="secondary" className="text-xs mt-2">
                        {file.client}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="divide-y divide-gray-200">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedFiles.includes(file.id) ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleFileSelect(file.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {file.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {file.size} • {file.modified} • {file.client}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.starred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
