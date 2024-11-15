import { Client, Databases, Storage, ID, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67373093002d5c545778");

// Initialize Appwrite Services
const databases = new Databases(client);
const storage = new Storage(client);

// File Upload Service
export const uploadFile = async (file, onProgress = null) => {
  try {
    // Check if file exists
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file size (optional)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size && file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 10MB limit");
    }

    // Create upload promise with progress tracking
    const uploadPromise = storage.createFile(
      "673735c60002245ad8cc", // Bucket ID
      ID.unique(), // Unique file ID
      file, // File object
      undefined, // Permissions (optional)
      onProgress // Progress callback
    );

    // Execute upload
    const response = await uploadPromise;

    return {
      success: true,
      fileId: response.$id,
      fileName: response.name,
      fileUrl: storage.getFilePreview("673735c60002245ad8cc", response.$id),
    };
  } catch (error) {
    console.error("File upload error", error);

    // Detailed error handling
    const errorResponse = {
      success: false,
      message: error.message,
      code: error.code,
      type: error.type,
    };

    throw errorResponse;
  }
};

// File Download Service
export const downloadFile = async (fileId) => {
  try {
    const download = storage.getFileDownload("673735c60002245ad8cc", fileId);
    return download;
  } catch (error) {
    console.error("File download error", error);
    throw error;
  }
};

// List Files in Storage
export const listFiles = async (queries = []) => {
  try {
    const fileList = await storage.listFiles(
      "673735c60002245ad8cc",
      queries // Optional query parameters
    );
    return fileList;
  } catch (error) {
    console.error("File listing error", error);
    throw error;
  }
};

// Delete File
export const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile("673735c60002245ad8cc", fileId);
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("File deletion error", error);
    throw error;
  }
};

// // Export additional Appwrite utilities
// export {
//   client,
//   databases,
//   storage,
//   ID,
//   Query
// };
