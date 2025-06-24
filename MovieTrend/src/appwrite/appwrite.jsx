import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_TRENDING_ID;
const AUTH_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_COLLECTION_AUTHENTICATION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (search, movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("search", search),
    ]);

    if (result.documents.length > 0) {
      console.log("document available");
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      console.log("Creating new document");
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        search: search,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: toString(movie.id),
      });
    }
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
  }
};

export const getTrending = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(10),
    ]);

    console.log(result.documents);
    return result.documents || [];
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
  }
};

export const userLogin = async ({ data }) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      AUTH_COLLECTION_ID,
      [Query.equal("email", data.email), Query.equal("password", data.password)]
    );

    if (result.documents.length > 0) {
      // If the user exists, log success message
      console.log("Login successful, welcome!");
      return result.documents[0]; // Return user data
    } else {
      // If the user doesn't exist, show error notification
      return false; // Indicate login failure
    }
  } catch (error) {
    console.error(`Error logging in: ${error}`);
  }
};

export const userRegistration = async ({ data }) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, AUTH_COLLECTION_ID, [
      Query.equal("email", data.email),
    ]);

    if (result.documents.length > 0) {
      // Show notification if email exists
      return false; // Indicate registration failure
    } else {
      console.log("Creating new User");
      await database.createDocument(DATABASE_ID, AUTH_COLLECTION_ID, ID.unique(), {
        username: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("User created successfully");

      // Show success notification
      return true; // Indicate registration success
    }
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
  }
};
