import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import GetDataUsingCondition from "./../../Hook/GetDataUsingCondition";

// Reusable component for displaying a single food item
const FoodCard = ({ food, navigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full md:max-w-sm md:w-80">
      <div className="relative md:h-48 overflow-hidden">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {food.foodType === "Unique" && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Unique
          </span>
        )}
      </div>
      <div className="p-5 flex-col justify-between">
        <div>
          <h2 className="md:text-2xl text-xl font-extrabold text-gray-900 leading-tight">
            {food.foodName}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-extrabold text-gray-900 leading-tight">
              Category:{" "}
            </span>
            {food.foodCategory}
          </p>
          <div className="flex justify-between">
            <p className="text-xl font-bold text-green-600 mt-2">
              ${food.price.toFixed(2)}
            </p>
            <button
              className="bg-[#0000001e] text-[#55b827] text-xl font-bold btn hover:bg-[#0000002e] transition-colors duration-300 shadow-md rounded-full"
              onClick={() => navigate(`/SingleFoodDetails`, { state: food })}
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UniqueFoodItem = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const uniqueFoodItems = GetDataUsingCondition("Unique", 6);
  // console.log(uniqueFoodItems);

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
    <div className="relative container mx-auto md:px-4 mg:py-8">
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center md:flex md:flex-row md:overflow-x-auto md:scroll-smooth md:gap-8 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {uniqueFoodItems.map((item) => (
          <div
            key={item._id}
            className="w-full md:w-80 flex-none md:flex-initial p-4"
          >
            <FoodCard food={item} navigate={navigate} />
          </div>
        ))}
        <div className="flex justify-center items-end">
          <button
            className="z-20 md:mt-2 md:mb-10 px-5 py-3 rounded-full
            bg-gradient-to-r from-green-500 via-green-600 to-green-700
            text-white text-lg
            shadow-lg shadow-green-500/30
            hover:scale-110 hover:shadow-green-400/50
            active:scale-95 transition-all duration-300 ease-in-out
            flex items-center justify-center gap-2 group"
          >
            <FaArrowRight className="text-xl transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      {/* Arrows visible only on medium and larger screens */}
      <button
        onClick={scrollLeft}
        className="px-2 py-2 border-1 border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold
        hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <span>
          <FaArrowLeft />
        </span>
      </button>

      <button
        onClick={scrollRight}
        className="px-2 py-2 border-1border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-3  shadow-lg z-10"
      >
        <span>
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
};

export default UniqueFoodItem;
