import ProfileInfo from "./ProfileInfo.jsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
  };
  const onClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-4 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes 🖥️</h2>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Navbar;
