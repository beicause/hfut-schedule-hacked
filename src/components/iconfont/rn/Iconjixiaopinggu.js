/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconjixiaopinggu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M163.555556 117.333333h696.888888v789.333334h-696.888888z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M832 960h-640c-46.933333 0-85.333333-38.4-85.333333-85.333333v-725.333334c0-46.933333 38.4-85.333333 85.333333-85.333333h640c46.933333 0 85.333333 38.4 85.333333 85.333333v725.333334c0 46.933333-38.4 85.333333-85.333333 85.333333z m-640-839.111111c-15.644444 0-28.444444 12.8-28.444444 28.444444v725.333334c0 15.644444 12.8 28.444444 28.444444 28.444444h640c15.644444 0 28.444444-12.8 28.444444-28.444444v-725.333334c0-15.644444-12.8-28.444444-28.444444-28.444444h-640z"
        fill={getIconColor(color, 1, '#194F82')}
      />
      <Path
        d="M219.022222 177.777778h583.111111v668.444444h-583.111111z"
        fill={getIconColor(color, 2, '#FFC44F')}
      />
      <Path
        d="M483.555556 640c0 15.644444-12.8 28.444444-28.444445 28.444444h-113.777778c-15.644444 0-28.444444-12.8-28.444444-28.444444s12.8-28.444444 28.444444-28.444444h113.777778c15.644444 0 28.444444 12.8 28.444445 28.444444zM696.888889 753.777778c0 15.644444-12.8 28.444444-28.444445 28.444444h-327.111111c-15.644444 0-28.444444-12.8-28.444444-28.444444s12.8-28.444444 28.444444-28.444445h327.111111c15.644444 0 28.444444 12.8 28.444445 28.444445zM706.844444 536.177778l-173.511111-280.888889c-4.977778-8.533333-14.933333-13.511111-24.177777-13.511111-9.955556 0-19.2 5.688889-24.177778 14.222222l-167.822222 284.444444c-7.822222 13.511111-3.555556 31.288889 9.955555 39.111112 4.266667 2.844444 9.244444 4.266667 14.222222 4.266666 9.955556 0 19.2-4.977778 24.177778-14.222222l46.933333-78.933333h199.111112l46.933333 75.377777c8.533333 13.511111 25.6 17.777778 39.111111 9.244445 13.511111-7.822222 17.777778-25.6 9.244444-39.111111z m-260.977777-102.4l64-108.8 66.844444 108.8h-130.844444zM696.888889 256c0-15.644444-12.8-28.444444-28.444445-28.444444s-28.444444 12.8-28.444444 28.444444c-15.644444 0-28.444444 12.8-28.444444 28.444444s12.8 28.444444 28.444444 28.444445c0 15.644444 12.8 28.444444 28.444444 28.444444s28.444444-12.8 28.444445-28.444444c15.644444 0 28.444444-12.8 28.444444-28.444445s-12.8-28.444444-28.444444-28.444444z"
        fill={getIconColor(color, 3, '#194F82')}
      />
    </Svg>
  );
};

Iconjixiaopinggu.defaultProps = {
  size: 18,
};

export default Iconjixiaopinggu;