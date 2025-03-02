import { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  console.log(message, type);

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 
      ${type === "error" ? "bg-red-600" : "bg-green-600"}
    `}>
      {message}
    </div>
  );
};

export default Notification;
