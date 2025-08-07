import { NavLink } from "react-router-dom";
import logo from "../../Img/logo/ChefTrack.png";
import shopping_card from "../../Img/shopping_Bag/shopping_Bag.png";
import { useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Optional: Close sidebar when pressing ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getActiveClass = ({ isActive }) =>
    isActive ? "text-primary font-bold" : "";

  const navLinks = (
    <>
      <li className="hover:underline hover:bg-white">
        <NavLink to="/" className={getActiveClass} onClick={closeSidebar}>
          Home
        </NavLink>
      </li>
      <li className="hover:underline hover:bg-white">
        <NavLink to="/foods" className={getActiveClass} onClick={closeSidebar}>
          All Foods
        </NavLink>
      </li>
      <li className="hover:underline hover:bg-white">
        <NavLink
          to="/gallery"
          className={getActiveClass}
          onClick={closeSidebar}
        >
          Gallery
        </NavLink>
      </li>
      <li className="hover:underline hover:bg-white">
        <NavLink
          to="/profile"
          className={getActiveClass}
          onClick={closeSidebar}
        >
          My Profile
        </NavLink>
      </li>
      <li className="hover:underline hover:bg-white">
        <NavLink to="/login" className={getActiveClass} onClick={closeSidebar}>
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <header className={`"relative z-50"`}>
      {/* Main Navbar */}
      <div className="bg-base-100 shadow-sm">
        <nav className="navbar  md:px-6 py-3 container mx-auto">
          <div className="navbar-start flex items-center gap-3">
            {/* Toggle Sidebar (mobile only) */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <FiAlignJustify className="text-2xl" />
            </button>

            {/* Logo */}
            <NavLink to="/" className="flex gap-3 items-end">
              <img src={logo} className="w-10 md:w-20" alt="ChefTrack Logo" />
              <div className="navbar-center hidden lg:block">
                <h1 className="md:text-3xl font-bold pb-2">Chef Track</h1>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-[16.5px]">
              {navLinks}
            </ul>
          </div>

          <div className="navbar-center">
            <h1 className="md:text-3xl font-bold lg:hidden">Chef Track</h1>
          </div>

          {/* Right-side Button */}
          <div className="navbar-end md:gap-2 gap-1">
            {/* <NavLink
              to="/profile"
              className="btn-sm w-9 border p-1 border-gray-400 bg-gray-100 rounded-full"
            >
              <img src={shopping_card} alt="" />
            </NavLink>
            <NavLink
              to="/profile"
              className="btn-sm w-9 border p-1 border-gray-400 bg-gray-100 rounded-full"
            >
              <img src={shopping_card} alt="" />
            </NavLink> */}
            <NavLink
              to="/profile"
              className="btn-sm  border p-1 md:p-[10.5px] border-gray-400 bg-gray-100 rounded-full text-sm md:text-1xl text-green-800 hover:scale-108 ease-in-out duration-300 transform hover:bg-gray-200"
            >
              <FaPhoneFlip />
            </NavLink>
            <NavLink
              to="/profile"
              className="btn-sm md:w-9 w-6 border p-1 border-gray-400 bg-gray-100 rounded-full hover:scale-108 ease-in-out duration-300 transform hover:bg-gray-200"
            >
              <img src={shopping_card} alt="" />
            </NavLink>
            <NavLink
              to="/profile"
              className="btn-sm  border md:p-[5.5px] p-1 border-gray-400 bg-gray-100 rounded-full text-md md:text-2xl hover:scale-108 ease-in-out duration-300 transform hover:bg-gray-200"
            >
              <BiUser />
            </NavLink>
          </div>
        </nav>

        {/* Sidebar and Backdrop for Mobile */}
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={closeSidebar}
              className="fixed inset-0 bg-opacity-40 backdrop-blur-sm lg:hidden"
            ></div>

            {/* Slide-in Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-64 bg-linear-to-r/srgb from-[#06b387] to-[#58ffffce] shadow-md rounded-r-box z-50 transform transition-transform duration-600 ease-in-out ">
              <ul className="p-4 space-y-3 text-xl font-bold">
                <>
                  <li className="border-b-1 pb-1">
                    <NavLink
                      to="/"
                      className={getActiveClass}
                      onClick={closeSidebar}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="border-b-1 pb-1">
                    <NavLink
                      to="/foods"
                      className={getActiveClass}
                      onClick={closeSidebar}
                    >
                      All Foods
                    </NavLink>
                  </li>
                  <li className="border-b-1 pb-1">
                    <NavLink
                      to="/gallery"
                      className={getActiveClass}
                      onClick={closeSidebar}
                    >
                      Gallery
                    </NavLink>
                  </li>
                  <li className="border-b-1 pb-1">
                    <NavLink
                      to="/profile"
                      className={getActiveClass}
                      onClick={closeSidebar}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li className="border-b-1 pb-1">
                    <NavLink
                      to="/login"
                      className={getActiveClass}
                      onClick={closeSidebar}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              </ul>
            </aside>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
