import SliderBanner from "./SliderBanner";
import SpecialItems from "./SpecialItems";
import CommitmentSection from "./CommitmentSection";
import UniqueFoodItem from "./UniqueFoodItem";
import SpecialShapeDetails from "./SpecialShapeDetails";
import CustomerReviews from "./CustomerReviews";

const HomePage = () => {
  return (
    <>
      <div className="md:mx-5 mx-1">
        <SliderBanner></SliderBanner>
      </div>

      <div className="md:mx-5 mx-1 md:mt-10">
        <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
          Our Special Items
        </h1>
        <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify">
          Discover the flavors that have captured the hearts (and taste buds) of
          our community. From juicy burgers to crispy calamari, these top-tier
          meals are our most-purchased items, each one a testament to
          deliciousness and quality. Explore these fan favorites and see what
          all the fuss is about.
        </p>
        <div className="mt-5">
          <SpecialItems></SpecialItems>
        </div>
      </div>

      <div className="md:mb-10 md:mt-10">
        <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
          Our Unique Food
        </h1>
        <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify md:mb-5">
          Step into a world of flavor you've never known. Our menu features a
          curated selection of unique food items designed to awaken your senses.
          Imagine bold spices, unexpected textures, and perfectly balanced
          tastes that tell a story with every mouthful. Your adventure awaits.
        </p>
        <UniqueFoodItem></UniqueFoodItem>
      </div>

      <div className="pb-10">
        <CommitmentSection></CommitmentSection>
      </div>

      <div>
        <div>
          <SpecialShapeDetails></SpecialShapeDetails>
        </div>
      </div>

      <div>
        <div>
          <CustomerReviews></CustomerReviews>{" "}
        </div>
      </div>
    </>
  );
};

export default HomePage;
