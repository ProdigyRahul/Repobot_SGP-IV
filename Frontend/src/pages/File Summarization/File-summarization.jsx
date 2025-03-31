import React, { useState } from "react";
import {
  FileText,
  Upload,
  ChevronDown,
  X,
  Check,
  Clock,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FileSummarization = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setIsLoading(true);

    try {
      // Add files to uploadedFiles with 'pending' status
      const newFiles = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        status: "pending",
        progress: 0,
        fileObject: file,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Process each file sequentially
      for (const fileData of newFiles) {
        try {
          // Update status to processing
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileData.id
                ? { ...f, status: "processing", progress: 50 }
                : f
            )
          );

          // Call the API
          const result = await summarizeFile(fileData.fileObject);

          // Add summary to state
          setSummaries((prev) => [
            ...prev,
            {
              id: fileData.id,
              title: result.filename,
              summary: result.summary,
              date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            },
          ]);

          // Update file status to complete
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileData.id
                ? { ...f, status: "complete", progress: 100 }
                : f
            )
          );
        } catch (err) {
          // Update file status to error
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileData.id ? { ...f, status: "error", progress: 0 } : f
            )
          );
          setError(err.message);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
    setSummaries(summaries.filter((summary) => summary.id !== id));
  };

  // ... rest of your component code

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light p-6 flex flex-col">
          <div className="flex items-center mb-10">
            <FileText className="mr-2" />
            <h1 className="text-xl font-semibold">Repobot</h1>
          </div>

          <div className="mb-8">
            <p className="text-accent-light dark:text-accent-dark text-sm mb-2">
              APPLICATION
            </p>
            <Link to="/dashboard">
              <motion.div
                className="p-3 rounded-md mb-2 flex items-center hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                whileHover={{ scale: 1.02 }}
              >
                <FileText size={18} className="mr-2" />
                <span>Dashboard</span>
              </motion.div>
            </Link>
            <Link to="/dashboard/repobot">
              <motion.div
                className="p-3 rounded-md mb-2 flex items-center hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                whileHover={{ scale: 1.02 }}
              >
                <FileText size={18} className="mr-2" />
                <span>Q&A</span>
              </motion.div>
            </Link>
            <div className="bg-accent-light/20 dark:bg-accent-dark/20 p-3 rounded-md mb-2 flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Files Summarization</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-accent-light dark:text-accent-dark text-sm mb-2">
              YOUR PROJECTS
            </p>
            <motion.div
              className="p-3 rounded-md mb-2 flex items-center hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              whileHover={{ scale: 1.02 }}
            >
              <span className="w-6 h-6 rounded-md bg-accent-light/30 dark:bg-accent-dark/30 flex items-center justify-center mr-2">
                F
              </span>
              <span>File Analysis</span>
            </motion.div>
            <motion.div
              className="p-3 rounded-md mb-2 flex items-center hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              whileHover={{ scale: 1.02 }}
            >
              <span className="w-6 h-6 rounded-md bg-accent-light/30 dark:bg-accent-dark/30 flex items-center justify-center mr-2">
                D
              </span>
              <span>Doc Converter</span>
            </motion.div>
          </div>

          <motion.button
            className="mt-auto flex items-center text-sm text-accent-light dark:text-accent-dark hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 p-2 rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            <span className="mr-2">+</span>
            <span>Create Project</span>
          </motion.button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="mb-8">
            <div className="relative w-full max-w-2xl mb-8">
              <input
                type="text"
                placeholder="Search for files, summaries, content..."
                className="w-full p-3 pl-10 rounded-md border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-all"
              />
              <svg
                className="absolute left-3 top-3.5 text-muted-light dark:text-muted-dark"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">
              Files Summarization
            </h1>
            <p className="text-muted-light dark:text-muted-dark mb-6">
              Upload documents to get AI-powered summaries in seconds
            </p>

            {/* Upload section */}
            <motion.div
              className="border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-6 md:p-8 mb-8 text-center hover:border-primary-light dark:hover:border-primary-dark transition-colors cursor-pointer"
              whileHover={{ scale: 1.005 }}
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.docx,.txt,.md,.py,.js,.html,.css"
                multiple
              />
              <div className="animate-bounce-slow mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 text-primary-light dark:text-primary-dark">
                <Upload size={28} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-text-light dark:text-text-dark">
                Drop files here or browse
              </h3>
              <p className="text-muted-light dark:text-muted-dark mb-4">
                Support for PDF, DOCX, TXT, MD, Python, JS, HTML, CSS files up
                to 50MB
              </p>
              <motion.button
                className="bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light px-6 py-2 rounded-md hover:bg-accent-light dark:hover:bg-accent-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                type="button"
              >
                Select Files
              </motion.button>
            </motion.div>

            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <h2 className="text-lg font-medium text-text-light dark:text-text-dark">
                    Uploaded Files
                  </h2>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-sm text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md px-3 py-2 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10"
                    >
                      <span>Sort by: Recent</span>
                      <ChevronDown size={16} className="ml-2" />
                    </button>

                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark z-10">
                        <div className="py-1">
                          <button className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
                            Recent
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
                            Name (A-Z)
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
                            Size
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
                            Status
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <motion.div
                      key={file.id}
                      className="border border-border-light dark:border-border-dark rounded-lg p-4 flex items-center justify-between bg-background-light dark:bg-background-dark hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-primary-light dark:text-primary-dark mr-4">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-text-light dark:text-text-dark">
                            {file.name}
                          </p>
                          <div className="flex items-center mt-1">
                            {file.status === "complete" ? (
                              <div className="flex items-center text-success-text-light dark:text-success-text-dark text-sm">
                                <Check size={14} className="mr-1" />
                                <span>Processed</span>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center text-amber-600 text-sm mb-1">
                                  <Clock size={14} className="mr-1" />
                                  <span>Processing...</span>
                                </div>
                                <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                    style={{ width: `${file.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="text-muted-light dark:text-muted-dark hover:text-error-text-light dark:hover:text-error-text-dark p-1"
                          onClick={() => removeFile(file.id)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Summaries */}
            {summaries.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-4 text-text-light dark:text-text-dark">
                  Generated Summaries
                </h2>

                <div className="space-y-6">
                  {summaries.map((summary) => (
                    <motion.div
                      key={summary.id}
                      className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-background-light dark:bg-background-dark hover:shadow-lg transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="border-b border-border-light dark:border-border-dark p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="w-10 h-10 rounded-lg bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-primary-light dark:text-primary-dark mr-3">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium text-text-light dark:text-text-dark">
                              {summary.title}
                            </h3>
                            <p className="text-sm text-muted-light dark:text-muted-dark">
                              {summary.date}
                            </p>
                          </div>
                        </div>
                        <button className="text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark flex items-center text-sm">
                          <Download size={16} className="mr-1" />
                          <span>Export</span>
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-text-light dark:text-text-dark">
                          {summary.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4">
                          <button className="text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark text-sm">
                            Regenerate
                          </button>
                          <button className="text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark text-sm">
                            View full document
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark font-medium">
                    View all summaries
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSummarization;
