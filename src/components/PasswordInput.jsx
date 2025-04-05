import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <div className="relative flex items-center justify-between bg-transparent rounded mt-1">
        <input
          id="password"
          value={value}
          onChange={onChange}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          className="pl-3 w-full text-xs md:text-sm bg-transparent py-1.5 md:py-2 rounded outline-none border-solid border-2 pr-8"
        />
        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? (
            <FaRegEye size={18} className="text-primary" />
          ) : (
            <FaRegEyeSlash size={18} className="text-slate-400" />
          )}
        </div>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

PasswordInput.defaultProps = {
  placeholder: "Password",
};

export default PasswordInput;
