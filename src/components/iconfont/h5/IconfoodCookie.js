/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconfoodCookie = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M902.4 448.2c-3.6-0.3-7.5-0.6-11.6-1.1-35.9-4.2-44.6-17.9-44.6-17.9s-38 17.4-60.5 0.5c-4.3-3.3-7.8-6.9-10.6-10.7 3.8 0.1 7.6-0.3 11.3-0.8 6.9-1 13.7-2.9 20.2-5.5 2.8-1.1 2.3-1.5 4.2 0.5 10.7 11.2 29.4 14 43.9 15.5 15 1.6 31.1 2.5 45.9-0.8 0.9 6.9 1.4 13.6 1.8 20.3zM760.8 196c0.8 3.2 1.7 6 2.5 8.5-4.6 0.5-9.6-4.2-13.6-19.9-4.2-16.5 27.2-10 27.2 0.8-9.1-2.1-18.7 0.3-16.1 10.6zM840.2 308c-16.9-1.2-40.2 7.4-41.9 17.2-0.6 3.5 0 7.7 1.6 11.8-8-5.9-14.3-17.7-12.7-26.5 1.4-7.7 13.2-11.5 19.6-13.2 8.4-2.3 20-4 27.9 0.8 3.9 2.5 5.5 6.1 5.5 9.9z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M942.9 446.6c-40 38.3-86.9 18.3-86.9 18.3s-37.6 24.5-74.1 8.7c-40.5-17.6-35.2-67.5-35.2-67.5s-77.5 18.4-119.4-52.4c-43.1-72.8 9.4-126.4 9.4-126.4s-29.7 1.5-46.8-55c-6.7-22.1-1.7-46.1 7-67.3 0.1 1.3 5.5 60.6 34.8 84.4 29.7 24.1 50.6 28.1 50.6 28.1s-32.8 66.3-0.4 111.1c35.5 49 82.2 48 82.2 48s-4.9 33.2 21.4 52.9c22.4 16.9 60.5-0.5 60.5-0.5s8.6 13.7 44.6 17.9c35.1 4.3 52.3-0.3 52.3-0.3z"
        fill={getIconColor(color, 1, '#DEB985')}
      />
      <path
        d="M942.9 446.6c3.2 27.9 3.2 56 0.3 83.8-6-5.9-12.1-10.3-17.6-12.9-8.7-4.2-17.3-3.1-25.8 1.4-12.7 6.6-25.1 20.7-37.1 36-17.9 22.5-34.9 47.6-50.9 54.9-34.1 15.6-54.8-39.3-121.7-0.6-66.9 38.6-148.7 92.1-190.9 35.1-42.2-57.1-30-247.7-145.8-244.9-115.9 2.7-46.7 182.2-151.7 204.1-43 9-79.9-26.8-108.4-72.1 12.4-148.9 109-290.9 263.1-361.4 76.3-34.9 156.7-47.7 233.1-41-3.2 14.4-3.7 29.3 0.6 43.4 17.2 56.5 46.8 55 46.8 55s-52.5 53.6-9.4 126.4c41.9 70.8 119.4 52.4 119.4 52.4s-5.4 49.9 35.2 67.5c36.6 15.8 74.1-8.7 74.1-8.7s46.7 20 86.7-18.4z"
        fill={getIconColor(color, 2, '#CC9E79')}
      />
      <path
        d="M342.6 143.8C187.7 214.6 90.9 357.9 79.5 507.7c-4.8 63.3 5.6 127.8 33.4 188.5 4.4 9.6 9.1 19 14.2 28-0.2-0.5-0.4-0.9-0.7-1.4-28.2-61.6-38.5-127.1-33.2-191.4 12.4-148.9 109-290.9 263.1-361.4 76.3-34.9 156.7-47.7 233.1-41 1.8-8.2 4.5-16.2 7.6-23.9-82.6-11.2-171 0.5-254.4 38.7z"
        fill={getIconColor(color, 3, '#F2C186')}
      />
      <path
        d="M943.2 530.5c-15.1 145.9-111 284-262.2 353.2-210 96.1-450.9 24.4-554-159.4-0.2-0.5-0.4-0.9-0.7-1.4-28.2-61.6-38.5-127.1-33.2-191.4 28.5 45.3 65.4 81 108.4 72.1 104.9-21.9 35.8-201.4 151.7-204.1C469 396.8 456.8 587.3 499 644.4s124 3.6 190.9-35.1c66.9-38.6 87.7 16.2 121.7 0.6 34.1-15.6 73.2-111.8 113.9-92.3 5.7 2.6 11.7 7 17.7 12.9z"
        fill={getIconColor(color, 4, '#BA8B61')}
      />
      <path
        d="M910.5 653.6c-42.4 96.9-121.9 180.9-229.4 230-205.3 93.9-440.1 27.5-546.9-147.2-5.6-87.5 0.9-182.1 49.3-201 91.9-36 98.7 206.2 149 207.3s49.5-91 124.2-50.8 67.5 199.6 158.9 136.4c67.7-46.8 72.1-91.3 133.3-109.2 69.7-20.5 68.2 70 161.6-65.5z"
        fill={getIconColor(color, 5, '#AF7951')}
      />
      <path
        d="M220.4 294.2c2.5-12.4 51.2-44.5 61.9-28.3 10.7 16.2 6.1 105.8-32.2 93.2-38.3-12.7-32.2-52.5-29.7-64.9zM390.9 435.3c2.5-12.4 58.7-28.2 69.4-12 10.7 16.2 0.5 78.4-37.2 64.4-27.8-10.3-34.7-40-32.2-52.4zM663.8 524.2c13-2.8 45.2 41 32.4 57.1s-77.1 32.2-74.5-7.2c1.8-29 29.1-47.1 42.1-49.9zM104.6 523.3c10.6-36.2 91.5-29.6 79 12.1-6.3 20.9-18.5 46.7-36.8 44.4s-46.3-42.7-42.2-56.5zM331.5 655.5c20.1-21.3 87.5-6.1 77.3 34s-75.6 128-86.3 55.9c-7.4-50.4-26.1-52.7 9-89.9zM496.3 695.7c23.7-17.5 87.5-6.1 77.3 34-10.1 40.1-28.9 81.5-63.8 62.9-21.2-11.4-37-79.5-13.5-96.9zM451 296.2c7 15.8 50.1-16.4 74.1-33.9 24-17.5-7.9-48.7-31.4-34.7-23.6 14.1-54.4 42.3-42.7 68.6z"
        fill={getIconColor(color, 6, '#662E39')}
      />
      <path
        d="M760.8 196c10.5 41.6 27.5 15.3 30.5 2.3s-35.4-21.7-30.5-2.3zM856.6 316.2c-8.3-16.8-55.8-5.1-58.4 9s16.1 38.8 28.8 33c12.7-5.8 38-25.3 29.6-42z"
        fill={getIconColor(color, 7, '#CC9E79')}
      />
      <path
        d="M916.6 416.8v-0.3c-0.8-5.9-6.3-10.1-12.3-9.4-0.8 0.1-1.5 0.3-2.2 0.5-12.8 2.7-27.3 1.8-41.2 0.4-13.1-1.3-29.1-3.9-37-12.2l-0.2-0.2c-1.7-1.8-6.6-6.9-15-3.4-0.3 0.1-0.7 0.3-1.2 0.5-6.1 2.3-12 3.9-17.7 4.7-8.9 1.4-16.2 0.8-21.7-1.7-6-2.6-11.5-8.3-15.2-15.6-4.1-8.3-5.9-17.9-4.7-26.6 0.4-3-0.6-6.1-2.6-8.5s-5.1-3.8-8.3-3.8h-0.2c-5.5 0-11.8-1.2-19.2-3.6-31.9-10.2-56.6-37.3-60.1-66-2.5-20.2 1.9-43.7 12.2-64.8 1.5-3.1 1.4-6.7-0.1-9.7s-4.2-5.1-7.5-5.9c-5.5-1.2-11.3-3.9-16.2-6.4-14.3-7.3-24.6-14.6-31.7-22.4-5.8-6.5-10.7-15.1-14.8-26.5-4.8-13.1-8-27.3-9.3-41.1-0.2-2.5-1.3-4.8-3-6.6-3.5-3.9-9.3-4.2-16.8-4.6H568.9c-4.6-0.5-9.2-0.8-13.7-1.2l-1.1-0.1c-9.9-0.6-19.5-1-28.6-1.1-19.6-0.1-39.1 1.1-57.9 3.4-39.6 5-78.6 15.3-115.9 30.6-64.8 26.7-123 68.1-168.2 119.6-24.5 28-45.1 58.7-61.3 91.2-1.3 2.6-1.6 5.5-0.7 8.3s2.9 5.1 5.6 6.5l0.2 0.1c1.5 0.7 3.1 1 4.7 1 4.2 0 8-2.4 9.7-6.1 15.2-30.6 34.8-59.7 58.1-86.5 42.9-49 98.2-88.3 159.9-113.8 35.4-14.6 72.4-24.4 110.2-29.2 18.2-2.3 36.8-3.4 55.1-3.3 10.3 0.1 19.1 0.5 27.2 1.1 4.8 0.3 9.6 0.8 14.2 1.3h0.5c0.3 0 1 0 1.7 0.1h0.7c1.8 12.9 5.1 25.9 9.5 37.9 5.2 14.2 11.4 25.2 19.1 33.6 8.7 9.7 21.2 18.6 38.1 27.2 2.8 1.4 5.7 2.8 8.9 4.1-8.5 21.8-11.7 44.9-9.2 65.5 2.3 19.1 11.3 37.5 25.9 53 13.4 14.2 30.8 25.3 49.2 31.2 5.2 1.7 10.1 2.9 14.8 3.7 0.5 9.7 3 19.4 7.4 27.8 6 11.7 15.4 21 25.8 25.7 9.4 4.2 20.8 5.3 33.9 3.4 6.3-0.9 12.5-2.5 18.7-4.6 12.8 10.5 30.8 13.7 46.9 15.4 7.7 0.7 15.9 1.4 24.4 1.4 4.6 0 8.8-0.2 12.9-0.6 1.9 23.2 1.4 47.1-1.5 71.3-10.4 86.4-51.8 169.1-116.5 233-4.4 4.2-4.5 11.2-0.2 15.6l0.1 0.1c2.1 2.1 4.9 3.3 7.8 3.3 2.9 0 5.7-1.2 7.8-3.4 68.2-67.3 111.8-154.7 122.9-246 3.8-29.4 3.9-58.9 0.6-87.3zM686.1 803.7c-5.4 3.1-11.3 6.2-17.9 9.6-47 23.5-96.7 38.2-147.8 43.6-53.2 5.6-107.9 0.8-158.3-13.9-49-14.4-95-38.6-133.2-70-38.6-31.8-70.5-72.1-92.1-116.5-27-55.7-38.8-117.9-34.1-180 0.3-3-0.7-5.8-2.6-8.1-1.9-2.2-4.5-3.5-7.4-3.8-3-0.3-5.8 0.7-8.1 2.6-2.2 1.9-3.5 4.5-3.8 7.5-5.1 66.1 7.5 132.2 36.3 191.4 23 47.4 56.9 90.2 97.8 123.9 40.6 33.3 89.4 58.9 141.1 74 38.6 11.3 79.3 17.1 120.8 17.1 15.3 0 30.7-0.8 45.9-2.4 53.7-5.8 106-21.2 155.3-45.8 7-3.6 13.2-6.8 18.9-10l0.1-0.1c2.5-1.5 4.4-3.8 5.2-6.6 0.8-2.9 0.4-5.9-1.1-8.5-3.1-5.2-9.6-7-15-4zM762.7 204.8v0.8h5c13.6-0.1 22.4-16.3 24.7-26.4 1.8-7.4-1.6-14.8-9-19.8-8.9-6-23.6-8.4-32.7-2.1-6.2 4.3-8.7 11.7-6.7 19.9 3.9 15.9 10.2 25.1 18.7 27.6z m3.7-29c0.1 0 0.2 0 0.3 0.1 1.4 0.3 2.5 0.7 3.3 1.1-0.5 1.4-1.2 2.6-1.8 3.6-0.5-1.2-1.1-2.7-1.8-4.8z"
        fill={getIconColor(color, 8, '#934A19')}
      />
      <path
        d="M781.3 298.6c-2.9 16.2 10.6 37.5 26.7 42.1 1.8 0.5 3.7 0.8 5.6 0.8 6.8 0 12.3-3.4 15.9-5.7 6.5-4.1 12.2-8.9 16.9-14.2 5.7-6.5 11.1-17 9.6-27.3-1-6.5-4.8-12-10.7-15.6-9.1-5.5-21.4-6.2-36.5-2h-0.2c-6.1 1.7-24.6 6.9-27.3 21.9z m32.4 20.8c-5.2-1.7-11.3-11.1-10.8-16.4 0.6-0.6 3.2-2.8 11.6-5.1 8.8-2.3 16-2.4 19.3-0.4 0.2 0.1 0.3 0.2 0.4 0.3 0.2 1.8-1.6 6.1-4.4 9.4-3.2 3.7-7.3 7.1-12.1 10.1-1.2 0.6-3.2 1.8-4 2.1z"
        fill={getIconColor(color, 9, '#934A19')}
      />
    </svg>
  );
};

IconfoodCookie.defaultProps = {
  size: 18,
};

export default IconfoodCookie;
