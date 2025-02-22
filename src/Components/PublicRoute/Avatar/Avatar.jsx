import React from "react";
import { useAuth } from "../../../context/AuthProvider";

const Avatar = () => {
  const { currentUser, logout } = useAuth();
  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost ring-3 dark:ring-accent ring-primary ring-offset-2 btn-circle avatar"
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <a href="#" className="text-base">
            Profile
          </a>
        </li>
        <li>
          <button
            onClick={handleLogOut}
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
