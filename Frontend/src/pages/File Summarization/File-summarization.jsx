import React, { useState } from 'react';
import { FileText, Upload, ChevronDown, X, Check, Clock, Download } from 'lucide-react';

const FileSummarization = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Project_Report.pdf', status: 'complete', progress: 100 },
    { id: 2, name: 'Meeting_Notes.docx', status: 'processing', progress: 65 }
  ]);
  const [summaries, setSummaries] = useState([
    {
      id: 1,
      title: 'Project_Report.pdf',
      summary: 'This report outlines the project timeline, key milestones, and resource allocation. The project is expected to be completed by Q4 with a budget of $120,000. Main challenges identified include staffing constraints and potential supply chain issues.',
      date: 'Mar 6, 2025'
    }
  ]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar - using the purple theme from the screenshot */}
        <div className="w-64 bg-purple-900 text-white p-6 flex flex-col">
          <div className="flex items-center mb-10">
            <FileText className="mr-2" />
            <h1 className="text-xl font-semibold">Repobot</h1>
          </div>
          
          <div className="mb-8">
            <p className="text-purple-300 text-sm mb-2">APPLICATION</p>
            <div className="bg-purple-800 bg-opacity-50 p-3 rounded-md mb-2 flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Dashboard</span>
            </div>
            <div className="p-3 rounded-md mb-2 flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Q&A</span>
            </div>
            <div className="bg-purple-800 bg-opacity-50 p-3 rounded-md mb-2 flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Files Summarization</span>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-purple-300 text-sm mb-2">YOUR PROJECTS</p>
            <div className="p-3 rounded-md mb-2 flex items-center">
              <span className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center mr-2">F</span>
              <span>File Analysis</span>
            </div>
            <div className="p-3 rounded-md mb-2 flex items-center">
              <span className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center mr-2">D</span>
              <span>Doc Converter</span>
            </div>
          </div>
          
          <button className="mt-auto flex items-center text-sm text-purple-300">
            <span className="mr-2">+</span>
            <span>Create Project</span>
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="relative w-full max-w-2xl mb-8">
              <input 
                type="text" 
                placeholder="Search for files, summaries, content..." 
                className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <svg className="absolute left-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Files Summarization</h1>
            <p className="text-gray-600 mb-6">Upload documents to get AI-powered summaries in seconds</p>
            
            {/* Upload section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center hover:border-purple-500 transition-colors">
              <div className="animate-bounce-slow mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-900">
                <Upload size={28} />
              </div>
              <h3 className="text-lg font-medium mb-2">Drop files here or browse</h3>
              <p className="text-gray-500 mb-4">Support for PDF, DOCX, TXT, MD files up to 50MB</p>
              <button className="bg-purple-900 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors">
                Select Files
              </button>
            </div>
            
            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Uploaded Files</h2>
                  <div className="relative inline-block text-left">
                    <button 
                      onClick={toggleDropdown}
                      className="flex items-center text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50"
                    >
                      <span>Sort by: Recent</span>
                      <ChevronDown size={16} className="ml-2" />
                    </button>
                    
                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">Recent</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">Name (A-Z)</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">Size</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">Status</a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mr-4">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center mt-1">
                            {file.status === 'complete' ? (
                              <div className="flex items-center text-green-600 text-sm">
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
                        <button className="text-gray-400 hover:text-red-500 p-1" onClick={() => removeFile(file.id)}>
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Summaries */}
            {summaries.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-4">Generated Summaries</h2>
                
                <div className="space-y-6">
                  {summaries.map(summary => (
                    <div 
                      key={summary.id} 
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mr-3">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium">{summary.title}</h3>
                            <p className="text-sm text-gray-500">{summary.date}</p>
                          </div>
                        </div>
                        <button className="text-purple-700 hover:text-purple-900 flex items-center text-sm">
                          <Download size={16} className="mr-1" />
                          <span>Export</span>
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700">{summary.summary}</p>
                        <div className="mt-4 flex">
                          <button className="text-purple-700 hover:text-purple-900 mr-4 text-sm">Regenerate</button>
                          <button className="text-purple-700 hover:text-purple-900 text-sm">View full document</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-purple-700 hover:text-purple-900 font-medium">
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