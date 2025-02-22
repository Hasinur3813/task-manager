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
  const { title, description, category } = data || {};

  useEffect(() => {
    if (data) {
      setValue("title", title);
      setValue("description", description);
      setValue("category", category);
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* title */}
      <div>
        <label className="block font-medium text-gray-700 dark:text-white">
          Title
        </label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: 50,
          })}
          type="text"
          className="w-full dark:bg-slate-700 dark:placeholder-gray-400 dark:text-white dark:border-none border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* description */}
      <div>
        <label className="block font-medium text-gray-700 dark:text-white">
          Description
        </label>
        <textarea
          rows={5}
          {...register("description", { maxLength: 200 })}
          className="w-full dark:bg-slate-700 dark:placeholder-gray-400 dark:text-white dark:border-none border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
          placeholder="Enter task description (optional)"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Max 200 characters allowed.</p>
        )}
      </div>

      {/* status */}
      {data && (
        <div>
          <label className="block font-medium text-gray-700 dark:text-white">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full dark:bg-slate-700 dark:placeholder-gray-400 dark:text-white dark:border-none border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"
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
      )}
      <button
        type="submit"
        className="w-full bg-accent cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-primaryAccent transition duration-200"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : title ? (
          "Update Task"
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );
};

export default Form;
