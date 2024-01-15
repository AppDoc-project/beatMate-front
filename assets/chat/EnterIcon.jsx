import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function EnterIcon(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M9.884 23.743c-.105.256-.188.405-.188.62a.806.806 0 00.807.806c.214 0 .314.027.65-.157.337-.184 17.275-8.563 17.275-8.563a1.615 1.615 0 000-2.897S11.302 5.185 11.076 5.066a1.297 1.297 0 00-.633-.174.807.807 0 00-.807.807c0 .214.036.299.191.615.156.316 4.217 8.692 4.217 8.692s-4.054 8.482-4.159 8.737z"
        fill="#B5B5B5"
      />
    </Svg>
  );
}

export default EnterIcon;