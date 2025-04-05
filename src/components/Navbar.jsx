import ProfileInfo from "./ProfileInfo.jsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";
import PropTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="bg-white flex items-center justify-between px-4 md:px-6 py-4 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes 🖥️</h2>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2">
            {mobileMenuOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Desktop menu items */}
        <div className="hidden md:block">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
        <div className="hidden md:block">
          <ProfileInfo userInfo={userInfo || {}} onLogout={onLogout} />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-md py-4 px-4 md:hidden">
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value);
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>
          <ProfileInfo userInfo={userInfo || {}} onLogout={onLogout} />
        </div>
      )}
    </>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object,
};

Navbar.defaultProps = {
  userInfo: null,
};

export default Navbar;
