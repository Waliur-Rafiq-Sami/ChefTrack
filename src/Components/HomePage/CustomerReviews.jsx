import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Emily Carter",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment:
      "Absolutely loved the flavors! Everything tasted fresh and authentic. Can't wait to come back for more.",
  },
  {
    id: 2,
    name: "James Thompson",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    comment:
      "The sushi rolls were spot on! Presentation was beautiful and the taste even better.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    comment:
      "One of the best dining experiences I’ve had. The staff were so friendly and the desserts were heavenly.",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    image: "https://i.pravatar.cc/150?img=30",
    rating: 4,
    comment:
      "Great portion sizes and reasonable prices. The lentil salad was surprisingly delicious!",
  },
];

const CustomerReviews = () => {
  return (
    <div className="md:mx-5 mx-1 md:mt-10 my-10">
      <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
        What Our Customers Say
      </h1>
      <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify">
        We believe in letting our customers speak for us. Here’s what some of
        our valued guests have to say about their experiences. Your satisfaction
        is our biggest reward.
      </p>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-3
          lg:flex lg:gap-6 lg:overflow-x-auto lg:scroll-smooth
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-100 shadow-md rounded-xl p-5 min-w-[300px] flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-bold text-lg">{review.name}</h3>
                <div className="flex text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm flex-grow">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
