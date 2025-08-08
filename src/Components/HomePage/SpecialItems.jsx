import { useNavigate } from "react-router-dom"; // For navigation
import img1 from "../../Img/specialItem/img1.jpg";
import img2 from "../../Img/specialItem/img2.jpg";
import img3 from "../../Img/specialItem/img3.jpg";
import img4 from "../../Img/specialItem/img4.jpg";
import img5 from "../../Img/specialItem/img5.jpg";
import img6 from "../../Img/specialItem/img6.jpg";
import SingleCard from "../SingleCard/SingleCard";

// Data for the top 6 items
const topFoodItems = [
  {
    id: 1,
    name: "Classic Burger Combo",
    image: img1,
    category: "Fast Food",
    price: 12.99,
    purchaseCount: 500,
    spacial: 5,
  },
  {
    id: 2,
    name: "Supreme Pizza",
    image: img2,
    category: "Italian",
    price: 18.5,
    purchaseCount: 450,
  },
  {
    id: 3,
    name: "Chicken & Fries Combo",
    image: img3,
    category: "Fast Food",
    price: 15.75,
    purchaseCount: 420,
  },
  {
    id: 4,
    name: "Stir-fried Noodles",
    image: img4,
    category: "Asian",
    price: 10.5,
    purchaseCount: 380,
  },
  {
    id: 5,
    name: "Crispy Fried Calamari",
    image: img5,
    category: "Seafood",
    price: 16.25,
    purchaseCount: 350,
    spacial: 2,
  },
  {
    id: 6,
    name: "Grilled Vegetable Platter",
    image: img6,
    category: "Vegetarian",
    price: 14.0,
    purchaseCount: 320,
  },
  {
    id: 7,
    name: "Grilled Vegetable Platter",
    image: img6,
    category: "Vegetarian",
    price: 14.0,
    purchaseCount: 320,
  },
  {
    id: 8,
    name: "Grilled Vegetable Platter",
    image: img6,
    category: "Vegetarian",
    price: 14.0,
    purchaseCount: 320,
  },
];

const SpecialItems = () => {
  const navigate = useNavigate();
  const sortedItems = topFoodItems.sort(
    (a, b) => b.purchaseCount - a.purchaseCount
  );
  const topSixItems = sortedItems.slice(0, 6);
  return (
    <div className="my-5">
      <div className="d-flex flex-wrap justify-content-center grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3">
        {topSixItems.map((item) => (
          <SingleCard key={item.id} food={item} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default SpecialItems;
