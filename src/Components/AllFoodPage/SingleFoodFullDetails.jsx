import { useLocation, useNavigate } from "react-router-dom";
import shopingCard from "../../Img/shopping_Bag/shopping_Bag.png";
import deleteIcon from "../../Img/delete/delete.png";
import updateBtn from "../../Img/Update/refresh_18755159.png";
import Swal from "sweetalert2";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import { useContext } from "react";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import { toast, ToastContainer } from "react-toastify";

const SingleFoodFullDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const food = location.state;
  const axiosSecure = useAxiousSecure();
  const { user, update, setUpdate } = useContext(AuthProvider);

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
          setUpdate(!update);
          toast(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFood = (id) => {
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
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Food has been deleted.",
                  icon: "success",
                });
                navigate("/foods");
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

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      {/* Card */}
      <ToastContainer></ToastContainer>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative w-full lg:w-1/2">
            <img
              src={food?.foodImage}
              alt={food?.foodName}
              className="w-full object-cover rounded-2xl"
            />
            {/* Discount badge */}
            {food?.Discount > 0 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg text-sm sm:text-base">
                {food?.Discount}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6 space-y-4 flex flex-col justify-between w-full lg:w-1/2">
            <div>
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-3">
                {food?.foodName}
                {food?.foodType && (
                  <span className="bg-yellow-200 text-yellow-800 text-xs sm:text-sm px-3 py-1 rounded-full">
                    {food.foodType}
                  </span>
                )}
              </h1>

              {/* Short Description */}
              <p className="text-gray-600">{food?.sortDescription}</p>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  ${food?.price?.toFixed(2)}
                </p>
                {food?.oldPrice && (
                  <p className="text-base sm:text-lg line-through text-gray-400">
                    ${food.oldPrice.toFixed(2)}
                  </p>
                )}
                {food?.oldDiscount && (
                  <span className="text-xs sm:text-sm text-gray-500">
                    Old Discount: {food.oldDiscount}%
                  </span>
                )}
              </div>

              {/* Extra info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <InfoCard label="Category" value={food?.foodCategory} />
                <InfoCard label="Origin" value={food?.foodOrigin} />
                <InfoCard label="Calories" value={`${food?.calorie} kcal`} />
              </div>

              {/* Full Description */}
              <div className="pt-3">
                <h2 className="text-lg font-semibold mb-1">Description</h2>
                <p className="text-gray-700 md:text-left text-justify">
                  {food?.description}
                </p>
              </div>

              {/* Added By */}
              <div className="bg-gray-50 p-4 rounded-xl mt-4">
                <h2 className="text-lg font-semibold mb-1">Added By</h2>
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span>{" "}
                  {food?.addedBy?.name || "Unknown"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {food?.addedBy?.email}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-end mt-6">
              {/* Update Button */}
              <button
                onClick={() => navigate(`/updateFood`, { state: food })}
                className="flex text-sm md:text-md items-center gap-2 md:px-5 px-3 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <img className="md:w-6 w-4" src={updateBtn} alt="Update" />
                <span>Update</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => {
                  handleDeleteFood(food._id);
                }}
                className="flex text-sm md:text-md items-center md:gap-2 gap-1 md:px-5 px-3 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <img className="md:w-6 w-4" src={deleteIcon} alt="Delete" />
                <span>Delete</span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  handleAddCard(food._id);
                }}
                className="flex text-sm md:text-md items-center md:gap-2 md:px-5 px-3 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <img
                  className="md:w-6 w-4"
                  src={shopingCard}
                  alt="Add to Cart"
                />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small reusable info card
const InfoCard = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <p className="text-base sm:text-lg font-semibold">{value}</p>
  </div>
);

export default SingleFoodFullDetails;
