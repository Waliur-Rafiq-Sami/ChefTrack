const FoodItemSkeleton = () => {
  return (
    <div className="relative border border-blue-200 p-4 m-3 rounded-2xl shadow-lg bg-white animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-60 bg-gray-200 rounded-xl"></div>

      {/* Text skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Button skeletons */}
      <div className="flex gap-2 mt-6 justify-end">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
export default FoodItemSkeleton;
