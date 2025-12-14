import React, { useState } from "react";
import { navLinks } from "../lib/links.js";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ For redirect

  const handleLogout = () => {
    dispatch(logout());    
    navigate("/login");    
  };

  return (
    <header className="relative z-50 md:px-14 bg-background">
      
      <main className="flex flex-row items-center justify-between p-3 text-light">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-light to-tertiary rounded-lg flex items-center justify-center">
            <span className="text-2xl">🔬</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-light to-primary bg-clip-text text-transparent">
            LesionVision
          </h3>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex flex-row items-center justify-center gap-6 text-[16px]">
            {navLinks.map((link) => (
              <li
                className="hover:underline hover:font-semibold transition-all"
                key={link.name}
              >
                {link.name === "How It Works" ? (
                  <a href={link.path}>{link.name}</a>
                ) : (
                  <Link to={link.path}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Profile Dropdown */}
        <div className="relative hidden md:block">
          <div
            className="rounded-full bg-light shadow-md shadow-light text-secondary cursor-pointer font-bold py-2 px-4"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user?.name[0]}
          </div>

          <div
            className={`absolute right-0 mt-2 w-48 bg-light text-secondary rounded-lg shadow-lg shadow-light transform transition-all duration-500 origin-top ${
              showDropdown
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="p-3 border-b border-secondary/20">
              <p className="font-semibold">Hi, {user?.name}</p>
            </div>

           
            <button
              className="w-full text-left px-4 py-2 cursor-pointer font-semibold hover:bg-secondary hover:text-light rounded-b-lg"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="hover:opacity-80 transition"
          >
            <Menu size={26} />
          </button>
        </div>
      </main>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[50%] bg-background text-light transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-light/20">
          <div className="rounded-full bg-light text-secondary font-bold py-2 px-4 shadow-md">
            {user?.name[0]}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="hover:opacity-80 transition"
          >
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-[18px]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="hover:underline hover:font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Logout */}
        <div className="px-4 mt-auto mb-6">
          <button
            className="w-full shadow-md bg-light text-secondary py-2 px-4 font-semibold rounded hover:opacity-90"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>
    </header>
  );
};

export default Header;
