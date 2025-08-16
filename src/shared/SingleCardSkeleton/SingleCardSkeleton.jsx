const SingleCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 animate-pulse">
      {/* Discount Badge Placeholder */}
      <div className="absolute top-3 right-3 bg-gray-300 w-16 h-6 rounded-full"></div>

      {/* Image Placeholder */}
      <div className="relative">
        <div className="w-full h-60 lg:h-72 bg-gray-300"></div>

        {/* Food Type Badge Placeholder */}
        <div className="absolute top-3 left-0 bg-gray-300 h-6 w-24 rounded-r-lg"></div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Title Placeholder */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

        {/* Description Placeholder */}
        <div className="mt-2 h-3 bg-gray-300 rounded w-full"></div>
        <div className="mt-1 h-3 bg-gray-300 rounded w-5/6"></div>

        {/* Price Section Placeholder */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
            <div className="mt-2 h-5 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Calories & Origin Placeholder */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardSkeleton;
