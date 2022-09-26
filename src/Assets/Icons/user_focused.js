import * as React from "react";
import Svg, { Defs, Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    {...props}
  >
    <Defs></Defs>
    <Path
      d="M11 2c-4.96 0-9 4.04-9 9 0 2.14.77 4.21 2.14 5.82A4.973 4.973 0 0 1 8 15h6c1.53 0 2.93.69 3.86 1.82A9.022 9.022 0 0 0 20 11c0-4.96-4.04-9-9-9Zm0 11.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"
      style={{
        fill: "none",
      }}
    />
    <Circle
      className="cls-2"
      cx={11}
      cy={8.5}
      r={3}
      style={{
        fill: "#a2b6fc",
      }}
    />
    <Path
      className="cls-2"
      d="M14 17H8c-.96 0-1.85.45-2.4 1.2C7.15 19.37 9.04 20 11 20s3.85-.63 5.4-1.8A2.97 2.97 0 0 0 14 17Z"
      style={{
        fill: "#a2b6fc",
      }}
    />
    <Path
      className="cls-3"
      d="M11 3.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm-3 5c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3Z"
      style={{
        fill: "#2b47fc",
      }}
    />
    <Path
      className="cls-3"
      style={{
        fill: "#2b47fc",
      }}
      d="M11 0C4.93 0 0 4.93 0 11c0 3.11 1.32 6.09 3.63 8.17.01.01.02.02.04.03C5.69 21.01 8.29 22 11 22s5.31-.99 7.33-2.8c.01 0 .02-.02.04-.03C20.68 17.09 22 14.11 22 11c0-6.07-4.93-11-11-11Zm0 20c-1.96 0-3.85-.63-5.4-1.8A2.97 2.97 0 0 1 8 17h6c.96 0 1.85.45 2.4 1.2A8.945 8.945 0 0 1 11 20Zm6.86-3.18A4.973 4.973 0 0 0 14 15H8c-1.53 0-2.93.69-3.86 1.82A9.022 9.022 0 0 1 2 11c0-4.96 4.04-9 9-9s9 4.04 9 9c0 2.14-.77 4.21-2.14 5.82Z"
    />
  </Svg>
);

export default SvgComponent;
