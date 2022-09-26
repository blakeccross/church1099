import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.48 22"
    {...props}
  >
    <Defs></Defs>
    <Path
      className="cls-1"
      style={{
        fill: "#333",
      }}
      d="M18.24 13.077c-.995-1.599-1.5-3.643-1.5-6.077 0-1.87-.727-3.627-2.05-4.95C13.367.728 11.61 0 9.74 0S6.113.728 4.79 2.05A6.956 6.956 0 0 0 2.74 7c0 2.434-.504 4.479-1.505 6.087-1.076 1.73-1.27 2.04-1.23 2.537.039.47.225.803.6 1.08.398.296.806.296 2.524.296H16.35c1.717 0 2.125 0 2.519-.293.38-.28.567-.614.605-1.083.04-.495-.153-.807-1.236-2.547ZM2.938 14.134C4.134 12.214 4.74 9.814 4.74 7c0-1.335.52-2.59 1.464-3.536C7.15 2.52 8.405 2 9.74 2s2.59.52 3.536 1.464A4.967 4.967 0 0 1 14.74 7c0 2.813.606 5.214 1.807 7.142.188.304.373.6.53.857H2.404c.157-.259.343-.558.535-.865ZM11.724 19.25c-1.097.967-2.873.967-3.968 0a1 1 0 1 0-1.323 1.5 4.998 4.998 0 0 0 6.614 0 .999.999 0 1 0-1.323-1.5Z"
    />
  </Svg>
);

export default SvgComponent;