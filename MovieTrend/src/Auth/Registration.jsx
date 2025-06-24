import { useForm } from "react-hook-form";
import { useState } from "react";
import { userRegistration } from "../appwrite/appwrite";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [notification, setNotification] = useState(null);

  const onSubmit = async (data) => {
    let res = await userRegistration({data});
    if (res) {
      setNotification({
        message: "Registration successful! Please log in.",
        type: "success",
      });
      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setNotification({
        message: "Registration failed. Please try again.",
        type: "error",
      });
    }
  };

  return (
     <div className="wrapper min-h-screen flex flex-col justify-center items-center bg-[#030014] p-4">
      {/* Main form container: Increased size, padding, and shadow for a more prominent look */}
      <div className="w-full max-w-lg bg-[#13092c] p-12 rounded-xl shadow-2xl my-10">
        {/* Header: Larger font size and more vertical space */}
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Create Your Account
        </h2>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 ${
              notification.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-4 bg-gray-800 text-gray-100 rounded-md border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-4 bg-gray-800 text-gray-100 rounded-md border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-4 bg-gray-800 text-gray-100 rounded-md border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button: Larger, better hover/focus states, and a subtle transform */}
          <button
            type="submit"
            className="w-full bg-indigo-600 p-4 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-transform transform hover:scale-105 duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login page */}
        <p className="text-gray-400 text-center text-sm mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
