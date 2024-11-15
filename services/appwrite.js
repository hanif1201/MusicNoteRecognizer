import { Client, Databases, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("67373093002d5c545778"); // Your project ID

const databases = new Databases(client);
const storage = new Storage(client);

export const uploadFile = async (file) => {
  try {
    // Use Storage instead of Databases for file uploads
    const response = await storage.createFile(
      "673735c60002245ad8cc", // Bucket ID
      ID.unique(), // Unique file ID
      file // File object
    );
    return response;
  } catch (error) {
    console.error("File upload error", error);
    throw error;
  }
};
