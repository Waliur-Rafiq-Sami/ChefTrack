import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SingleCard from "../SingleCard/SingleCard";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import GetDataUsingCondition from "../../Hook/GetDataUsingCondition";
import SingleCardSkeleton from "../../shared/SingleCardSkeleton/SingleCardSkeleton";

const SpecialItems = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [specialFoods, setSpecialFoods] = useState([]);

  // Get data with your hook
  const fetchedFoods = GetDataUsingCondition("Special", 6);

  useEffect(() => {
    if (fetchedFoods && fetchedFoods.length > 0) {
      setSpecialFoods(
        [...fetchedFoods].sort((a, b) => b.purchaseCount - a.purchaseCount)
      );
      setLoading(false);
    }
  }, [fetchedFoods]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <div className="relative my-5">
      <div
        ref={scrollContainerRef}
        className="
          grid grid-cols-1 sm:grid-cols-2 gap-4 p-2
          md:flex md:overflow-x-auto md:scroll-smooth md:gap-4 md:p-2
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="md:min-w-[350px]">
                <SingleCardSkeleton />
              </div>
            ))
          : specialFoods.map((item) => (
              <div key={item._id} className="md:min-w-[350px] md:pb-10">
                <SingleCard food={item} navigate={navigate} />
              </div>
            ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="px-2 py-2 border border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold
          hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={scrollRight}
        className="px-2 py-2 border border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold
          hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SpecialItems;
