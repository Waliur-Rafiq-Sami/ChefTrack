import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactTyped } from "react-typed";

// Import your banner images
import img1 from "../../Img/Banner/i2.jpg";
import img2 from "../../Img/Banner/img2.jpg";
import img3 from "../../Img/Banner/img3.jpg";
import img4 from "../../Img/Banner/img4.jpg";
import img5 from "../../Img/Banner/img5.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Slider content
const slides = [
  {
    img: img1,
    heading: [
      "Taste the Difference",
      "Fresh And Flavorful",
      "Your Culinary Destination",
    ],
    subtext:
      "Embark on an unforgettable culinary journey where every dish is crafted with passion and precision. Using only the finest local ingredients, we transform fresh produce into vibrant, flavorful meals that awaken your senses and bring joy to your table. Experience the perfect harmony of tradition and innovation in every bite.",
  },
  {
    img: img2,
    heading: [
      "Gourmet Meals, Delivered Fast",
      "Hot And Ready to Enjoy",
      "Simple Ordering, Speedy Service",
    ],
    subtext:
      "Enjoy restaurant-quality gourmet meals delivered straight to your doorstep with unmatched speed and care. Our commitment to freshness means each dish is prepared just for you and arrives piping hot, bursting with flavors that satisfy your cravings. Convenient, reliable, and delicious — dining has never been easier.",
  },
  {
    img: img3,
    heading: [
      "Satisfy Your Cravings",
      "Endless Delicious Options",
      "Order Your Favorite Dish",
    ],
    subtext:
      "From classic comfort foods to innovative culinary delights, explore a vast menu designed to please every palate. Whether you're craving savory, spicy, sweet, or fresh, our diverse offerings ensure that you’ll find the perfect meal for any occasion — delivered quickly and made just the way you love it.",
  },
  {
    img: img4,
    heading: [
      "Handcrafted with Passion",
      "Every Dish a Masterpiece",
      "Inspired by Tradition",
    ],
    subtext:
      "At the heart of our kitchen lies creativity and craftsmanship. Our chefs combine time-honored techniques with fresh ideas to create dishes that are not only visually stunning but packed with rich, authentic flavors. Each plate is a testament to our dedication to quality and the art of fine dining.",
  },
  {
    img: img5,
    heading: [
      "The Freshest Ingredients",
      "Quality You Can Taste",
      "Sourced with Care",
    ],
    subtext:
      "We believe great food starts with exceptional ingredients. That's why we partner with trusted local farms and suppliers to bring you fresh, seasonal produce and ethically sourced proteins. This commitment to quality shines through in every dish, delivering an honest, wholesome dining experience that nurtures body and soul.",
  },
];

const SLIDE_DELAY = 8000;

const SliderBanner = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative mt-10 w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl my-swiper-container">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          type: "progressbar",
        }}
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        className="w-full h-full"
        spaceBetween={20}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={`Banner Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4">
                <div className="text-white max-w-6xl">
                  <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg md:min-h-[4rem] text-center md:text-left">
                    <ReactTyped
                      strings={slide.heading}
                      typeSpeed={50}
                      backSpeed={30}
                      backDelay={SLIDE_DELAY - 1000}
                      loop
                    />
                  </h1>
                  <p className="pt-4 text-sm sm:text-xl md:text-2xl font-medium drop-shadow-md mb-4 md:mb-6 text-center md:text-left">
                    {slide.subtext}
                  </p>
                  <div className="text-center md:text-left">
                    <button className="px-5 py-2 sm:px-6 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-lg transition duration-300">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 w-full transform -translate-x-1/2 flex space-x-4 z-10">
        <SwiperNavButtons swiperRef={swiperRef} />
      </div>

      <style>
        {`
          .my-swiper-container .swiper-pagination {
            bottom: 20px !important;
            top: auto !important;
            left: 50% !important;
            transform: translateX(-50%);
            width: 80% !important;
            max-width: 400px;
            --swiper-theme-color: #FACC15;
            --swiper-pagination-progressbar-height: 4px;
            background: rgba(255, 255, 255, 0.3);
          }
        `}
      </style>
    </div>
  );
};

const SwiperNavButtons = ({ swiperRef }) => {
  return (
    <div className="w-full flex justify-between px-3">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="px-2 py-2 border-1 border-[#51d5ec71] rounded-full hover:bg-[#a3aa6238]   bg-[#25697571] text-[#3df56b] font-bold"
      >
        <span>
          <FaArrowLeft />
        </span>
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="px-2 py-2 border-1 border-[#51d5ec71] rounded-full hover:bg-[#a3aa6238]  bg-[#25697571] text-[#3df56b] font-bold"
      >
        <span>
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
};

export default SliderBanner;
