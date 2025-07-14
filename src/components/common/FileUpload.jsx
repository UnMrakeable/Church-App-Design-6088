import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SafeIcon from './SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiX, FiVideo, FiFile, FiFileText } = FiIcons;

const FileUpload = ({ type, onUpload, onCancel }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: type === 'video' 
      ? { 'video/*': ['.mp4', '.avi', '.mov', '.wmv'] }
      : { 
          'application/*': ['.ppt', '.pptx', '.pdf'],
          'application/pdf': ['.pdf'],
          'application/vnd.ms-powerpoint': ['.ppt'],
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
        },
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length > 0) {
        setUploadType('file');
      }
    }
  });

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (uploadType === 'url' && url.trim()) {
      onUpload({
        title: title.trim(),
        url: url.trim(),
        type: type === 'video' ? 'youtube' : 'file',
        uploadedAt: new Date().toISOString()
      });
    } else if (uploadType === 'file' && acceptedFiles.length > 0) {
      // In a real app, you'd upload the file to a server here
      const file = acceptedFiles[0];
      onUpload({
        title: title.trim(),
        url: `/uploads/${file.name}`, // Mock URL
        type: 'file',
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });
    }
  };

  const getFileIcon = () => {
    if (type === 'video') return FiVideo;
    return FiFileText;
  };

  const getAcceptedFileTypes = () => {
    if (type === 'video') return 'MP4, AVI, MOV, WMV';
    return 'PowerPoint (PPT, PPTX), PDF';
  };

  return (
    <div className="space-y-4">
      {type === 'video' && (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setUploadType('url')}
            className={`flex-1 py-2 px-4 rounded-lg font-body transition-colors ${
              uploadType === 'url'
                ? 'bg-primary-500 text-white'
                : 'bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300'
            }`}
          >
            YouTube/Vimeo URL
          </button>
          <button
            onClick={() => setUploadType('file')}
            className={`flex-1 py-2 px-4 rounded-lg font-body transition-colors ${
              uploadType === 'file'
                ? 'bg-primary-500 text-white'
                : 'bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300'
            }`}
          >
            Upload File
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
          {type === 'video' ? 'Video Title' : 'File Title'}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
          placeholder={`Enter ${type} title...`}
        />
      </div>

      {uploadType === 'url' && type === 'video' ? (
        <div>
          <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
            Video URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
            {type === 'video' ? 'Video File' : 'PowerPoint / PDF File'}
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                : 'border-peace-300 dark:border-peace-600 hover:border-primary-400'
            }`}
          >
            <input {...getInputProps()} />
            <SafeIcon
              icon={getFileIcon()}
              className="w-12 h-12 mx-auto mb-4 text-peace-400 dark:text-peace-500"
            />
            {acceptedFiles.length > 0 ? (
              <div>
                <p className="font-medium text-peace-900 dark:text-white font-body">
                  {acceptedFiles[0].name}
                </p>
                <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                  {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                  {acceptedFiles[0].type}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-peace-900 dark:text-white font-body">
                  Drop your {type === 'video' ? 'video' : 'PowerPoint/PDF'} file here
                </p>
                <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                  or click to browse
                </p>
                <p className="text-xs text-peace-500 dark:text-peace-400 font-body mt-2">
                  Accepted formats: {getAcceptedFileTypes()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={
            !title.trim() ||
            (uploadType === 'url' && !url.trim()) ||
            (uploadType === 'file' && acceptedFiles.length === 0)
          }
          className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body"
        >
          Add {type === 'video' ? 'Video' : 'File'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;