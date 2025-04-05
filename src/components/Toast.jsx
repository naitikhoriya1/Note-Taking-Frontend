import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-16 md:top-20 right-4 md:right-6 transition-all duration-400 z-50 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-[200px] md:min-w-[250px] max-w-[90vw] md:max-w-[400px] bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full 
           ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"}
           after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-2 md:gap-3 py-2 px-3 md:px-4">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-lg md:text-xl text-red-500" />
            ) : (
              <LuCheck className="text-lg md:text-xl text-green-500" />
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
