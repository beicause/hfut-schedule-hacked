/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconhelp = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 746.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M512 245.333333c-76.8 0-138.666667 61.866667-138.666667 138.666667 0 17.066667 14.933333 32 32 32s32-14.933333 32-32c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667c0 27.733333-53.333333 76.8-91.733334 100.266667-8.533333 6.4-14.933333 17.066667-14.933333 27.733333v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-89.6c34.133333-25.6 106.666667-83.2 106.666667-145.066667 0-76.8-61.866667-138.666667-138.666667-138.666667z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

Iconhelp.defaultProps = {
  size: 18,
};

export default Iconhelp;
