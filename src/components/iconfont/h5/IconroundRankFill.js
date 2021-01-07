/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconroundRankFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 64C265.6 64 64 262.4 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64z m-96 592c0 25.6-22.4 48-48 48s-48-22.4-48-48v-188.8c0-25.6 22.4-48 48-48s48 22.4 48 48v188.8z m144 0c0 25.6-22.4 48-48 48s-48-22.4-48-48v-128c0-25.6 22.4-48 48-48s48 22.4 48 48v128z m144 3.2c0 25.6-22.4 48-48 48s-48-22.4-48-48v-256c0-25.6 22.4-48 48-48s48 22.4 48 48v256z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </svg>
  );
};

IconroundRankFill.defaultProps = {
  size: 18,
};

export default IconroundRankFill;
