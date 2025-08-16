import shopingCard from "../../Img/shopping_Bag/shopping_Bag.png";
import deleteIcon from "../../Img/delete/delete.png";
import updateBtn from "../../Img/Update/refresh_18755159.png";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ food, handleDeleteFood, handleAddCard }) => {
  const navigate = useNavigate();
  return (
    <div className="relative border border-blue-200 p-4 m-3 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Special Badge */}
      {food?.foodType?.toLowerCase() === "special" && (
        <div className="absolute top-6 left-6 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ★ Special
        </div>
      )}
      {/* Top food Badge */}
      {food?.foodType?.toLowerCase() === "top food" && (
        <div className="absolute top-6 left-6 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ★ Top food
        </div>
      )}
      {/* Unique Badge */}
      {food?.foodType?.toLowerCase() === "unique" && (
        <div className="absolute top-6 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ★ Unique
        </div>
      )}
      {/* Expansive Badge */}
      {food?.foodType?.toLowerCase() === "expansive" && (
        <div className="absolute top-6 left-6 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ★ Expansive
        </div>
      )}
      {/* Discount Badge */}
      {food.Discount > 0 && (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative">
            {/* Glowing background behind the badge */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 opacity-60 filter blur-md animate-pulse"></div>

            {/* Badge Container with colorful gradient */}
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

      {/* Food Image */}
      <img
        className="w-full h-60 object-cover rounded-xl shadow-md"
        src={food.foodImage}
        alt={food.foodName}
      />
      {/* Food Info */}
      <div className="mt-4 space-y-1">
        <h5 className="font-extrabold text-xl text-gray-800">
          {food.foodName}
        </h5>
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {food.foodCategory}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Origin:</span> {food.foodOrigin}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Type:</span> {food.foodType}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Calories:</span> {food.calorie} kcal
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span>{" "}
          {food.sortDescription}
        </p>
        <p className="text-green-600 font-bold text-lg">
          <span className="text-gray-800">Price:</span> ${food.price.toFixed(2)}
        </p>
      </div>

      {/* Added By */}
      {/* <div className="mt-3 text-sm text-gray-500 italic max-w-70">
        Added by: {food.addedBy?.name} ({food.addedBy?.email})
      </div> */}

      {/* Button */}
      <div className="flex gap-2 items-center justify-end">
        {/* <button className="mt-4 w-full bg-[#5fc01fe7] hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all duration-300">
          Update{" "}
        </button> */}
        <button
          onClick={() => {
            navigate(`/updateFood`, { state: food });
          }}
          className="rounded-full mt-4 hover:scale-105 hover:-rotate-45 pt-3 py-2 font-semibold transition-all duration-300"
        >
          <img className="w-9" src={updateBtn} alt="" />
        </button>
        {/* //delete  */}
        <button
          onClick={() => {
            handleDeleteFood(food._id);
          }}
          className="rounded-full mt-4 hover:scale-105 hover:-rotate-12 py-2 font-semibold transition-all duration-300"
        >
          <img className="w-8" src={deleteIcon} alt="" />
        </button>

        {/* //shopping card  */}
        <button
          onClick={() => {
            handleAddCard(food._id);
          }}
          className="rounded-full mt-4 hover:scale-105 hover:-rotate-12 py-2 font-semibold transition-all duration-300"
        >
          <img className="w-10" src={shopingCard} alt="" />
        </button>

        <button
          onClick={() => {
            navigate("/SingleFoodDetails", { state: food });
          }}
          className="bg-[#6bbabd3a] text-[#55b827] rounded-full mt-5 hover:scale-105 hover:-rotate-12 py-2 px-4 font-semibold transition-all duration-300"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
