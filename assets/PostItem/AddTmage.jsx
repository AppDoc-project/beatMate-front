import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

function AddImage(props) {
  return (
    <Svg width={98} height={98} viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={48.2402} y={34.8506} width={1.9113} height={21.0243} rx={0.955648} fill="#393939" />
      <Rect
        x={59.707}
        y={44.407}
        width={1.9113}
        height={21.0243}
        rx={0.955649}
        transform="rotate(90 59.707 44.407)"
        fill="#393939"
      />
      <Rect x={0.5} y={0.5} width={97} height={97} rx={7.5} stroke="#B5B5B5" />
    </Svg>
  );
}

export default AddImage;
