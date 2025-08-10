import commitmentImage from "../../Img/Banner/img1.jpg";

const CommitmentSection = () => {
  return (
    <div className="bg-gray-100 p-1 md:p-8 m-2 rounded-lg shadow-lg flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
      {/* Image Section - order changes on small screens */}
      <div className="w-full md:w-1/2 md:order-2">
        <img
          src={commitmentImage}
          alt="Fresh ingredients"
          className="rounded-lg shadow-md w-full h-auto"
        />
      </div>

      {/* Text Content Section - order changes on small screens */}
      <div className="w-full md:w-1/2 md:order-1 px-3">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
          Our Commitment to Quality
        </h2>
        <p className="text-gray-600 mb-4 text-justify md:text-left">
          We believe great food starts with great ingredients. That's why we
          source the freshest local produce and use only high-quality
          ingredients in every single dish we prepare.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 text-left">
          <li>Fresh, local ingredients</li>
          <li>Expertly crafted recipes</li>
          <li>Fast and reliable delivery</li>
          <li>Exceptional customer service</li>
        </ul>
      </div>
    </div>
  );
};

export default CommitmentSection;
