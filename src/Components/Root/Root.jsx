import { Outlet } from "react-router-dom";
import Navbar from "./../../shared/NavBar/Navbar";
import { useEffect } from "react";

const Root = () => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
