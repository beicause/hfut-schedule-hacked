/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconcreditcard = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-792 72h752v120H136V232z m752 560H136V440h752v352z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M651 728h165c4.4 0 8-3.6 8-8v-72c0-4.4-3.6-8-8-8H651c-4.4 0-8 3.6-8 8v72c0 4.4 3.6 8 8 8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconcreditcard.defaultProps = {
  size: 18,
};

export default Iconcreditcard;
