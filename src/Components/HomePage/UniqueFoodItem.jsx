import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// import GetDataUsingCondition from "./../../Hook/GetDataUsingCondition";
import SingleCardSkeleton from "../../shared/SingleCardSkeleton/SingleCardSkeleton";

// Single Food Card
const FoodCard = ({ food, navigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full md:max-w-sm md:w-80">
      <div className="relative md:h-48 overflow-hidden">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />

        {/* Unique Badge */}
        {food.foodType === "Unique" && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Unique
          </span>
        )}

        {/* Discount Badge */}
        {food.Discount > 0 && (
          <div className="absolute top-2 left-2 z-20">
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 opacity-60 filter blur-md animate-pulse"></div>

              {/* Badge Container */}
              <div
                className="relative flex items-center justify-center 
                            bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 
                            rounded-full shadow-lg px-3 py-1 animate-bounce"
              >
                <span className="text-white font-bold text-sm drop-shadow-lg">
                  {food.Discount}% OFF
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex-col justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
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

// Unique Food Items Component
const UniqueFoodItem = ({ unique }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Get data using custom hook
  // const uniqueFoodItems = GetDataUsingCondition("Unique", 6);
  const uniqueFoodItems = unique;

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
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2
                   md:flex md:overflow-x-auto md:scroll-smooth md:gap-4 md:p-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {uniqueFoodItems.length === 0
          ? // Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="md:min-w-[350px]">
                <SingleCardSkeleton />
              </div>
            ))
          : // Show loaded food items
            uniqueFoodItems.map((item) => (
              <div
                key={item._id}
                className="w-full md:w-80 flex-none md:flex-initial p-4 md:pb-15"
              >
                <FoodCard food={item} navigate={navigate} />
              </div>
            ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="px-2 py-2 border border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <FaArrowLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="px-2 py-2 border border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default UniqueFoodItem;
