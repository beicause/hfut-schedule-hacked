/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconqupiao = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M821.333333 85.333333c64.8 0 117.333333 52.533333 117.333334 117.333334v149.333333c0 64.8-52.533333 117.333333-117.333334 117.333333h-21.333333v437.333334c0 26.368-30.101333 41.418667-51.2 25.6L682.666667 882.666667l-59.733334 44.8a42.666667 42.666667 0 0 1-51.2 0l-59.733333-44.8-59.733333 44.8a42.666667 42.666667 0 0 1-51.2 0l-59.733334-44.8-66.133333 49.6c-21.098667 15.818667-51.2 0.768-51.2-25.6V469.333333h-21.333333c-63.776 0-115.658667-50.88-117.290667-114.261333L85.333333 352V202.666667c0-64.8 52.533333-117.333333 117.333334-117.333334z m-96 213.333334H298.666667a10.666667 10.666667 0 0 0-10.666667 10.666666v533.333334l27.733333-20.8a42.666667 42.666667 0 0 1 51.2 0l59.733334 44.8 59.733333-44.8a42.666667 42.666667 0 0 1 51.2 0l59.733333 44.8 59.733334-44.8a42.666667 42.666667 0 0 1 51.2 0L736 842.666667V309.333333a10.666667 10.666667 0 0 0-10.666667-10.666666zM543.978667 588.981333a32 32 0 1 1 0 64h-128a32 32 0 1 1 0-64z m64.032-138.666666a32 32 0 0 1 0 64H415.989333a32 32 0 0 1 0-64zM821.333333 149.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333334v149.333333a53.333333 53.333333 0 0 0 53.333334 53.333333h21.333333v-96a74.666667 74.666667 0 0 1 74.666667-74.666666h426.666666a74.666667 74.666667 0 0 1 74.666667 74.666666v96h21.333333a53.333333 53.333333 0 0 0 53.28-51.018666L874.666667 352V202.666667a53.333333 53.333333 0 0 0-53.333334-53.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Iconqupiao.defaultProps = {
  size: 18,
};

export default Iconqupiao;
