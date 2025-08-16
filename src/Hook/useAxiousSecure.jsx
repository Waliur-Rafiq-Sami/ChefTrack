import axios from "axios";
import { useEffect } from "react";

const axiousSecure = axios.create({
  baseURL: "https://chef-track-server.vercel.app",
  withCredentials: true,
});

const useAxiousSecure = () => {
  useEffect(() => {
    axiousSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error eeee error : ", error);
      }
    );
  }, []);
  return axiousSecure;
};

export default useAxiousSecure;
