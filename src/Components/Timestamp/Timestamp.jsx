import React from "react";

const Timestamp = ({ t }) => {
  return (
    <p className="mt-4 text-xs bg-gradient-to-r from-accent to-accent/80 text-white px-3 py-1 rounded-lg shadow-md font-medium inline-block">
      {t?.modified
        ? `Modified: ${new Date(t.modified).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}`
        : `Created: ${new Date(t.timestamp).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}`}
    </p>
  );
};

export default Timestamp;
