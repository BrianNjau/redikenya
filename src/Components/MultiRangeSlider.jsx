import React, { useState } from "react";


import { InputNumber, Slider } from "antd";

const MultiRangeSlider = ({ min, max, onChange }) => {
    const [sliderValMin, setSliderValMin] = useState(min);
    const [sliderValMax, setSliderValMax] = useState(max);

    //my function
    const minInputRangeSliderHandler = (val) => {
        
        setSliderValMin(val);

        
    }
    //my function
    const maxInputRangeSliderHandler = (val) => {
        
        setSliderValMax(val);
       
    }
    const rangeSliderHandler = (val) => {
       
        setSliderValMin(val[0]);
        setSliderValMax(val[1]);
        
    }

    

    return (
        <div>
        <Slider range defaultValue={[min, max]} min={min} max={max} onAfterChange={onChange} onChange={rangeSliderHandler}  value={[sliderValMin, sliderValMax]} />
        <InputNumber 
        disabled
        prefix="Ksh. "
        style={{width:"46%"}}
         className="thumb thumb--left mr-1 " formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         parser={(value) => value.replace(/\$\s?|(,*)/g, '')} value={sliderValMin} onChange={minInputRangeSliderHandler} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        <InputNumber
         disabled
          prefix="Ksh. " 
          style={{width:"46%"}}
         className="thumb thumb--right " formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         parser={(value) => value.replace(/\$\s?|(,*)/g, '')} value={sliderValMax} onChange={maxInputRangeSliderHandler} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        </div>
    );
};



export default MultiRangeSlider;
