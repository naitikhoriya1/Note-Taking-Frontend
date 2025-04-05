import getInitials from "../utils/helper";
import PropTypes from "prop-types";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="w-10 h-10 md:w-16 md:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm md:text-base">
        {getInitials(userInfo?.fullName || "")}
      </div>
      <div>
        <p className="text-xs md:text-sm font-medium">
          {userInfo?.fullName || "User"}
        </p>
        <button
          className="text-xs md:text-sm text-slate-700 underline"
          onClick={onLogout}
        >
          Logout🖐🏻
        </button>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

ProfileInfo.defaultProps = {
  userInfo: {},
};

export default ProfileInfo;
