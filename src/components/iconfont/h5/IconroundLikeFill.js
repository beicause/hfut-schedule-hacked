/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconroundLikeFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M515.2 67.2c-246.4 0-448 201.6-448 448s201.6 448 448 448 448-201.6 448-448-201.6-448-448-448zM704 563.2l-150.4 153.6c-12.8 12.8-25.6 19.2-41.6 19.2s-28.8-6.4-41.6-19.2l-147.2-153.6C307.2 544 288 515.2 288 476.8c0-67.2 54.4-121.6 118.4-121.6 32 0 60.8 12.8 83.2 35.2l22.4 22.4c9.6-9.6 19.2-22.4 22.4-22.4 22.4-22.4 51.2-35.2 83.2-35.2 67.2 0 118.4 54.4 118.4 121.6 3.2 41.6-12.8 64-32 86.4z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </svg>
  );
};

IconroundLikeFill.defaultProps = {
  size: 18,
};

export default IconroundLikeFill;
