const SingleCard = ({ food, navigate }) => {
  const handleDetailsClick = () => {
    navigate(`/SingleFoodDetails`, { state: food });
  };
  const foodTypeStyles = {
    "Top food": {
      label: "🏆 Top Food",
      bg: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    Special: {
      label: "🎯 Special",
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    Unique: {
      label: "💎 Unique",
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    Expansive: {
      label: "💰 Expansive",
      bg: "bg-gradient-to-r from-yellow-500 to-amber-600",
    },
  };
  // console.log(food);
  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-200">
      {/* Special Offer Badge */}
      {food.Discount > 0 && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm z-10">
          {food.Discount}% OFF
        </div>
      )}

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
          <button
            onClick={handleDetailsClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
          >
            Details
          </button>
        </div>

        {/* Calories & Origin */}
        <div className="flex justify-between items-center mt-2 text-gray-500 text-sm">
          <span>🔥 {food.calorie} kcal</span>
          <span>🌎 {food.foodOrigin}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
