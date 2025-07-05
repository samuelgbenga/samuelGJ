import React, { useState, useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
import { add_photo_update } from "../../api/apiService";

const EditPhotoForm = ({ editFiles = [], projectId }) => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const { deletePhotoFromProject, addPhotoToProject, isLoading } =
    useProjects();
const [newFiles, setNewFiles] = useState([]);

  // On mount, set previews for existing files
  useEffect(() => {
    if (editFiles && editFiles.length > 0) {
      setExistingFiles(editFiles);
    }
  }, [editFiles]);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove newly added file
  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setFilePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Remove existing file
  const removeExistingFile = async (idx, id) => {
    // console.log(idx);

    // console.log(id);

    // console.log(projectId);

    try {
      const response = await deletePhotoFromProject(projectId, id);
      console.log(response);
      response && setExistingFiles((prev) => prev.filter((_, i) => i !== idx));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFiles = async () => {
    if (files.length <= 0) return;

    // const formData = new FormData();
    // formData.append("multipartFiles", files);

    const formData = new FormData();
    files.forEach((file) => formData.append("multipartFiles", file));
    // const formData = {
    //    "multipartFiles": files,
    // }

    // console.log(files);
    try {
      const response = await addPhotoToProject(projectId, formData);
      console.log(response);
      if (response) {
        setExistingFiles(response.photo)
        setFiles([]);
        setFilePreviews([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Edit Project Images (you can select multiple)
      </label>

      <div className="flex flex-wrap gap-2 mt-2">
        {/* Existing images */}
        {existingFiles.map((file, idx) => (
          <div key={file.id || idx} className="relative">
            <img
              src={file.url}
              alt={`existing-${idx}`}
              className="h-20 w-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeExistingFile(idx, file.id)}
              className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div>
        <input
          id="project-files"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          className="hidden"
        />
        <label
          htmlFor="project-files"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Add file
        </label>
      </div>
      <button type="button" onClick={() => handleAddFiles()}>
        {`${isLoading ? "Loading..." : "Commit Change"}`}
      </button>

      <div className="flex flex-wrap gap-2 mt-2">
        {/* New images */}
        {filePreviews.map((src, idx) => (
          <div key={src} className="relative">
            <img
              src={src}
              alt={`preview-${idx}`}
              className="h-20 w-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeFile(idx)}
              className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {/* Add your submit button and logic here */}
    </div>
  );
};

export default EditPhotoForm;
