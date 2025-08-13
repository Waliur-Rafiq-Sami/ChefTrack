const TastTheEx = () => {
  return (
    <div className="md:mb-14 mb-10 md:mt-14 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 rounded-3xl shadow-2xl overflow-hidden md:mx-10 m-2">
      <div className="md:flex items-center">
        {/* Left Text Section */}
        <div className="md:w-1/2 py-3 pt-5 md:p-12 text-center md:text-left">
          <h1 className="md:text-5xl text-2xl font-extrabold text-gray-800 drop-shadow-sm">
            Taste the <span className="text-yellow-600">Extraordinary</span>
          </h1>

          <div className="w-full mx-8 md:w-20 h-1 bg-yellow-500 md:mx-0 my-4 rounded-full"></div>

          <p className="md:max-w-xl w-full text-gray-700 leading-relaxed text-justify px-3 md:px-0 md:text-left">
            From daring flavor combinations to the most exquisite fine dining
            experiences, our unique and premium dishes are crafted to leave a
            lasting impression. Expect rare ingredients, artful presentation,
            and tastes that push culinary boundaries. Whether you crave
            creativity or luxury, your perfect plate awaits here.
          </p>

          <button className="md:mt-6 mt-3 px-6 py-1 md:py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 hover:scale-105 transform transition-all duration-300">
            Explore the Menu
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 grid xl:grid-cols-2 gap-5 md:p-8 p-4 pb-8">
          <img
            src="https://images.unsplash.com/photo-1543353071-087092ec393a"
            alt="Luxury Dish 1"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 md:h-full md:w-1/2 xl:w-full"
          />
          <div className="md:flex justify-end xl:flex-none">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Luxury Dish 2"
              className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 md:h-full md:w-1/2 xl:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TastTheEx;
