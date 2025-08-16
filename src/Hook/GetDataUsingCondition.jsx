import { useEffect, useState } from "react";
import useAxiousSecure from "./useAxiousSecure";

const GetDataUsingCondition = (foodType, arrayLength = -1) => {
  const axiosSecure = useAxiousSecure();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/someFood?foodType=${foodType}&arrayLength=${arrayLength}`)
      .then((r) => setData(r.data))
      .catch((e) => console.log(e));
  }, [axiosSecure, foodType, arrayLength]);
  return data;
};

export default GetDataUsingCondition;
