import offer from "../../Img/offer/offer.png";

const SingleCard = ({ food, navigate }) => {
  const handleDetailsClick = () => {
    // Navigate to the single food page using the food item's ID
    navigate(`/food/${food.id}`);
  };

  return (
    <div className="relative border border-[#ceb2b2] p-3 m-2 rounded-lg shadow bg-gray-100">
      {food?.spacial && (
        <div className="absolute -right-3  rotate-45 w-30">
          <img className="rounded-lg" src={offer} alt={food.name} />
        </div>
      )}
      <img
        className="w-full lg:h-75 rounded-lg"
        src={food.image}
        alt={food.name}
      />
      <div className="mt-3">
        <h5 className="font-semibold text-xl">{food.name}</h5>
        <p className="text-muted">
          <span className="font-semibold">Category: </span>
          {food.category}
        </p>
        <p className="font-weight-bold text-[#1dd105] font-bold">
          <span className="font-semibold text-[#000]">Price: </span>$
          {food.price.toFixed(2)}
        </p>
        <button
          className="btn btn-primary btn-block mt-2"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
