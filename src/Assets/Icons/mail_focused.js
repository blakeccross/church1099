import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 18"
    {...props}
  >
    <Defs></Defs>
    <Path
      className="cls-1"
      d="M11.724 11.47a3.033 3.033 0 0 1-1.45 0c-.54-.134-.945-.42-1.683-.936L2 5.92v6.28c0 1.47 0 2.28.218 2.708.193.38.495.68.873.873C3.52 16 4.33 16 5.8 16h10.4c1.47 0 2.28 0 2.708-.219.38-.192.68-.494.873-.872C20 14.48 20 13.67 20 12.2V5.92l-6.592 4.614c-.737.517-1.143.802-1.684.936ZM3.191 2.179c-.033.013-.07.024-.099.04-.056.028-.098.075-.15.109l.249-.15Z"
    />
    <Path
      d="M2.218 3.092c-.06.118-.103.264-.135.446l7.655 5.358c.524.367.84.588 1.018.632.16.04.327.04.486 0 .18-.044.496-.265 1.019-.632l7.656-5.358a1.58 1.58 0 0 0-.135-.446 1.987 1.987 0 0 0-.874-.874C18.48 2 17.67 2 16.2 2H5.8c-1.369 0-2.16.002-2.609.178l-.25.15a1.973 1.973 0 0 0-.723.764Z"
      style={{
        fill: "#a2b6fc",
      }}
    />
    <Path
      d="M21.982 4.189a1.009 1.009 0 0 0-.03-.497c-.053-.6-.161-1.063-.388-1.507A3.976 3.976 0 0 0 19.816.436C18.96 0 18.037 0 16.2 0H5.8C3.962 0 3.04 0 2.184.436A3.98 3.98 0 0 0 .436 2.184C.21 2.63.101 3.092.048 3.692a.998.998 0 0 0-.03.496C0 4.64 0 5.166 0 5.8v6.4c0 1.837 0 2.76.436 3.616a3.97 3.97 0 0 0 1.748 1.747C3.04 18 3.962 18 5.8 18h10.4c1.837 0 2.76 0 3.615-.435a3.967 3.967 0 0 0 1.75-1.749C22 14.96 22 14.037 22 12.2V5.8c0-.635 0-1.16-.018-1.611ZM3.191 2.179C3.639 2.002 4.431 2 5.8 2h10.4c1.47 0 2.28 0 2.708.218.38.193.68.495.874.874.06.118.104.265.135.446l-7.656 5.359c-.523.366-.838.587-1.019.632a1.02 1.02 0 0 1-.486 0c-.179-.045-.494-.266-1.018-.633L2.083 3.538a1.58 1.58 0 0 1 .135-.446c.165-.322.421-.573.724-.765.052-.033.094-.08.15-.109.03-.015.066-.027.099-.04ZM20 12.2c0 1.47 0 2.28-.219 2.71-.192.377-.494.679-.873.871-.429.22-1.238.22-2.708.22H5.8c-1.47 0-2.28 0-2.709-.22a1.983 1.983 0 0 1-.873-.873C2 14.48 2 13.67 2 12.2V5.92l6.591 4.614c.738.517 1.144.802 1.683.936.476.117.977.117 1.45 0 .54-.134.947-.42 1.684-.936L20 5.92v6.28Z"
      style={{
        fill: "#2b47fc",
      }}
    />
  </Svg>
);

export default SvgComponent;
