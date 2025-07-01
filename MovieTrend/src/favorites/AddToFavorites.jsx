import React from "react";
import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_FAVORITES_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

export const AddToFavorites = async ({ user, movie }) => {
  const movie_id = movie.id;
  const movieData = [
  `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  String(movie.title),
  String(movie.overview),
  String(movie.vote_average?.toFixed(1)),
  String(movie.vote_count),
  String(movie.original_language),
  String(movie.release_date?.substr(0, 4)),
  String(movie.id)
];
  console.log(movieData);

  try {
    console.log("Creating new movie doc");
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      email: user,
      movie: movieData,
      movie_id: movie_id,
    });
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
  }
};

export const RemoveFromFavorites = async ({ user, movie }) => {
  // console.log("Removing movie from favorites");
  const movie_id = movie.id;
  try {
    console.log("Removing movie doc");
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("email", user),
    ]);

    result.documents.forEach(async (movie_object) => {
      if (movie_object.movie_id === movie_id) {
        await database.deleteDocument(
          DATABASE_ID,
          COLLECTION_ID,
          movie_object.$id
        );
      }
    });
  } catch (error) {
    console.error(`Error removing movie: ${error}`);
  }
};

export const getFavorites = async ({ user }) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("email", user),
    ]);

    console.log(result.documents);
    return result.documents || [];
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
  }
};

export const userPanelRemoveFromFavorites = async ({ user, movie }) => {
  // console.log("Removing movie from favorites");
  const movie_id = movie.movie_id;
  try {
    console.log("Removing movie doc");
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("email", user),
    ]);

    result.documents.forEach(async (movie_object) => {
      if (movie_object.movie_id === movie_id) {
        await database.deleteDocument(
          DATABASE_ID,
          COLLECTION_ID,
          movie_object.$id
        );
      }
    });
  } catch (error) {
    console.error(`Error removing movie: ${error}`);
  }
};
