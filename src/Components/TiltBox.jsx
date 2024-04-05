import React from "react";
import Atropos from "atropos/react";
import { m } from "framer-motion";

export const TiltBox = (props) => {
  return (
    <div className="justify-center" {...props.animation}>
      <Atropos
        highlight={false}
        stretchX={0}
        stretchY={0}
        rotateTouch={false}
        className={`my-atropos ${props.className} w-full`}
      >
        {props.children}
      </Atropos>
    </div>
  );
};
