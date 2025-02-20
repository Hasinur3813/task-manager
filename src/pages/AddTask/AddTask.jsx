import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Form from "../../Components/Form/Form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthProvider";
import useTasks from "../../hooks/useTasks";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { refetch } = useTasks();

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);

    const newTask = {
      ...data,
      category: "todo",
      user: currentUser.email,
      timestamp: new Date().toISOString(),
    };
    try {
      const res = await axios.post("/add-task", newTask);
      if (res.data.data.insertedId) {
        toast.success("Task added successfully");
        reset();
        setLoading(false);
        refetch();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-200 shadow-lg rounded-lg mt-10">
      {/* link to go back */}
      <Link
        to={"/dashboard"}
        className="flex gap-1 text-blue-500 items-center font-semibold mb-5"
      >
        <FaArrowLeft /> Go Back
      </Link>
      {/* form heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>

      {/* form */}
      <Form
        handleSubmit={handleSubmit}
        onFormSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
      />
    </div>
  );
};

export default AddTask;
