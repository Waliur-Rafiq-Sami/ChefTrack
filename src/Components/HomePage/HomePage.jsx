import SliderBanner from "./SliderBanner";
import SpecialItems from "./SpecialItems";
import CommitmentSection from "./CommitmentSection";
import UniqueFoodItem from "./UniqueFoodItem";

const HomePage = () => {
  return (
    <>
      <div className="md:mx-5 mx-1">
        <SliderBanner></SliderBanner>
      </div>
      <div className="md:mx-5 mx-1 md:mt-10">
        <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
          Our Top Foods
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
      <div className="flex justify-center">
        <button className="btn md:btn-wide btn-sm bg-[#20df1a] md:mt-2 md:mb-10 text-white font-bold md:text-lg">
          Show All
        </button>
      </div>
      <div className="md:mb-10">
        <UniqueFoodItem></UniqueFoodItem>
      </div>
      <div className="pb-10">
        <CommitmentSection></CommitmentSection>
      </div>
    </>
  );
};

export default HomePage;
