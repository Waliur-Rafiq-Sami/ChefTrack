import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import img1 from "../../Img/specialItem/img1.jpg";
import img2 from "../../Img/specialItem/img2.jpg";
import img3 from "../../Img/specialItem/img3.jpg";
import img4 from "../../Img/specialItem/img4.jpg";
import img5 from "../../Img/specialItem/img5.jpg";
import img6 from "../../Img/specialItem/img6.jpg";
import SingleCard from "../SingleCard/SingleCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

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
];

const TopPicks = () => {
  const navigate = useNavigate();
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

  const sortedItems = topFoodItems.sort(
    (a, b) => b.purchaseCount - a.purchaseCount
  );

  return (
    <div className="relative my-5">
      <div
        ref={scrollContainerRef}
        className="
      grid grid-cols-1 sm:grid-cols-2 gap-4 p-2
      md:flex md:overflow-x-auto md:scroll-smooth md:gap-4 md:p-2
    "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sortedItems.map((item) => (
          <div key={item.id} className="md:min-w-[350px]">
            <SingleCard food={item} navigate={navigate} />
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button className="z-20 btn md:btn-lg btn-sm bg-[#20df1a] md:mt-2 md:mb-10 text-white font-bold md:text-lg">
            Show All
          </button>
        </div>
      </div>

      {/* Show scroll buttons only for md+ */}
      <button
        onClick={scrollLeft}
        className="px-2 py-2 border-1 border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold
              hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 shadow-lg z-10"
      >
        <span>
          <FaArrowLeft />
        </span>
      </button>

      <button
        onClick={scrollRight}
        className="px-2 py-2 border-1border-[#51d5ec71] rounded-full hover:bg-[#015516d8] bg-[#015516b4] text-[#3df56b] font-bold hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-3  shadow-lg z-10"
      >
        <span>
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
};

export default TopPicks;
