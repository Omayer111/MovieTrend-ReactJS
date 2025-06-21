import React from "react";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center my-4 space-x-2">
      {/* <button
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1 bg-yellow-700 text-white rounded cursor-pointer"
      >
        Home
      </button> */}
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-5 py-2 bg-yellow-700 text-white rounded disabled:opacity-50 cursor-pointer"
      >
        Back
      </button>
      <span className="px-5 py-2 text-white text-[20px]">{page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        className="px-5 py-2 bg-yellow-700 text-white rounded cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
