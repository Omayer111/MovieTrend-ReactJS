import { useForm } from "react-hook-form";
import { useState } from "react";
import { Client, Databases, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_AUTHENTICATION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

const Login = () => {
  const {login, isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("email", data.email),
        Query.equal("password", data.password),
      ]);

      if (result.documents.length > 0) {
        // If the user exists, log success message
        console.log("Login successful, welcome!");
        login();
        navigate("/user-panel");
      } else {
        // If the user doesn't exist, show error notification
        setNotification({
          message: "User does not exist. Please sign up.",
          type: "error",
        });

        // Remove notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.error(`Error logging in: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6 bg-gradient-to-r from-emerald-600 to-stone-80 h-15 w-auto pt-3">
          Sign In
        </h2>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 ${
              notification.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-gray-400 block">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-400 block">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 p-3 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
