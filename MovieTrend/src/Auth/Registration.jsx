import { useForm } from "react-hook-form";
import { useState } from "react";
import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_AUTHENTICATION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [notification, setNotification] = useState(null);

  const onSubmit = async (data) => {
    try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("email", data.email),
      ]);

      if (result.documents.length > 0) {
        // Show notification if email exists
        setNotification({
          message: "Email already exists",
          type: "error",
        });

        // Remove notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        console.log("Creating new User");
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          username: data.name,
          email: data.email,
          password: data.password,
        });
        console.log("User created successfully");

        // Show success notification
        setNotification({
          message: "User created successfully",
          type: "success",
        });

        // Remove notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.error(`Error updating search count: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6 bg-gradient-to-r from-violet-800  h-15 w-auto pt-3">
          Create an Account
        </h2>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed right-0 bottom-15 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 ${
              notification.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-gray-400 block">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
            className="w-full bg-blue-600 p-3 text-white rounded hover:bg-blue-700 transition cursor-pointer "
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
