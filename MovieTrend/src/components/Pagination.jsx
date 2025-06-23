import React from "react";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center my-10 space-x-2">
      {/* <button
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1 bg-yellow-700 text-white rounded cursor-pointer"
      >
        Home
      </button> */}
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-5 py-2 bg-yellow-700 text-white rounded disabled:opacity-50 cursor-pointer focus-outline-none focus:ring-2 focus:ring-offset-amber-200 transition duration-300 hover:scale-105 active:scale-95"
      >
        Back
      </button>
      <span className="px-5 py-2 text-white text-[20px]">{page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        className="px-5 py-2 bg-yellow-700 text-white rounded disabled:opacity-50 cursor-pointer focus-outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 hover:scale-105 active:scale-95"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
