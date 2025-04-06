import React from "react";
import "./SearchCard.css";

const SearchCard = ({ title, description, imageUrl }) => {
  return (
    <div className="insight-card">
      <img src={imageUrl} alt={title} className="card-image" />
      <span className="text-base">{title}</span>
      <p className="text-base font-serif text-[32px]">{description}</p>
    </div>
  );
};

export default SearchCard;
