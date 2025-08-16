import { useEffect, useState } from "react";
import useAxiousSecure from "./useAxiousSecure";

const GetDataUsingCondition = (
  foodType,
  arrayLength = -1,
  retryDelay = 3000,
  maxRetries = 3
) => {
  const axiosSecure = useAxiousSecure();
  const [data, setData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      axiosSecure
        .get(`/someFood?foodType=${foodType}&arrayLength=${arrayLength}`)
        .then((r) => {
          if (isMounted) {
            setData(r.data);
            setRetryCount(0); // reset retry count on success
          }
        })
        .catch((e) => {
          console.log("Fetch failed:", e);
          if (retryCount < maxRetries) {
            setTimeout(() => {
              if (isMounted) setRetryCount(retryCount + 1);
            }, retryDelay);
          }
        });
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [axiosSecure, foodType, arrayLength, retryCount, retryDelay, maxRetries]);

  return data;
};

export default GetDataUsingCondition;
