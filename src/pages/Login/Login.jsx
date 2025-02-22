import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaArrowLeft, FaGoogle } from "react-icons/fa6";

function Login() {
  const { signInWithGoogle } = useAuth();
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
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:bg-gray-900 text-white px-4">
      <div className="absolute top-6 left-6">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
      <div className="p-8 bg-white shadow-2xl rounded-2xl text-center max-w-sm w-full text-gray-900">
        <>
          <h1 className="text-3xl font-bold">Task Flow</h1>
          <p className="text-gray-500 mt-2">
            Sign in to manage your tasks efficiently.
          </p>
          <button
            onClick={handleLogin}
            className="mt-6 bg-primary hover:bg-primary/80 cursor-pointer text-lg font-semibold text-white w-full py-3 px-4 rounded-lg flex justify-center items-center gap-3"
          >
            <FaGoogle className="text-xl" />
            <span className="leading-none">Sign in with Google</span>
          </button>
        </>
      </div>
    </div>
  );
}

export default Login;
