import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";

function Login() {
  const { signInWithGoogle, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosSecure();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
      };
      const res = await axios.post("/auth/login", userData);
      if (res.data.data?.insertedId) {
        toast.success("Registration successful");
      }
      if (res.data.type === "existing") {
        toast.success("Login successful");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4">
      <div className="absolute top-6 left-6">
        <button variant="ghost" onClick={() => navigate(-1)}>
          {/* <ArrowLeft className="mr-2" /> Back */}
          Go back
        </button>
      </div>
      <div className="p-8 bg-white shadow-2xl rounded-2xl text-center max-w-sm w-full text-gray-900">
        {currentUser ? (
          <>
            <img
              src={currentUser?.photoURL}
              alt="Profile"
              className="rounded-full w-20 mx-auto shadow-md border-2 border-gray-300"
            />
            <h1 className="text-2xl font-bold mt-4">
              {currentUser?.displayName}
            </h1>
            <button
              onClick={logout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white w-full py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <p className="text-gray-500 mt-2">
              Sign in to manage your tasks efficiently.
            </p>
            <button
              onClick={handleLogin}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 px-4 rounded-lg"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
