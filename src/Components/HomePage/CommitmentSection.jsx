import commitmentImage from "../../Img/Banner/img1.jpg"; // Add an image for this section

const CommitmentSection = () => {
  return (
    <div className="bg-gray-100 md:p-8 p-2 m-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
      <h2 className="md:text-3xl text-xl font-bold text-gray-800 md:hidden -mt-15">
        Our Commitment to Quality
      </h2>
      <div className="md:w-1/2">
        <h2 className="md:text-3xl -mt-5 md:mt-0 font-bold text-gray-800 md:mb-4 text-md hidden md:block">
          Our Commitment to Quality
        </h2>
        <p className="text-gray-600 mb-4 md:text-md text-sm md:text-left text-justify mt-3 md:mt-0">
          We believe great food starts with great ingredients. That's why we
          source the freshest local produce and use only high-quality
          ingredients in every single dish we prepare.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Fresh, local ingredients</li>
          <li>Expertly crafted recipes</li>
          <li>Fast and reliable delivery</li>
          <li>Exceptional customer service</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <img
          src={commitmentImage}
          alt="Fresh ingredients"
          className="rounded-lg shadow-md w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CommitmentSection;
