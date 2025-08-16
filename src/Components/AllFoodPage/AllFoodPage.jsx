import { useContext, useEffect, useMemo, useState } from "react";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import FoodItem from "./FoodItem";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import FoodItemSkeleton from "../../shared/FoodItemSkeleton/FoodItemSkeleton";

/** Inline icons (to avoid lucide-react import errors) */
const Search = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UtensilsCrossed = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* simple crossed utensils */}
    <path d="M3 3l7 7" />
    <path d="M10 3L3 10" />
    <path d="M14 3l7 7" />
    <path d="M21 3l-7 7" />
  </svg>
);

const AllFoodPage = () => {
  const [allFood, setAllFood] = useState([]);
  const { user, update, setUpdate } = useContext(AuthProvider);
  // === ADDED: states your sidebar uses ===
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(""); // Food Category
  const [type, setType] = useState(""); // Food Type
  const [priceRange, setPriceRange] = useState([0, 99999]);
  const [calorieRange, setCalorieRange] = useState([0, 99999]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiousSecure();

  useEffect(() => {
    axiosSecure
      .get("/allFood")
      .then((d) => setAllFood(d.data || []))
      .catch((e) => {
        console.error(e);
        setAllFood([]);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // === Filtered list (no style changes; just logic) ===
  const filteredFood = useMemo(() => {
    return (allFood || []).filter((item) => {
      const name = (item.foodName || item.name || "").toLowerCase();
      const cat = (item.foodCategory || "").toLowerCase();
      const t = (item.foodType || item.type || "").toLowerCase();
      const price = Number(item.price ?? 0);
      const cal = Number(item.calorie ?? 0);

      const matchSearch = name.includes(searchTerm.toLowerCase());
      const matchCategory = category ? cat === category.toLowerCase() : true;
      const matchType = type ? t === type.toLowerCase() : true;
      const matchPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchCal = cal >= calorieRange[0] && cal <= calorieRange[1];

      return (
        matchSearch && matchCategory && matchType && matchPrice && matchCal
      );
    });
  }, [allFood, searchTerm, category, type, priceRange, calorieRange]);

  const handleDeleteFood = (id) => {
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .delete(`/DeleteFood/${id}`)
            .then((r) => {
              if (r.data.deletedCount) {
                // toast("Deleted Successfully");
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Food has been deleted.",
                  icon: "success",
                });
                setAllFood(allFood.filter((food) => food._id !== id));
              }
            })
            .catch((e) => {
              swalWithBootstrapButtons.fire({
                title: "Sorry!!!",
                text: "Something Wrong",
                icon: "error",
              });
              console.log(e);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleAddCard = (id) => {
    const data = {
      email: user.email,
      foodId: id,
      purchaseDate: new Date().toISOString(),
    };
    axiosSecure
      .post("/MyPurchasePage", data)
      .then((res) => {
        const data = res.data;
        if (data.success) {
          toast(data.message);
          setUpdate(!update);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex gap-6 flex-col md:flex-row">
      {/* Sidebar */}
      <ToastContainer />
      <aside className="p-4 border-r border-gray-200 w-full md:w-1/4 lg:w-1/5 xl:w-1/6 xl:h-svh space-y-6 pt-5 flex md:flex-col gap-5">
        <div>
          {/* Top Filters */}
          {/* Total Dishes Found */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 shadow-md text-white font-semibold text-sm">
              <span>Total Dishes Found:</span>
              <span className="bg-white text-red-500 font-bold px-2 py-0.5 rounded-full shadow">
                {filteredFood.length}
              </span>
            </div>

            {/* Search */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <Search className="w-4 h-4 text-gray-500" /> Search
              </h3>
              <input
                type="text"
                placeholder="Search food..."
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded-lg px-3 py-2 text-sm transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <UtensilsCrossed className="w-4 h-4 text-gray-500" /> Category
              </h3>
              <select
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded-lg px-3 py-2 text-sm transition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
                <option value="Seafood">Seafood</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Type</h3>
              <select
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-300 rounded-lg px-3 py-2 text-sm transition"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All</option>
                <option value="Normal">Normal</option>
                <option value="Top food">Top food</option>
                <option value="Special">Special</option>
                <option value="Unique">Unique</option>
                <option value="Expansive">Expansive</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
            </div>
          </div>

          {/* Bottom Filters */}
          <div className="space-y-6">
            {/* Price Range */}
            <div className="mt-5">
              <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value || 0, priceRange[1]])
                  }
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], +e.target.value || 0])
                  }
                />
              </div>
            </div>

            {/* Calorie Range */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">
                Calorie Range
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  placeholder="Min"
                  value={calorieRange[0]}
                  onChange={(e) =>
                    setCalorieRange([+e.target.value || 0, calorieRange[1]])
                  }
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  placeholder="Max"
                  value={calorieRange[1]}
                  onChange={(e) =>
                    setCalorieRange([calorieRange[0], +e.target.value || 0])
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="h-full grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 flex-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <FoodItemSkeleton key={i} />)
        ) : filteredFood.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12 xl:mt-50 md:mt-25 mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v.008h.008V9.75H12zm0 4.5v.008h.008v-.008H12zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">No Food Found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          filteredFood.map((food) => (
            <FoodItem
              key={food._id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleAddCard={handleAddCard}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllFoodPage;
