import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center h-32 z-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
  </div>
);

export default Spinner;
