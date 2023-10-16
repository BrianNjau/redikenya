import React from 'react'

const HeroSelect = ({ handleSelect, selectedOption}) => {
  return (
    <select value={selectedOption}  onChange={handleSelect}  name="search" className="border-[1px] large-input border-solid border-transparent rounded-[6px]">
    <option value="all">All</option>
       <option value="Kilimani">Kilimani</option>
       <option value="Kileleshwa">Kileleshwa</option>
       <option value="Westlands">Westlands</option>
       <option value="Lavington">Lavington</option>
       <option value="Riverside">Riverside</option>
    </select>
  )
}

export default HeroSelect