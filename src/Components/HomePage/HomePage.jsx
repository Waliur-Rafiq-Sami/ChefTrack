import SliderBanner from "./SliderBanner";
import SpecialItems from "./SpecialItems";
import CommitmentSection from "./CommitmentSection";
import UniqueFoodItem from "./UniqueFoodItem";
import SpecialShapeDetails from "./SpecialShapeDetails";
import CustomerReviews from "./CustomerReviews";
import TopPicks from "./TopPicks";
import TastTheEx from "./TastTheEx";
import PremiumFood from "./PremiumFood";

const HomePage = () => {
  return (
    <>
      <div className="md:mx-5 mx-1">
        <SliderBanner></SliderBanner>
      </div>

      {/* // TopPicks items  */}
      <div className="md:mx-5 mx-1 md:mt-10">
        <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
          Our Top Picks
        </h1>
        <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify">
          Feast your eyes (and your appetite) on the dishes everyone’s talking
          about. From sizzling grills to creamy delights, these best-selling
          favorites are loved for their unbeatable flavor, freshness, and
          irresistible appeal. Taste the hype — your new favorite might be right
          here.
        </p>
        <div className="mt-5">
          <TopPicks></TopPicks>
        </div>
      </div>

      {/* // special items  */}
      {/* <div className="md:mx-5 mx-1 md:mt-10"> */}
      <div className="">
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

      {/* Unique & Premium Food Intro */}
      <TastTheEx></TastTheEx>
      {/* Our unique food  */}
      <div className="md:mt-10">
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

      {/* Our Expancive food  */}
      <div className="">
        <h1 className="md:text-3xl text-xl mt-3 font-bold text-center">
          Our Premium Creations
        </h1>
        <p className="max-w-4xl md:text-center mx-auto py-3 px-3 text-justify md:mb-5">
          Indulge in the art of fine dining with our handpicked selection of
          premium dishes. Crafted from the rarest ingredients and elevated with
          masterful techniques, each plate is a statement of elegance, flavor,
          and exclusivity. This isn’t just food — it’s a luxurious experience
          worth savoring.
        </p>
        <PremiumFood></PremiumFood>
      </div>

      <div className="pb-10">
        <CommitmentSection></CommitmentSection>
      </div>

      <div>
        <SpecialShapeDetails></SpecialShapeDetails>
      </div>

      <div>
        <CustomerReviews></CustomerReviews>{" "}
      </div>
    </>
  );
};

export default HomePage;
