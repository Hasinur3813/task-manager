import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-slate-900">
      <span className="loading loading-spinner loading-xl text-accent"></span>
    </div>
  );
};

export default Loader;
