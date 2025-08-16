import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import { AuthProvider } from "../../Auth/AuthContextProvider";

const UpdateFoodPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const food = location.state;
  console.log(food);
  const axiosSecure = useAxiousSecure();

  const foodCategories = [
    "Fast Food",
    "Italian",
    "Asian",
    "Seafood",
    "Vegetarian",
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Side Dish",
    "Soup",
  ];
  const disCountNumber = [0, 2, 5, 10, 12, 15, 18, 20];
  const foodTypes = ["Normal", "Top food", "Special", "Unique", "Expansive"];

  const loggedInUser = food.addedBy;

  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState(foodCategories[0]);
  const [foodType, setFoodType] = useState(foodTypes[0]);
  const [calorie, setCalorie] = useState("");
  const [price, setPrice] = useState("");
  const [foodOrigin, setFoodOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [sortDescription, setSortDescription] = useState("");
  const [discount, setDiscount] = useState(""); // Renamed addDiscount to discount

  useEffect(() => {
    if (food) {
      setFoodName(food.foodName || "");
      setFoodImage(food.foodImage || "");
      setFoodCategory(food.foodCategory || foodCategories[0]);
      setFoodType(food.foodType || foodTypes[0]);
      setCalorie(food.calorie || "");
      setPrice(food.price || "");
      setFoodOrigin(food.foodOrigin || "");
      setDescription(food.description || "");
      setSortDescription(food.sortDescription || "");
      setDiscount(food.Discount || ""); // Use discount here, not addDiscount
    }
  }, [food]); // Added dependencies to useEffect

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if price or discount has changed
    const newPrice = Number(price);
    const oldPrice = newPrice !== food.price ? food.price : null;
    const newDiscount = Math.round(Number(discount));
    const oldDiscount = newDiscount !== food.Discount ? food.Discount : null;

    const updatedFoodItem = {
      id: food._id,
      foodName,
      foodImage,
      foodCategory,
      foodType,
      calorie: parseInt(calorie),
      price: newPrice,
      addedBy: loggedInUser,
      foodOrigin,
      description,
      sortDescription,
      Discount: newDiscount,
      oldPrice,
    };

    if (oldDiscount) {
      updatedFoodItem.oldDiscount = oldDiscount;
    }

    console.log(updatedFoodItem);

    axiosSecure
      .put(`/updateFood`, updatedFoodItem)
      .then((res) => {
        console.log(res.data);
        alert("Food updated successfully!");
        console.log(food._id);
        navigate("/SingleFoodDetails", { state: updatedFoodItem });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-gradient-to-br ">
      <div className="w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
          <h2 className="md:text-3xl font-bold text-center text-indigo-700 mb-8">
            🍽 Update Food Item
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="foodName"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Food Name
                </label>
                <input
                  id="foodName"
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., Spaghetti Carbonara"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="foodImage"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Food Image URL
                </label>
                <input
                  id="foodImage"
                  type="url"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., https://example.com/image.jpg"
                  value={foodImage}
                  onChange={(e) => setFoodImage(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="foodCategory"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Food Category
                </label>
                <select
                  id="foodCategory"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={foodCategory}
                  onChange={(e) => setFoodCategory(e.target.value)}
                >
                  {foodCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="foodType"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Food Type
                </label>
                <select
                  id="foodType"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  {foodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., 15.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  //   min="0"
                  //   step="0.01"
                  required
                />
              </div>
            </div>

            {/* calorie + Origin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="Add Discount"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Add Discount(%)
                </label>
                {/* <input
                  id="Add Discount"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., 5%"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  min="0"
                  required
                /> */}
                <select
                  id="foodType"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="number"
                  //   className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"

                  placeholder="e.g., 5%"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  min="0"
                  required
                >
                  {disCountNumber.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="calorie"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Calorie
                </label>
                <input
                  id="calorie"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., 50"
                  value={calorie}
                  onChange={(e) => setCalorie(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="foodOrigin"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Food Origin (Country)
                </label>
                <input
                  id="foodOrigin"
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., Italy"
                  value={foodOrigin}
                  onChange={(e) => setFoodOrigin(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Added By */}
            <div>
              <label
                htmlFor="addedByName"
                className="text-sm font-semibold text-gray-700 block mb-1"
              >
                Added By
              </label>
              <input
                id="addedByName"
                type="text"
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg cursor-not-allowed"
                value={`${food.addedBy.name} (${food.addedBy.email})`}
                readOnly
              />
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="shortDescription"
                className="text-sm font-semibold text-gray-700 block mb-1"
              >
                Short Description
              </label>
              <textarea
                id="shortDescription"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                placeholder="e.g., A creamy pasta dish with pancetta and cheese."
                rows="2"
                value={sortDescription}
                onChange={(e) => setSortDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Long Description */}
            <div>
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700 block mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                placeholder="e.g., A creamy pasta dish with pancetta and cheese."
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              Update Food Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodPage;
