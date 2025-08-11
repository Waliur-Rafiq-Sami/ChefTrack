import { useNavigate } from "react-router-dom";
import shape1 from "../../Img/SpecialShape/img2.jpg";
import shape2 from "../../Img/SpecialShape/img3.jpg";
import shape3 from "../../Img/SpecialShape/img4.jpg";
import shape4 from "../../Img/SpecialShape/img5.jpg";
import shape5 from "../../Img/SpecialShape/img6.jpg";
import shape6 from "../../Img/SpecialShape/img7.jpg";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// Data set for the special shapes
const specialShapes = [
  {
    id: 1,
    name: "Golden Sphere",
    image: shape1,
    description:
      "A perfect sphere representing unity and balance. Made with the finest materials for a flawless finish.",
    details: "No faces, no edges, no vertices. Found in planets and gems.",
  },
  {
    id: 2,
    name: "Mystic Pyramid",
    image: shape2,
    description:
      "A solid, four-sided pyramid symbolizing strength and direction. An ancient and powerful form.",
    details:
      "Polygonal base with triangular faces meeting at an apex. Seen in monuments.",
  },
  {
    id: 3,
    name: "Crystal Cube",
    image: shape3,
    description:
      "A classic cube shape, representing stability and order. Each side is perfectly symmetrical.",
    details:
      "Six equal square faces, eight vertices, and twelve edges. A common building block.",
  },
  {
    id: 4,
    name: "Infinity Cylinder",
    image: shape4,
    description:
      "A beautiful cylinder, symbolizing continuous motion and flow. Elegant in its simplicity.",
    details: "Two parallel circular bases. Found in columns and cans.",
  },
  {
    id: 5,
    name: "Starlight Cone",
    image: shape5,
    description:
      "A graceful cone that narrows to a single point, representing focus and aspiration.",
    details:
      "Circular base and a curved surface leading to a vertex. Used in funnels and hats.",
  },
  {
    id: 6,
    name: "Prism of Light",
    image: shape6,
    description:
      "A multi-faceted prism that captures and refracts light, creating beautiful visual effects.",
    details:
      "Two identical parallel polygonal bases. Creates rainbows from light.",
  },
];

const ShapeCard = ({ shape, navigate }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full md:flex justify-between items-center relative md:p-0 px-1">
      <div className="md:h-48 md:w-50 overflow-hidden">
        <img
          src={shape.image}
          alt={shape.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Spacial Shape
        </span>
      </div>
      <div className="md:p-5 p-2 pb-5 flex-col justify-between">
        <div>
          <h2 className="md:text-2xl font-extrabold text-gray-900 leading-tight">
            {shape.name}
          </h2>
          <p className="text-md md:text-xl text-gray-500 mt-1">
            <span className="font-extrabold text-gray-900 leading-tight">
              Description:{"  "}
            </span>
            {shape.description}
          </p>
          <div className="flex justify-between items-end md:gap-10 gap-2">
            <p className="md:text-xl font-bold text-green-600 mt-2">
              {shape.details}
            </p>
            {/* <button
              onClick={() => navigate(`/shape/${shape.id}`)}
              className="btn btn-circle  bg-[#1daf1871] hover:bg-[#1daf188c]  border-0 outline-none shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 ease-out text-white text-lg"
            >
              <MdOutlineArrowForwardIos />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecialShapeDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto md:px-4 md:py-8">
      <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
        Our Special Shapes Details
      </h1>
      <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify">
        Explore a curated collection of unique shapes, each with its own story
        and purpose. From ancient symbols to the building blocks of nature, our
        special shapes are a testament to the beauty of form and structure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center md:gap-3 md:gap-x-5 mt-5">
        {specialShapes.map((shape) => (
          <div key={shape.id} className="w-full">
            <ShapeCard shape={shape} navigate={navigate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialShapeDetails;
