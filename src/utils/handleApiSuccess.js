import toast from "react-hot-toast";

export const handleApiSuccess = (message = "Success") => {
  toast.success(message);
};
