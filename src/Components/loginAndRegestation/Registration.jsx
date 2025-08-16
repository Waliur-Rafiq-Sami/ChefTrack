import { Link, useNavigate, useLocation } from "react-router-dom";
import registration_img from "../../Img/login_reg/img2.png";
import { useContext } from "react";
import { AuthProvider } from "../../Auth/AuthContextProvider";
import SwalAlart from "../../shared/SwalAllart/SwalAlart";
import useAxiousSecure from "../../Hook/useAxiousSecure";

const Registration = () => {
  const {
    createUserUseEmailAndPass,
    signInWithEmailAndPass,
    signInWithGoogle,
  } = useContext(AuthProvider);
  const axiosSecure = useAxiousSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle registration form submission
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const first_n = form.n1.value;
    const last_n = form.n2.value;
    const photoURL = form.pic.value;
    const phone = form.phoneNumber.value;
    const address = form.address.value;
    const email = form.email.value;
    const password = form.password.value;

    const userData = {
      displayName: first_n + " " + last_n,
      photoURL,
      phone,
      address,
      email,
    };

    createUserUseEmailAndPass(email, password)
      .then((result) => {
        if (result.user.email) {
          SwalAlart({
            type: 1,
            title: "Success!",
            text: "You're Registered! 🎉",
            icon: "success",
          });

          // Automatically sign in after registration
          signInWithEmailAndPass(email, password)
            .then(() => {
              form.reset();
              navigate(from, { state: location.state?.from?.state });
            })
            .catch(() => {}); // optional: handle login error silently

          // Save profile to backend
          axiosSecure
            .put("/profile", userData)
            .then(() => {})
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        SwalAlart({
          type: 1,
          title: "ERROR!!!",
          text: err.message,
          icon: "error",
        });
      });
  };

  // Handle Google sign-in
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        if (result.user.email) {
          SwalAlart({
            type: 1,
            title: "Success!",
            text: "You're In! 🎉",
            icon: "success",
          });
          navigate(from, { state: location.state?.from?.state });
        }
      })
      .catch((err) => {
        SwalAlart({
          type: 1,
          title: "ERROR!!!",
          text: err.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="flex items-center gap-5 justify-center mt-10 md:mt-30 flex-col-reverse md:flex-row">
      <div className="lg:w-1/2 w-full p-1">
        <img
          src={registration_img}
          className="lg:w-4/5 w-full"
          alt="Registration"
        />
      </div>

      <div className="bg-base-200 xl:w-1/3 lg:w-1/2 w-full p-2 md:pb-10">
        <div className="card bg-base-200 w-full shadow-2xl p-5">
          <h3 className="text-3xl font-bold text-center my-5">
            Registration Page
          </h3>
          <form onSubmit={handleRegistration}>
            <div className="flex gap-5 w-full mb-3">
              <div className="w-full">
                <label className="label">First Name</label>
                <input
                  type="text"
                  name="n1"
                  className="input w-full focus:outline-0 focus:border-blue-500"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="w-full">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  name="n2"
                  className="input w-full focus:outline-0 focus:border-blue-500"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="label">Photo URL</label>
              <input
                type="url"
                name="pic"
                className="input w-full focus:outline-0 focus:border-blue-500"
                placeholder="Photo URL"
              />
            </div>

            <div className="flex gap-5 w-full mb-3">
              <div className="w-full">
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="input w-full focus:outline-0 focus:border-blue-500"
                  placeholder="+880"
                  defaultValue="+880 "
                  required
                />
              </div>
              <div className="w-full">
                <label className="label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="input w-full focus:outline-0 focus:border-blue-500"
                  placeholder="Address"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full focus:outline-0 focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full focus:outline-0 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4 w-full">
              Register
            </button>
          </form>

          <p className="font-bold my-2">
            Or, continue with one of the following:
          </p>
          <div className="flex mt-3 gap-2 flex-col md:flex-row">
            <div className="w-full">
              <button
                onClick={handleSignInWithGoogle}
                className="btn bg-white text-black border-[#e5e5e5] w-full"
              >
                Google
              </button>
            </div>
            <div className="w-full">
              <button className="w-full btn bg-black text-white border-black">
                GitHub
              </button>
            </div>
            <div className="w-full">
              <button className="btn bg-[#1A77F2] text-white border-[#005fd8] w-full">
                Facebook
              </button>
            </div>
          </div>

          <p className="px-1 mt-5">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-400 font-bold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
