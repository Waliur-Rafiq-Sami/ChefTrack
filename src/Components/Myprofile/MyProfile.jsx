import { useContext, useState, useEffect } from "react";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import useAxiousSecure from "../../Hook/useAxiousSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, logOut, myProfile } = useContext(AuthProvider);
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const axiosSecure = useAxiousSecure();

  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  // Initialize form data
  useEffect(() => {
    if (user?.email && myProfile?.email) {
      const initialData = {
        displayName: myProfile.displayName || user.displayName || "",
        email: myProfile.email || user.email || "",
        phone: myProfile.phone || "",
        photoURL:
          myProfile.photoURL ||
          user.photoURL ||
          "https://i.ibb.co/4pDNDk1/avatar.png",
        address: myProfile.address || "",
      };
      setFormData(initialData);
      setInitialFormData(initialData);
      setIsChanged(false);
    }
  }, [user, myProfile]);

  // Detect changes
  useEffect(() => {
    const changed = Object.keys(formData).some(
      (key) => formData[key] !== initialFormData[key]
    );
    setIsChanged(changed);
  }, [formData, initialFormData]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes to your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put("/profile", formData)
          .then(() => {
            // console.log("Response: ", res.data);
            setIsEditing(false);
            setInitialFormData(formData); // update initial data
            setIsChanged(false); // reset change state
            Swal.fire({
              title: "Saved!",
              text: "Your profile has been updated successfully.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialFormData); // revert to initial values
    setIsChanged(false);
  };

  const handleLogOut = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:p-6 p-2 font-sans">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl md:p-8 p-3 max-w-3xl w-full border border-white/30 pb-7">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={formData.photoURL || " "}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="text-center bg-transparent border-b border-gray-300 focus:outline-none"
              />
            ) : (
              formData.displayName || "Unnamed User"
            )}
          </h2>
          <p className="text-gray-500">{formData.email}</p>
          <span className="mt-2 px-3 py-1 text-sm bg-indigo-500 text-white rounded-full shadow">
            {user.role || "Information"}
          </span>
        </div>

        {/* User Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 md:col-span-2 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Photo URL</h3>
            {isEditing ? (
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-800">
                {formData.photoURL || (
                  <span className="text-red-400">Not set</span>
                )}
              </p>
            )}
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Full Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-800">
                {formData.displayName || (
                  <span className="text-red-400">Not set</span>
                )}
              </p>
            )}
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Email</h3>
            {isEditing ? (
              <div className="tooltip">
                <div className="tooltip-content bg-transparent">
                  <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
                    Sorry!! Can't change.
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  readOnly
                  className="w-full "
                />
              </div>
            ) : (
              <p className="text-gray-800">{formData.email}</p>
            )}
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-800">
                {formData.phone || (
                  <span className="text-red-400">Not set</span>
                )}
              </p>
            )}
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Address</h3>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-800">
                {formData.address || (
                  <span className="text-red-400">Not set</span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!isChanged} // disable if no changes
                className={`px-5 py-2 font-medium rounded-lg shadow transition-all ${
                  isChanged
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg shadow transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn md:px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogOut}
                className="btn md:px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
