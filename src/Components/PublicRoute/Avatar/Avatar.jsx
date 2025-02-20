import React from "react";
import { useAuth } from "../../../context/AuthProvider";

const Avatar = () => {
  const { currentUser } = useAuth();
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            src={currentUser?.photoURL}
            alt="Profile"
            className="rounded-full w-10"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <a href="#" className="text-base">
            Profile
          </a>
        </li>
        <li>
          <button
            className="text-red-500 font-semibold text-base"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
