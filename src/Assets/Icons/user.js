import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props}>
    <Path
      d="M4.316 18.438A4.001 4.001 0 0 1 8 16h6a4.001 4.001 0 0 1 3.684 2.438M15 8.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 2.5c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10Z"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </Svg>
);

export default SvgComponent;
