import { useNavigate } from "react-router-dom";
import sp1 from "../../Img/specialItem/sp1.jpg";
import sp2 from "../../Img/specialItem/sp2.jpg";
import sp3 from "../../Img/specialItem/sp3.jpg";
import sp4 from "../../Img/specialItem/sp4.jpg";
import sp5 from "../../Img/specialItem/sp5.jpg";
import sp6 from "../../Img/specialItem/sp6.jpg";
import sp7 from "../../Img/specialItem/sp7.jpg";
import sp8 from "../../Img/specialItem/sp8.jpg";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// Data set containing only the unique food items
const uniqueFoodItems = [
  {
    id: 7,
    name: "Lentil Salad",
    image: sp1,
    category: "Vegan",
    price: 11.0,
    purchaseCount: 200,
    spacial: 1,
  },
  {
    id: 8,
    name: "Potato Pancakes",
    image: sp2,
    category: "Appetizer",
    price: 9.5,
    purchaseCount: 180,
    spacial: 2,
  },
  {
    id: 9,
    name: "Beetroot Hummus",
    image: sp3,
    category: "Appetizer",
    price: 8.75,
    purchaseCount: 150,
    spacial: 3,
  },
  {
    id: 10,
    name: "Doro Wat",
    image: sp4,
    category: "Ethiopian",
    price: 19.99,
    purchaseCount: 120,
    spacial: 4,
  },
  {
    id: 11,
    name: "Carrot Cake",
    image: sp5,
    category: "Dessert",
    price: 7.5,
    purchaseCount: 110,
    spacial: 5,
  },
  {
    id: 12,
    name: "Arepas",
    image: sp6,
    category: "Venezuelan",
    price: 13.0,
    purchaseCount: 90,
    spacial: 6,
  },
  {
    id: 13,
    name: "Sushi Rolls",
    image: sp7,
    category: "Japanese",
    price: 22.0,
    purchaseCount: 80,
    spacial: 7,
  },
  {
    id: 14,
    name: "Meat Pies",
    image: sp8,
    category: "Pastry",
    price: 10.0,
    purchaseCount: 70,
    spacial: 8,
  },
];

// Reusable component for displaying a single food item
const FoodCard = ({ food, navigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full max-w-sm md:w-80">
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Special
        </span>
      </div>
      <div className="p-5 flex-col justify-between">
        <div>
          <h2 className="md:text-2xl text-xl font-extrabold text-gray-900 leading-tight">
            {food.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-extrabold text-gray-900 leading-tight">
              Category:{"  "}
            </span>
            {food.category}
          </p>
          <div className="flex justify-between">
            <p className="text-xl font-bold text-green-600 mt-2">
              ${food.price.toFixed(2)}
            </p>
            <button
              className=" bg-[#0000001e] text-[#55b827] text-xl font-bold btn hover:bg-[#0000002e] transition-colors duration-300 shadow-md rounded-full"
              onClick={() => navigate(`/food/${food.id}`)}
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

  return (
    <div className="container mx-auto px-4 md:py-8 pt-5 md:pt-0">
      <h2 className="text-center md:text-4xl font-extrabold text-gray-800 md:mb-8 mb-3 tracking-tight text-2xl">
        Our Unique Food
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {uniqueFoodItems.map((item) => (
          <FoodCard key={item.id} food={item} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default UniqueFoodItem;
