import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import GetDataUsingCondition from "./../../Hook/GetDataUsingCondition";
import SingleCardSkeleton from "../../shared/SingleCardSkeleton/SingleCardSkeleton";

// Individual Expensive Food Card
const ExpensiveFoodItem = ({ food, navigate }) => {
  const handleDetailsClick = () => {
    navigate(`/SingleFoodDetails`, { state: food });
  };

  const foodTypeStyles = {
    Expansive: {
      label: "💰 Expansive",
      bg: "bg-gradient-to-r from-yellow-500 to-amber-600",
    },
  };

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-200">
      {/* Discount Badge */}
      {food.Discount > 0 && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm z-10 animate-bounce">
          {food.Discount}% OFF
        </div>
      )}

      {/* Image + Food Type */}
      <div className="relative">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-60 lg:h-72 object-cover"
        />

        {foodTypeStyles[food.foodType] && (
          <div
            className={`absolute top-3 left-0 ${
              foodTypeStyles[food.foodType].bg
            } text-white font-bold px-4 py-1 rounded-r-lg shadow-md`}
          >
            {foodTypeStyles[food.foodType].label}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{food.foodName}</h3>
        <p className="text-gray-500 text-sm mt-1">{food.sortDescription}</p>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Category: </span>
              {food.foodCategory}
            </p>
            <p className="text-green-600 font-bold text-lg mt-1">
              ${food.price.toFixed(2)}
              {food.oldPrice && (
                <span className="line-through text-gray-400 text-sm ml-2">
                  ${food.oldPrice.toFixed(2)}
                </span>
              )}
            </p>
          </div>

          {/* Arrow Button */}
          <button
            onClick={handleDetailsClick}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 
             hover:from-yellow-500 hover:via-orange-600 hover:to-yellow-600
             text-white rounded-2xl shadow-md hover:shadow-xl
             px-5 py-1
             transition-all duration-300 ease-in-out
             transform hover:scale-110 hover:rotate-12
             focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Details
          </button>
        </div>

        <div className="flex justify-between items-center mt-2 text-gray-500 text-sm">
          <span>🔥 {food.calorie} kcal</span>
          <span>🌎 {food.foodOrigin}</span>
        </div>
      </div>
    </div>
  );
};

// Premium Food Section
const PremiumFood = () => {
  const navigate = useNavigate();
  const Expansive = GetDataUsingCondition("Expansive", 6);

  const scrollContainerRef = useRef(null);

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
        {Expansive.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="md:min-w-[350px] pb-10">
                <SingleCardSkeleton />
              </div>
            ))
          : Expansive.map((item) => (
              <div
                key={item._id}
                className="w-full md:w-80 flex-none md:flex-wrap pb-10"
              >
                <ExpensiveFoodItem food={item} navigate={navigate} />
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

export default PremiumFood;
