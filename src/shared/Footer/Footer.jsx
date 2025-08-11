import logo from "../../Img/logo/ChefTrack.png";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className=" container mx-auto footer sm:footer-horizontal text-base-content p-10">
        <aside>
          <img className="w-20" src={logo} alt="" />
          <p className="">
            <span className="text-green-500 font-bold">
              Good food good Life
            </span>
            <br />
            <span className="font-bold text-xl">Waliur Rafiq Sami</span>
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
