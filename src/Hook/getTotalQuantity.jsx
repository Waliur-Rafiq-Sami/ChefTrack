import { useContext, useEffect, useState } from "react";
import useAxiousSecure from "./useAxiousSecure";
import { AuthProvider } from "../Auth/AuthContextProvider";

const useTotalQuantity = (cartUpdated) => {
  const [quantity, setQuantity] = useState(0);
  const axiosSecure = useAxiousSecure();
  const { user } = useContext(AuthProvider);

  useEffect(() => {
    if (!user?.email) return;

    const fetchQuantity = async () => {
      try {
        const response = await axiosSecure.get(
          "/MyPurchasePage/totalQuantity",
          { params: { email: user.email } }
        );
        setQuantity(response.data.totalQuantity || 0);
      } catch (error) {
        console.error("Error fetching total quantity:", error);
      }
    };
    fetchQuantity();
  }, [user?.email, axiosSecure, cartUpdated]);

  return quantity;
};

export default useTotalQuantity;
