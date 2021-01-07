/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconroundRankFill = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64C265.6 64 64 262.4 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64z m-96 592c0 25.6-22.4 48-48 48s-48-22.4-48-48v-188.8c0-25.6 22.4-48 48-48s48 22.4 48 48v188.8z m144 0c0 25.6-22.4 48-48 48s-48-22.4-48-48v-128c0-25.6 22.4-48 48-48s48 22.4 48 48v128z m144 3.2c0 25.6-22.4 48-48 48s-48-22.4-48-48v-256c0-25.6 22.4-48 48-48s48 22.4 48 48v256z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </Svg>
  );
};

IconroundRankFill.defaultProps = {
  size: 18,
};

export default IconroundRankFill;
