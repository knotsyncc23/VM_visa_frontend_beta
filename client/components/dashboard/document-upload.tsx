import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  File,
  Image,
  FileText,
  X,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  FolderOpen,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  category: string;
  uploadDate: Date;
  status: "uploaded" | "pending" | "approved" | "rejected";
  preview?: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  files: DocumentFile[];
  maxFiles: number;
}

export function DocumentUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("personal");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: DocumentCategory[] = [
    {
      id: "personal",
      name: "Personal Documents",
      description: "Identity and personal information documents",
      required: true,
      maxFiles: 10,
      files: [
        {
          id: "1",
          name: "passport.pdf",
          type: "application/pdf",
          size: 2048000,
          category: "personal",
          uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: "approved",
        },
        {
          id: "2",
          name: "birth_certificate.jpg",
          type: "image/jpeg",
          size: 1024000,
          category: "personal",
          uploadDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
          status: "pending",
        },
      ],
    },
    {
      id: "education",
      name: "Educational Documents",
      description: "Degrees, transcripts, and academic records",
      required: true,
      maxFiles: 15,
      files: [
        {
          id: "3",
          name: "degree_certificate.pdf",
          type: "application/pdf",
          size: 3072000,
          category: "education",
          uploadDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
          status: "approved",
        },
      ],
    },
    {
      id: "employment",
      name: "Employment Records",
      description: "Work experience and employment letters",
      required: true,
      maxFiles: 20,
      files: [],
    },
    {
      id: "financial",
      name: "Financial Documents",
      description: "Bank statements and financial proof",
      required: true,
      maxFiles: 12,
      files: [],
    },
    {
      id: "medical",
      name: "Medical Records",
      description: "Health examinations and medical reports",
      required: false,
      maxFiles: 5,
      files: [],
    },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type === "application/pdf") return FileText;
    return File;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      console.log("Uploading file:", file.name);
      // Simulate file upload
    });
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
          Document Upload
        </h1>
        <p className="text-lg text-cool-gray-600">
          Upload and manage your immigration documents securely
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h2 className="text-lg font-heading font-bold text-cool-gray-800 mb-4">
              Document Categories
            </h2>

            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-200",
                    selectedCategory === category.id
                      ? "bg-white/40 text-royal-blue-700"
                      : "hover:bg-white/20 text-cool-gray-700",
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{category.name}</span>
                    {category.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-cool-gray-600">
                    {category.files.length}/{category.maxFiles} files
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Upload Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0 }}
            className="glass-card p-8 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                {selectedCategoryData?.name}
              </h2>
              <Badge
                className={
                  selectedCategoryData?.required
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }
              >
                {selectedCategoryData?.required ? "Required" : "Optional"}
              </Badge>
            </div>

            <p className="text-cool-gray-600 mb-6">
              {selectedCategoryData?.description}
            </p>

            {/* Drag & Drop Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
                dragActive
                  ? "border-royal-blue-500 bg-royal-blue-50"
                  : "border-cool-gray-300 hover:border-royal-blue-400",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-cool-gray-800 mb-2">
                Drag & drop files here
              </h3>
              <p className="text-cool-gray-600 mb-6">
                or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-royal-blue-600 hover:text-royal-blue-700 font-semibold"
                >
                  browse files
                </button>
              </p>

              <div className="flex flex-wrap gap-2 justify-center text-xs text-cool-gray-500">
                <span>Supported: PDF, JPG, PNG, DOC</span>
                <span>•</span>
                <span>Max size: 10MB per file</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* Files List */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-bold text-cool-gray-800">
                Uploaded Files
              </h3>
              <span className="text-sm text-cool-gray-600">
                {selectedCategoryData?.files.length || 0} files
              </span>
            </div>

            {selectedCategoryData?.files.length ? (
              <div className="space-y-4">
                {selectedCategoryData.files.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-white/20 rounded-2xl border border-white/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-sage rounded-lg flex items-center justify-center">
                          <FileIcon className="w-5 h-5 text-white" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-cool-gray-800">
                            {file.name}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-cool-gray-600">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{file.uploadDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge
                          className={cn(
                            "text-xs",
                            file.status === "approved"
                              ? "bg-sage-green-100 text-sage-green-700"
                              : file.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700",
                          )}
                        >
                          {file.status}
                        </Badge>

                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              alert(`Opening preview for ${file.name}...`);
                              // Mock file preview
                              window.open(`#preview/${file.id}`, '_blank');
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              alert(`Downloading ${file.name}...`);
                              // Mock file download
                              const link = document.createElement('a');
                              link.href = '#';
                              link.download = file.name;
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${file.name}?`)) {
                                alert(`${file.name} has been deleted.`);
                                // Remove file from category
                              }
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-cool-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-cool-gray-800 mb-2">
                  No files uploaded
                </h4>
                <p className="text-cool-gray-600">
                  Upload your first document to get started
                </p>
              </div>
            )}
          </motion.div>

          {/* AI Document Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0 }}
            className="glass-card p-6 rounded-3xl bg-gradient-to-br from-royal-blue-50 to-sky-blue-50 border border-royal-blue-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-royal rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-heading font-bold text-royal-blue-800">
                AI Document Recommendations
              </h3>
            </div>

            <p className="text-royal-blue-700 mb-4">
              Based on your visa type, here are the recommended documents for
              the "{selectedCategoryData?.name}" category:
            </p>

            <ul className="space-y-2 text-sm text-royal-blue-700">
              {selectedCategory === "personal" && (
                <>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-sage-green-600" />
                    <span>Valid passport (completed)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span>Birth certificate (pending review)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-royal-blue-600" />
                    <span>Marriage certificate (if applicable)</span>
                  </li>
                </>
              )}
              {selectedCategory === "education" && (
                <>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-sage-green-600" />
                    <span>Degree certificate (completed)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-royal-blue-600" />
                    <span>Official transcripts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-royal-blue-600" />
                    <span>Educational Credential Assessment (ECA)</span>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
