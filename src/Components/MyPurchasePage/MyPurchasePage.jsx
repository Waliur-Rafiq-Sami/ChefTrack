import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import empty from "../../Img/empty/empty-cart.png";

const MyPurchasePage = () => {
  const axiosSecure = useAxiousSecure();
  const { user, loading, setUpdate, update } = useContext(AuthProvider);
  const email = user?.email;

  const [purchases, setPurchases] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchPurchases = useCallback(async () => {
    if (!email) return;
    setIsFetching(true);
    const res = await axiosSecure.get("/MyPurchasePage", { params: { email } });
    setPurchases(res.data || []);
    setIsFetching(false);
  }, [axiosSecure, email]);

  const handleDelete = async (foodId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete("/MyPurchasePage", {
          data: { email, foodId },
        });

        Swal.fire({
          title: "Deleted!",
          text: "Item removed successfully",
          icon: "success",
        });

        fetchPurchases(); // refresh the list
        setUpdate(!update); // trigger any dependent updates
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  const handleQuantityChange = async (foodId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axiosSecure.patch("/MyPurchasePage/updateQuantity", {
        email,
        foodId,
        quantity: newQuantity,
      });

      toast.success("Quantity updated");
      setUpdate(!update);
      setPurchases((prev) =>
        prev.map((item) =>
          item._id === foodId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  useEffect(() => {
    if (!loading) fetchPurchases();
  }, [loading, fetchPurchases]);

  // Calculate total calories and total price
  const totals = useMemo(() => {
    return purchases.reduce(
      (acc, item) => {
        acc.totalCalories += item.calorie * item.quantity;
        acc.totalPrice += item.price * item.quantity;
        return acc;
      },
      { totalCalories: 0, totalPrice: 0 }
    );
  }, [purchases]);

  const removeCard = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.get("/MyPurchasePage/clearCard", {
          params: { email: user.email },
        });
        console.log(response.data);

        Swal.fire({
          title: "Deleted!",
          text: "Cart cleared successfully",
          icon: "success",
        });

        setPurchases([]);
        setUpdate(!update);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {isFetching ? (
        // <div className="flex justify-center items-center h-40">
        //   <span className="loading loading-spinner loading-lg text-primary"></span>
        // </div>
        <>
          {/* // make it better  */}
          <div className="flex gap-5 xl:flex-row flex-col-reverse">
            {/* Skeleton Cards Section */}
            <div className="grid grid-cols-1 gap-6 flex-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden animate-pulse md:h-52"
                >
                  {/* Image skeleton */}
                  <div className="bg-gray-300 h-40 md:h-auto md:w-48 w-full"></div>

                  {/* Text & Actions skeleton */}
                  <div className="flex-1 p-4 flex justify-between">
                    <div className="space-y-2">
                      <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
                      <div className="bg-gray-300 h-4 w-full rounded"></div>
                      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                      <div className="bg-gray-300 h-5 w-24 rounded"></div>
                      <div className="bg-gray-300 h-3 w-32 rounded"></div>
                    </div>

                    {/* Right controls */}
                    <div className="flex flex-col items-center justify-between gap-3">
                      {/* Quantity skeleton */}
                      <div className="flex items-center flex-col gap-2 bg-gray-100 px-2 py-2 rounded-xl shadow-inner">
                        <div className="bg-gray-300 rounded-full h-8 w-8"></div>
                        <div className="bg-gray-300 h-6 w-10 rounded"></div>
                        <div className="bg-gray-300 rounded-full h-8 w-8"></div>
                      </div>

                      {/* Delete button skeleton */}
                      <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skeleton Calculation Bar */}
            <div className="w-full xl:w-80 mt-6 p-4 bg-gray-100 rounded-lg shadow-2xl animate-pulse">
              <div className="bg-gray-300 h-5 w-1/2 mb-3 rounded"></div>

              {/* Table header skeleton */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="bg-gray-300 h-4 rounded"></div>
                ))}
              </div>

              {/* Table rows skeleton */}
              {[...Array(4)].map((_, r) => (
                <div key={r} className="grid grid-cols-4 gap-2 mb-1">
                  {[...Array(4)].map((_, c) => (
                    <div key={c} className="bg-gray-300 h-4 rounded"></div>
                  ))}
                </div>
              ))}

              {/* Button skeleton */}
              <div className="bg-gray-300 h-10 w-full mt-6 rounded"></div>
            </div>
          </div>
        </>
      ) : purchases.length === 0 ? (
        <div className="text-center text-gray-500 xl:my-50 md:my-25 my-10 flex items-center justify-center">
          {/* <p className="text-lg font-medium">You have no purchases yet.</p> */}
          <img className="" src={empty} />
        </div>
      ) : (
        <>
          <h2 className="md:text-4xl text-2xl font-bold text-center text-primary mb-6">
            My Purchases
          </h2>
          <div className="flex gap-5 xl:flex-row flex-col-reverse">
            <div className="grid grid-cols-1 gap-6">
              {purchases.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow md:h-52"
                >
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-full md:w-48 h-full object-cover"
                  />
                  <div className="flex-1 p-4 flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{item.foodName}</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.sortDescription}
                      </p>
                      <p className="text-gray-700 text-sm mt-1">
                        <strong>Category:</strong> {item.foodCategory} |{" "}
                        <strong>Origin:</strong> {item.foodOrigin}
                      </p>
                      <p className="text-gray-700 text-sm">
                        <strong>Calories:</strong> {item.calorie} kcal
                      </p>
                      <p className="text-gray-800 font-semibold mt-2">
                        ${item.price}
                        {item.Discount > 0 && (
                          <span className="ml-2 badge badge-primary">
                            -{item.Discount}%
                          </span>
                        )}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Purchased on:{" "}
                        {new Date(item.purchaseDate).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-between mt-4 md:mt-0 gap-3">
                      <div className="flex items-center flex-col gap-2 bg-gray-100 px-2 py-2 rounded-xl shadow-inner">
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                        >
                          <AiOutlineMinus size={18} />
                        </button>

                        <span className="px-4 py-1 font-semibold text-gray-700 text-lg">
                          {item.quantity}
                        </span>

                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          <AiOutlinePlus size={18} />
                        </button>
                      </div>

                      <button
                        className="btn btn-error btn-square text-white hover:scale-110 transition-transform shadow-lg"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Bar */}
            <div className="">
              <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-2xl">
                <h3 className="text-lg font-semibold mb-3">Purchase Summary</h3>
                <table className="w-full table-auto text-sm md:text-md border-collapse text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 md:px-4 px-1">Name</th>
                      <th className="py-2 md:px-4 px-1">Calories</th>
                      <th className="py-2 md:px-4 px-1">Quantity</th>
                      <th className="py-2 md:px-4 px-1">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-2 md:px-4 px-1">{item.foodName}</td>
                        <td className="py-2 md:px-4 px-1">
                          {(item.calorie * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-2 md:px-4 px-1 text-center">
                          {item.quantity.toFixed(0)}
                        </td>
                        <td className="py-2 md:px-4 px-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="py-2 md:px-4 px-1">Total</td>
                      <td className="py-2 md:px-4 px-1">
                        {totals.totalCalories.toFixed(2)} kcal
                      </td>
                      <td className="py-2 md:px-4 px-1">-</td>
                      <td className="py-2 md:px-4 px-1">
                        ${totals.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                onClick={removeCard}
                className="btn btn-primary mt-10 btn-block"
              >
                Clear Card
              </button>
              <h2 className="xl:hidden mt-10 -mb-2 md:text-4xl text-2xl font-bold text-center text-primary">
                Purchases item
              </h2>
            </div>
          </div>
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default MyPurchasePage;
