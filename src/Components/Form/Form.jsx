import { useEffect } from "react";

const Form = ({
  handleSubmit,
  onFormSubmit,
  register,
  loading,
  errors,
  task: data,
  setValue,
}) => {
  const { task, description, status } = data || {};

  useEffect(() => {
    if (data) {
      setValue("title", task);
      setValue("description", description);
      setValue("category", status);
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* title */}
      <div>
        <label className="block font-medium text-gray-700">Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: 50,
          })}
          type="text"
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* description */}
      <div>
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          {...register("description", { maxLength: 200 })}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
          placeholder="Enter task description (optional)"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Max 200 characters allowed.</p>
        )}
      </div>

      {/* status */}
      <div>
        <label className="block font-medium text-gray-700">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Category</option>
          <option value="todo">To-Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-primary cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-primaryAccent transition duration-200"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : task ? (
          "Update Task"
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );
};

export default Form;
