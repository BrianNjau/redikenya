import React from "react";
import "./SearchSection.css";
import SearchSectionImage from "../../Assets/img/searchsect.png"; // Replace with actual image path
const SearchSection = () => {
  return (
    <div className="informed-decisions-container">
      <div className="text-content">
        <h6 className="text-xl text-black">Make Informed Property Decisions</h6>
        <p className="text-base font-serif text-[32px]">
          Our comprehensive property database provides you with accurate and
          up-to-date information about Nairobi's real estate market. Whether
          you're buying, selling, or investing, make data-driven decisions with
          confidence.
        </p>
      </div>
      <div className="map-container">
        <img src={SearchSectionImage} alt="Nairobi Map" className="map-image" />
      </div>
    </div>
  );
};

export default SearchSection;
