import { useState, useContext } from "react";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import { toast, ToastContainer } from "react-toastify";

const AddAfoodItemPage = () => {
  // We use the mock context to get the user information
  // This will now correctly get the user object from the provider.
  const { user, myProfile } = useContext(AuthProvider);

  const axiosSecure = useAxiousSecure();
  // Define an array of food categories for the select input
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
    "Vegan",
    "Non-Veg",
    "Salad",
  ];

  // Define an array of food types for the new select input
  const foodTypes = [
    "Normal",
    "Top food",
    "Special",
    "Unique",
    "Expansive",
    "Vegetarian",
  ];

  // This object now correctly uses the user data from the context.
  const loggedInUser = {
    name: user?.displayName,
    email: user?.email,
  };

  // Use state to manage the form inputs
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState(foodCategories[0]);
  const [foodType, setFoodType] = useState(foodTypes[0]);
  const [calorie, setCalorie] = useState("");
  const [price, setPrice] = useState("");
  const [foodOrigin, setFoodOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [sortDescription, setSortDescription] = useState("");

  // Handle changes for each input field
  const handleFoodNameChange = (e) => setFoodName(e.target.value);
  const handleFoodImageChange = (e) => setFoodImage(e.target.value);
  const handleFoodCategoryChange = (e) => setFoodCategory(e.target.value);
  const handleFoodTypeChange = (e) => setFoodType(e.target.value);
  const handleCalorieChange = (e) => setCalorie(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleFoodOriginChange = (e) => setFoodOrigin(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSortDescriptionChange = (e) => setSortDescription(e.target.value);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather all the form data into a single object
    const newFoodItem = {
      foodName,
      foodImage,
      foodCategory,
      foodType,
      calorie: Number(calorie),
      price: Number(price),
      addedBy: loggedInUser,
      foodOrigin,
      description,
      sortDescription,
    };

    // In a real application, you would send this data to a server
    // and show a toast/alert on success or failure.
    // console.log("Submitting new food item:", newFoodItem);
    axiosSecure
      .post("/addFoods", newFoodItem)
      .then((r) => {
        // console.log(r.data);
        // Reset the form fields after submission
        toast("Add Successfully");
        setFoodName("");
        setFoodImage("");
        setFoodCategory(foodCategories[0]);
        setFoodType(foodTypes[0]);
        setCalorie("");
        setPrice("");
        setFoodOrigin("");
        setDescription("");
        setSortDescription("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans bg-gradient-to-br ">
      <div className="w-full max-w-2xl">
        <ToastContainer />
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
          <h2 className="md:text-3xl font-bold text-center text-indigo-700 mb-8">
            🍽 Add a New Food Item
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
                  onChange={handleFoodNameChange}
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
                  onChange={handleFoodImageChange}
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
                  onChange={handleFoodCategoryChange}
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
                  onChange={handleFoodTypeChange}
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
                  onChange={handlePriceChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* calorie + Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="calorie"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  calorie
                </label>
                <input
                  id="calorie"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g., 50"
                  value={calorie}
                  onChange={handleCalorieChange}
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
                  onChange={handleFoodOriginChange}
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
                value={
                  user
                    ? `${user?.displayName || myProfile?.displayName} (${
                        user.email
                      })`
                    : "Loading..."
                }
                readOnly
              />
            </div>

            {/*Short Description */}
            <div>
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700 block mb-1"
              >
                Short Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                placeholder="e.g., A creamy pasta dish with pancetta and cheese."
                rows="2"
                value={sortDescription}
                onChange={handleSortDescriptionChange}
                required
              ></textarea>
            </div>

            {/*Long Description */}
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
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              Add Food Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAfoodItemPage;
