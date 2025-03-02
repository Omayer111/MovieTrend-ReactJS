import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-80"
      >
        <input
          {...register("firstName")}
          placeholder="First name"
          className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
        />
        <select
          {...register("category", { required: true })}
          className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
        >
          <option value="">Select...</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>
        <textarea
          {...register("aboutYou")}
          placeholder="About you"
          className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
        />
        <p className="text-sm text-gray-400">Submitted Data: {data}</p>
        <input
          type="submit"
          className="w-full bg-blue-600 p-2 rounded text-white cursor-pointer hover:bg-blue-700"
        />
      </form>
    </div>
  );
};

export default Login;
