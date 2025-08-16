import { useContext, useEffect } from "react";
import useAxiousSecure from "./useAxiousSecure";
import { AuthProvider } from "../Auth/AuthContextProvider";

const useCardData = (m, id, count) => {
  const axiosSecure = useAxiousSecure();
  const { user } = useContext(AuthProvider);

  useEffect(() => {
    if (!m || !id) return;

    console.log("Running useCardData:", m, id);

    const data = {
      email: user.email,
      foodId: id,
      quantity: count,
      purchaseDate: new Date().toISOString(),
    };

    axiosSecure[m]("/MyPurchasePage", data)
      .then((r) => console.log("Response:", r.data))
      .catch((e) => console.error(e));
  }, [axiosSecure, m, id, count, user]);
};

export default useCardData;
