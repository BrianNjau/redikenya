import React from "react";
import "./SearchSection.css";
import SearchSectionImage from "../../Assets/img/searchsect.png"; // Replace with actual image path
const SearchSection = () => {
  return (
    <div className="informed-decisions-container">
      <div className="text-content">
        <h6 className="text-xl text-black">Make Informed Property Decisions</h6>
        <p className="text-base font-serif text-[32px]">
          The search feature is designed specifically for prospective property
          buyers and developers who want to explore the local market by
          conducting a thorough comparative market analysis. Additionally, the
          analytics feature identifies the primary price influencers in the
          residential sector, with location being a fundamental factor inherent
          to the real estate industry.
        </p>
      </div>
      <div className="map-container">
        <img src={SearchSectionImage} alt="Nairobi Map" className="map-image" />
      </div>
    </div>
  );
};

export default SearchSection;
