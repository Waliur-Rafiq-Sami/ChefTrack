import Swal from "sweetalert2";

const SwalAlart = ({ type, title, text, icon }) => {
  if (type === 1) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  }
  return null;
};

export default SwalAlart;
