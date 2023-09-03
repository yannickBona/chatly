import { toast, ToastOptions, TypeOptions } from "react-toastify";

const notify = (type: TypeOptions, message: string) => {
  // Default toast options
  const options: ToastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    hideProgressBar: true,
    draggable: false,
    autoClose: 3000,
    type,
  };

  // Show toast notification
  toast(message, options);
};

export const notifySuccess = (message: string) => {
  return notify("success", message);
};

export const notifyError = (message: string) => {
  return notify("error", message);
};

export const notifyInfo = (message: string) => {
  return notify("info", message);
};

export const notifyWarning = (message: string) => {
  return notify("warning", message);
};
