import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      d="m19 19-4.35-4.35M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
      style={{
        fill: "#a2b6fc",
        stroke: "#2b47fc",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </Svg>
);

export default SvgComponent;
