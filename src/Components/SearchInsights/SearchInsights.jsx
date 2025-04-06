import React from "react";
import SearchCard from "../SearchCard/SearchCard";
import SearchCard1 from "../../Assets/img/searchcard1.png";
import SearchCard2 from "../../Assets/img/searchcard2.png";
import SearchCard3 from "../../Assets/img/searchcard3.png";
import "./SearchInsights.css"; // Import the CSS file for styling

const SearchInsights = () => {
  return (
    <div className="property-insights-container">
      <div className="insights-grid">
        <SearchCard
          title="Vital Insights"
          description="Get vital insights into the dynamics of the real estate market "
          imageUrl={SearchCard1} // Replace with actual image path
        />
        <SearchCard
          title="Uncover high yield prospects"
          description="Understand the property's location in relation to other features such as amenities"
          imageUrl={SearchCard2} // Replace with actual image path
        />
        <SearchCard
          title="Data Insights"
          description="Visualize property data through interactive maps and detailed analytics."
          imageUrl={SearchCard3} // Replace with actual image path
        />
      </div>
    </div>
  );
};

export default SearchInsights;
