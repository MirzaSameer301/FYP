import React from "react";
import { toast } from "react-toastify";

export const showConfirmToast = (message, onConfirm) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div className="text-center">
        <p className="mb-3">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(toastId);
            }}
            className="px-4 py-1 bg-red-600 text-white rounded-lg shadow"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-1 bg-gray-300 text-black rounded-lg shadow"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    }
  );
};
