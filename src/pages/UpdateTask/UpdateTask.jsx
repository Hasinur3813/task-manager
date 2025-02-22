import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Form from "../../Components/Form/Form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";

const UpdateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  const { currentUser } = useAuth();

  const { data: singleTask, isLoading } = useQuery({
    queryKey: ["singleTask", currentUser?.email],
    queryFn: async () => {
      const res = await axios.get(`/tasks/single-task/${id}`);
      return res.data.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const newTask = {
      ...data,
      user: currentUser.email,
      modified: new Date().toISOString(),
    };
    try {
      setLoading(true);
      const res = await axios.put(`/tasks/update/${id}`, newTask);
      if (res.data?.success) {
        toast.success(res.data?.message);
        navigate("/dashboard");
      }
    } catch {
      toast.error("Faild to update, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className="px-3 min-h-screen flex justify-center items-center dark:bg-slate-900">
      <div className="max-w-lg w-full mx-auto px-6 py-12 bg-slate-200 dark:bg-slate-800 shadow-lg rounded-lg mt-10">
        {/* link to go back */}
        <Link
          to={"/dashboard"}
          className="flex gap-1 text-primary items-center font-semibold mb-5 dark:text-accent"
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
          task={singleTask}
          setValue={setValue}
        />
      </div>
    </section>
  );
};

export default UpdateTask;
