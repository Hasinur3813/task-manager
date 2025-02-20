import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Form from "../../Components/Form/Form";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { state } = useLocation();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);

    const newTask = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      //   onTaskAdd(newTask);
      toast.success("Task updated successfully!");
      console.log(newTask);
      reset();
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-200 shadow-lg rounded-lg mt-10">
      {/* toast container for toast notification */}
      <Toaster />

      {/* link to go back */}
      <Link
        to={"/dashboard"}
        className="flex gap-1 text-blue-500 items-center font-semibold mb-5"
      >
        <FaArrowLeft /> Go Back
      </Link>
      {/* form heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Task</h2>

      {/* form */}
      <Form
        handleSubmit={handleSubmit}
        onFormSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
        task={state}
        setValue={setValue}
      />
    </div>
  );
};

export default AddTask;
