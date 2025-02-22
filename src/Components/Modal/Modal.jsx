import React from "react";

const Modal = ({ handleDelete }) => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box dark:bg-slate-800">
        <h3 className="font-bold text-lg dark:text-white">Warning!</h3>
        <p className="py-4 dark:text-white">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex gap-2">
              <button onClick={handleDelete} className="btn btn-error">
                Delete
              </button>
              <button className="btn">Close</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
