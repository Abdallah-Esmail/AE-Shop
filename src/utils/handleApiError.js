import toast from "react-hot-toast";

export const handleApiError = (
  err,
  fallbackMessage = "Server connection failed",
) => {
  let resErrors;

  if (err?.data?.errors) {
    resErrors = err.data.errors;
  } else if (err?.data?.message) {
    resErrors = err.data.message;
  } else if (typeof err?.data === "string") {
    resErrors = err.data;
  } else {
    resErrors = err?.error || fallbackMessage;
  }

  const errorList = Array.isArray(resErrors) ? resErrors : [resErrors];

  errorList.forEach((errorItem) => {
    const message =
      typeof errorItem === "object"
        ? errorItem?.msg || errorItem?.message || fallbackMessage
        : errorItem;

    toast.error(message);
  });
};
