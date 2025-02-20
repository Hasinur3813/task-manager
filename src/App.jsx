import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import useAxiosSecure from "./hooks/useAxiosSecure";
import toast from "react-hot-toast";

function App() {
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
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        {currentUser ? (
          <>
            <img
              src={currentUser?.photoURL}
              alt="Profile"
              className="rounded-full w-16 mx-auto"
            />
            <h1 className="text-lg font-bold mt-2">
              {currentUser?.displayName}
            </h1>
            <button
              // onClick={logout}
              className="mt-4 bg-primary text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">Task Manager</h1>
            <button
              onClick={handleLogin}
              className="mt-4 bg-primary cursor-pointer text-white py-2 px-4 rounded"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
