import { useState, useContext } from "react";
import { AuthProvider } from "../../Auth/AuthContextProvider";

const AddAfoodItemPage = () => {
  // We use the mock context to get the user information
  // This will now correctly get the user object from the provider.
  const { user } = useContext(AuthProvider);

  // Define an array of food categories for the select input
  const foodCategories = [
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Side Dish",
    "Soup",
  ];

  // Define an array of food types for the new select input
  const foodTypes = ["Normal", "Top food", "Special", "Unique", "Expansive"];

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
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [foodOrigin, setFoodOrigin] = useState("");
  const [description, setDescription] = useState("");

  // Handle changes for each input field
  const handleFoodNameChange = (e) => setFoodName(e.target.value);
  const handleFoodImageChange = (e) => setFoodImage(e.target.value);
  const handleFoodCategoryChange = (e) => setFoodCategory(e.target.value);
  const handleFoodTypeChange = (e) => setFoodType(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleFoodOriginChange = (e) => setFoodOrigin(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather all the form data into a single object
    const newFoodItem = {
      foodName,
      foodImage,
      foodCategory,
      foodType,
      quantity: Number(quantity),
      price: Number(price),
      addedBy: loggedInUser,
      foodOrigin,
      description,
    };

    // In a real application, you would send this data to a server
    // and show a toast/alert on success or failure.
    console.log("Submitting new food item:", newFoodItem);

    // Reset the form fields after submission
    setFoodName("");
    setFoodImage("");
    setFoodCategory(foodCategories[0]);
    setFoodType(foodTypes[0]);
    setQuantity("");
    setPrice("");
    setFoodOrigin("");
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center  p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
            Add a New Food Item
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top row with Food Name, Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Name input */}
              <div>
                <label
                  htmlFor="foodName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Food Name
                </label>
                <input
                  id="foodName"
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="e.g., Spaghetti Carbonara"
                  value={foodName}
                  onChange={handleFoodNameChange}
                  required
                />
              </div>

              {/* Food Image input */}
              <div>
                <label
                  htmlFor="foodImage"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Food Image URL
                </label>
                <input
                  id="foodImage"
                  type="url"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="e.g., https://example.com/image.jpg"
                  value={foodImage}
                  onChange={handleFoodImageChange}
                  required
                />
              </div>
            </div>

            {/* Middle row with Category, Quantity, and Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Food Category select input */}
              <div>
                <label
                  htmlFor="foodCategory"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Food Category
                </label>
                <select
                  id="foodCategory"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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

              {/* Food Type select input */}
              <div>
                <label
                  htmlFor="foodType"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Food Type
                </label>
                <select
                  id="foodType"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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

              {/* Price input */}
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="e.g., 15.99"
                  value={price}
                  onChange={handlePriceChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Bottom row with Quantity, Added By and Food Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity input */}
              <div>
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="e.g., 50"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="0"
                  required
                />
              </div>

              {/* Food Origin input */}
              <div>
                <label
                  htmlFor="foodOrigin"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
                >
                  Food Origin (Country)
                </label>
                <input
                  id="foodOrigin"
                  type="text"
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="e.g., Italy"
                  value={foodOrigin}
                  onChange={handleFoodOriginChange}
                  required
                />
              </div>
            </div>

            {/* Added By (read-only) */}
            <div>
              <label
                htmlFor="addedByName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
              >
                Added By
              </label>
              <input
                id="addedByName"
                type="text"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed"
                value={
                  user ? `${user.displayName} (${user.email})` : "Loading..."
                }
                readOnly
              />
            </div>

            {/* Description textarea */}
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
              >
                Short Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-y"
                placeholder="e.g., A creamy pasta dish with pancetta and cheese."
                rows="4"
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
