/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconfoodPizza = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M242 251c18.9 40.9 56.3 39.9 56.3 39.9s-147.9 294.5-180 451.3c-0.1 0.4-0.2 0.8-0.2 1.2-0.2 1-0.4 2.1-0.6 3.1-0.1 0.7-0.3 1.4-0.4 2.1-0.3 1.3-0.5 2.6-0.7 3.9-0.1 0.4-0.1 0.7-0.2 1.1-0.3 1.6-0.6 3.2-0.8 4.8-0.1 0.5-0.2 1-0.2 1.5-0.2 1.2-0.4 2.3-0.5 3.4-0.1 0.5-0.1 1-0.2 1.5-0.2 1.2-0.3 2.5-0.5 3.7 0 0.3-0.1 0.7-0.1 1-0.4 3.2-0.7 6.3-0.9 9.3v0.6c-0.1 1.4-0.2 2.7-0.3 4.1v0.2s-7.1 62.1 2.8 103.7c-2.8-3-5.2-6.8-6.9-11.7-13.8-39.2-5.7-110.6-5.7-110.6v-0.2l0.3-3.9v-0.6c0.2-2.9 0.5-5.9 0.9-9 0-0.3 0.1-0.6 0.1-1 0.1-1.2 0.3-2.4 0.5-3.6 0.1-0.5 0.1-1 0.2-1.5 0.2-1.1 0.3-2.2 0.5-3.3 0.1-0.5 0.2-1 0.2-1.5 0.3-1.5 0.5-3.1 0.8-4.7 0.1-0.3 0.1-0.7 0.2-1.1 0.2-1.2 0.5-2.5 0.7-3.8 0.1-0.7 0.3-1.3 0.4-2l0.6-3c0.1-0.4 0.2-0.8 0.2-1.2 31-151.6 174-436.4 174-436.4s-36.1 0.9-54.4-38.6 17.1-79.4 71.9-104.8c29.4-13.6 62.1-23 96.6-28.3-28.4 5.7-55.4 14.3-80.1 25.7C259.6 168.8 223 210.1 242 251zM723.1 575c-2.1 0.9-4.3 1.4-6.6 1.4-14.9 0.5-19.3-7.1-25-14.1 0.3 0 0.6 0 0.9-0.1 1.4-0.1 2.9-0.1 4.4-0.1 15.2 0.1 21.1 6.4 26.3 12.9z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M713 455.3c-37.2 10.1-54 56.2-88.7 86.4-2.8 2.5-5.9 4.7-9.2 6.6-43.5-37.9-112.7-33.6-160.5 10.2-8.6-0.5-17.3-1.1-26.2-1.6-81.5-4.7-91.8 95.3-107.6 132.7-1.2 2.9-2.5 5.4-3.9 7.5-1.4 2.2-3.2 4.5-5.3 6.7-9.1-8.9-19.5-16.8-30.9-23.4-44.2-25.5-96.3-27.1-143.5-8.9 10.2-32.5 22.9-67.4 36.6-102.4 6.4 7 13.9 13.1 22.4 18.1C246.1 616 312.8 594 345.1 538c26.5-45.8 21.7-100.2-8.2-134.2 2.5-1.4 5.4-2.7 8.6-3.9 35.6-13.5 57.1-12.7 73-9.7 5.9 37.6 34.1 72.3 75.9 87.7 58.7 21.6 121.9-3.2 141.2-55.5 14.7-39.9-0.4-84.2-34.4-112.6 47.2-1.3 83.6 19.4 109.1 26.5 30.7 18.8 54.3 38.4 66.2 54.8 9.9 13.7 19.6 24.1 28.7 32.1 3.3 4.6 4.9 7.7 5.8 11.8 4.8 20.5-56 8-98 20.3z"
        fill={getIconColor(color, 1, '#F9CB40')}
      />
      <path
        d="M907.4 303.6c-9.9-8.2-29.6-6.3-41.5-3.8-15 3.1-29.5 8.9-42.9 16.2-23 12.6-53.7 40.9-43.5 68.7 5.4 14.6 18 24.5 25.6 38.6-17.6-14.5-27.4-33.4-43.1-48.5-15.4-14.9-33.5-27.3-51.7-38.4 6.9 1.9 14.6 3.4 21.6 1.3 7.5-2.3 12.1-8.8 14.9-15.8 6.5-15.9 8-34.7 6.3-51.8-3.5-34.8-21.1-66.8-43-93.4-12.2-14.8-25.9-28.5-41-40.3 73.6 23.5 144.6 61.9 198.8 117.7 14.7 15.2 27.9 31.7 39.5 49.5z"
        fill={getIconColor(color, 2, '#E29B47')}
      />
      <path
        d="M931 358.9c0 15.6-8.6 30.7-17.7 42.8-9.5 12.6-20.9 23.6-32.7 34-5.4 4.8-10.4 8.8-17.7 10.1-7.5 1.3-15.3 0.2-22.6-2-7-2.1-13.7-5.3-19.9-9.2-6.2-3.8-13.1-8.1-17-14.4-7.5-12.1-18.7-22-23.7-35.6-5.1-13.8-0.4-27.6 7.9-39 17.7-24.2 48.5-39.5 77.3-45.6 8.9-1.9 18.3-3.2 27.4-2.2 4.2 0.5 8.6 1.4 12.2 3.6 3.4 2 4.9 5.3 6.9 8.6 9 14.6 19.9 31.3 19.6 48.9z"
        fill={getIconColor(color, 3, '#CA7B38')}
      />
      <path
        d="M873.4 441.8c-17.4 14.5-36.9 25.1-50.7 43.5-13.7 18.2-23.5 39-34.1 59.1-7.7 14.4-15.9 34.2-31.4 41.7-8.1 4-18.1 3.1-25.5-2.1-7.4-5.3-11.1-14.4-19.4-18.7-17.3-8.9-41.8-1.2-54.1 12.7-13.4 15.2-19.3 35.5-26.3 54-7.9 20.9-17.9 41.3-30.8 59.6-11 15.5-29.1 34.1-49.8 24.7-9.6-4.4-17-12.6-23.8-20.3-3.2-3.7-6.5-7.3-9.8-10.9-3.1-3.3-7.1-7.5-12-7.6-8.4-0.1-12.9 12.7-15.6 18.9-4.3 10-7.6 20.4-12.7 30-2.1 3.8-9.6 17.3-15.8 15.5-2.4-0.7-3.8-4.5-4.8-6.5-1.6-3.2-2.9-6.6-4.9-9.6-4-6.1-10.1-8-16.7-4.5-7.2 3.9-11.7 11.6-15.8 18.4-11.5 19-21.6 38.8-31.9 58.5-8.6 16.5-19.7 34.4-39.6 37.4-18.9 2.9-38.3-5.9-52.8-17.2-3.7-2.8-7.2-6.1-11.7-7.6-5.1-1.6-10.5-0.8-15.4 1.2-9.3 3.7-17.1 11.2-24 18.3-15.7 16.3-26.2 36.3-40.4 53.7-11.8 14.6-28.7 28.5-47.2 33.2-8.7 2.2-18.7 2-26.3-3.2-8.3-5.6-11.8-15.4-14.2-24.8-5.8-22.8-6.2-47.2-5.4-70.5 0.4-11.6 1.3-23.2 2.3-34.8 0 10.1-0.4 20.3 2 30.1 2.3 9.1 6.3 15 16.2 16 19.5 2.1 40.4-5.9 58.5-12.3 38.5-13.7 75.5-31 112-49.1 9.1-4.6 18.3-9.2 27.4-13.8 3.9-2 7.8-4.2 11.8-6.1 2.5-1.2 2.6-1.5 2.6-1.5s-2.8-5.1-3.8-6.8c-5.1-8.9-10.4-16.6-16.9-24.5-2.9-3.4-10.7-11.8-10.7-11.8s0.9-0.9 1.7-2c1.5-1.7 2.7-3.7 3.9-5.6 4.8-7.5 7.3-15.8 9.7-24.3 2.5-8.8 5.5-17.5 8.3-26.3 5.5-17.3 11.9-34.5 21.7-49.9 10.4-16.3 25-30.1 43.8-35.7 20.9-6.2 43-2 64.3-0.8-3.3-0.2-7.2-1.6-10.4-0.2-2.5 1.1-4.3 3.7-6.1 5.7-4.6 5.1-9.1 10.1-13.1 15.6-8.5 11.8-15.2 24.8-19.6 38.7-9 28.2-8.2 59.7 4.9 86.5 16.8-10.1 34.4-19 51.5-28.6 17.7-9.9 35.4-19.9 53-30.1 35.1-20.2 70.1-40.8 105.3-60.9 2.1-1.2 8.9-5.1 8.9-5.1s-3-7.2-4.2-9.2c-5.4-8.7-12-16.5-19.7-23.2 14.9-8.3 26-23.8 36.2-37 10.3-13.3 20-27.3 32.2-38.9s26.1-18.3 42.7-21.1c18-3 36.4-2.5 54.5-3.8 8-0.6 19-0.4 25.8-5.1 7-4.9 1.8-13.6-1.4-19.2 9.7 8.5 20.7 16 33.1 20 10.1 3.1 25.2 5.5 34.5-1.8z"
        fill={getIconColor(color, 4, '#F3B00C')}
      />
      <path
        d="M752.6 297.5c-1.7 12.9-4.5 32-17.5 38.7-6 3.1-13 2.8-19.5 1.5-7.5-1.5-13.8-6.4-20.4-10.2-28.2-16-58.1-29.3-88.8-39.9-31.3-10.8-63.6-17.2-96.7-18.8-33.6-1.7-67.1 1.2-100.3 6.2-37.3 5.6-74.6 11.7-111.9 17.1 1.3-1.9-1.5-1-2.6-1.1-1.6-0.1-3.1-0.3-4.7-0.6-3-0.6-5.9-1.4-8.8-2.3-5.8-1.9-11.3-4.7-16.3-8.2-8.9-6.3-16.2-14.9-21.3-24.6-11.6-22.1-7.1-45.7 7.7-65 14.9-19.3 36.1-33.3 57.7-44.1 22.6-11.4 46.8-19.6 71.4-25.6 51.5-12.6 105.5-14.9 158.2-10.4 25.9 2.2 51.7 6.4 77.1 12 12.9 2.9 25.7 6.1 38.4 9.9 5 1.5 11.7 2.4 16 5.6 4.8 3.6 9.3 7.9 13.7 11.9 40 36.7 76.3 91.1 68.6 147.9z"
        fill={getIconColor(color, 5, '#F5B764')}
      />
      <path
        d="M710.2 336.3c-9.4-2.6-18.4-6.3-27.5-9.7-11.1-4.2-22.3-8.1-33.8-11.1-13.3-3.4-26.9-5.5-40.6-5.8h-5.4c-0.8 0-1.6 0.2-2.2-0.3-0.7-0.6-1.4-1.1-2.1-1.7-2.7-2.1-5.4-4.1-8.3-6-5.9-3.9-12.1-7.3-18.6-10.2-11.5-5.1-23.7-8.5-36.2-10-11.4-1.4-23-1.2-34.4 0.7-10.9 1.8-21.5 5.2-31.3 10.1-9.6 4.8-18.5 11.1-26.1 18.7s-13.8 16.5-18.3 26.3c-6 13-8.8 27.5-8.3 41.8 0.1 3.7 0.5 7.4 1.1 11-7-1.3-14.1-1.9-21.2-1.8-9.7 0.2-19.4 1.8-28.8 4.2-6.2 1.5-12.2 3.4-18.2 5.6-3.3 1.2-6.5 2.3-9.7 3.8-0.7 0.3-1.3 0.6-2 1-0.3 0.2-0.7 0.4-1 0.5-0.5 0.2-0.6 0.4-0.9 0.1-0.6-0.5-1.1-1.2-1.6-1.8-0.5-0.6-1.1-1.2-1.6-1.7-8.9-9.1-19.7-16.4-31.5-21.2-12-4.9-25-7.3-37.9-7-1.6 0-3.2 0.1-4.8 0.2 7.6-16.6 15.6-33.2 23.6-49.7 3.7-7.7 7.5-15.4 11.3-23.1 0.9-1.8 1.7-3.5 2.6-5.3 0.3-0.5 0.6-1.7 1.1-2.1 0.2-0.2 1.2-0.2 1.6-0.2 0.7-0.1 1.3-0.2 2-0.3l14.4-2.1c15.7-2.3 31.4-4.4 47.1-6.8 11.3-1.8 22.6-3.8 34-5.7 14-2.3 28-4.3 42-5.8 16.1-1.7 32.2-2.7 48.4-2.9 17.7-0.1 35.3 0.9 52.8 3.2 18.8 2.5 37.3 6.6 55.3 12.4s35.7 12.5 53 20.1c17.2 7.6 34.1 16.1 50.4 25.5 4 2.5 7.8 4.7 11.6 7.1z"
        fill={getIconColor(color, 6, '#FFE39C')}
      />
      <path
        d="M343 746.9c-32.7 17-65.7 33.5-99.4 48.6-16.6 7.4-33.3 14.5-50.4 20.8-16.5 6.1-33.9 12.2-51.5 13.7-6.7 0.6-14.9 1.1-20.6-3.1-5.9-4.3-7.2-13.9-8.1-20.6-2.3-17.9 0.2-36.3 3.4-54 0.5-2.9 2.6-12.3 2.6-12.3s10.8-1.8 13.6-2.4c8.4-1.7 16.3-0.8 24.8 0.8 8.5 1.5 16 5.3 24.3 7.3 8.5 2 16.9 2.6 25.6 2.3 18.1-0.8 38.2-5.4 56.6-13 17.3-7.2 35-16.8 47.7-30.9 12.7 12.3 23.3 27 31.4 42.8z"
        fill={getIconColor(color, 7, '#D10305')}
      />
      <path
        d="M311.5 703.9c-17.5 19.1-43.7 31-68.3 38-13.6 3.8-27.6 6.1-41.7 6-6.7-0.1-13.4-0.8-19.9-2.3s-12.7-4.1-19.2-5.8c-14.6-3.9-30.2-3.9-44.2 2.2 3.7-17.8 8.3-35.4 13.5-52.9 1.2-4 2.4-8 3.6-11.9 0.9-3 0.7-5 3.6-6.2 7.8-3.3 16.4-5.5 24.7-7.3 34.6-7.5 71-4.6 103.3 10.1 16.6 7.4 31.4 17.8 44.6 30.1z"
        fill={getIconColor(color, 8, '#ED4233')}
      />
      <path
        d="M336.9 403.8c-31.9 17.5-14.4 57.4-20.7 85.8-6.1 28-37.1 54.1-66.7 47.6-28.5-6.3-41-37.2-34.9-63.7 1.8-7.8 5.2-15 8.5-22.3 3.4-7.5 6.7-15.1 10.1-22.6 6.9-15.3 13.9-30.7 21-45.9 0.9-2 1.9-4.1 2.8-6.1 0.5-1 1.3-4.1 2.2-4.8 1.8-1.3 8.3-0.2 10.5-0.2 9 0.3 18 2 26.5 4.9 15.9 5.4 29.6 14.8 40.7 27.3z"
        fill={getIconColor(color, 9, '#F9724C')}
      />
      <path
        d="M345.1 538.1c-32.3 56-99 78-148.9 49.2-8.5-4.9-16.1-11.1-22.4-18.1 0.9-2.3 42.5-102.6 44.9-107.9-0.1 0.2-0.1 0.3-0.2 0.5-8 19.3-5.8 37.1 1 50.6 11.5 23.1 38.1 34 63.5 19.2 68.5-39.9 6.3-101.2 53.9-127.8 29.9 34.1 34.7 88.4 8.2 134.3z"
        fill={getIconColor(color, 10, '#ED4233')}
      />
      <path
        d="M639.6 580.4c-15.1 8.7-30.1 17.5-45.2 26.2L548.8 633c-14.8 8.5-29.7 17.1-44.5 25.5-15.7 8.9-31.4 17.8-47.1 26.5-10.4 5.8-20.9 11.6-31.4 17.4l-5.4 3c-4.3-8.9-7.3-18.4-9.1-28.1-1.8-9.9-2.2-19.9-1.4-29.9 0.8-10.3 2.9-20.4 6.2-30.2 3.4-10.2 8-19.9 13.7-29 6-9.6 13.1-18.4 21.2-26.3 0.6-0.6 1.2-1.1 1.8-1.7 0.5-0.5 1.3-1.5 2-1.6s1.7 0.1 2.4 0.1c0.9 0.1 1.8 0.1 2.8 0.2 3.5 0.2 7 0.4 10.5 0.7l21 1.2c13.6 0.7 27.2 1.3 40.7 1.4 13.5 0.1 27.1-0.2 40.5-1.8 12.7-1.4 25.6-4 37.3-9.4 1.3-0.6 2.7-1.3 3.9-2 0.3-0.1 0.7-0.5 1-0.6 0.3 0 0.6 0.3 0.8 0.5 0.6 0.6 1.3 1.1 1.9 1.7 2.4 2.2 4.6 4.5 6.8 6.9 4.1 4.6 7.8 9.6 11 15 1.5 2.7 2.9 5.3 4.2 7.9z"
        fill={getIconColor(color, 11, '#D10305')}
      />
      <path
        d="M615 548.4c-21.6 10.8-45.2 13.3-69.2 13.9-30.4 0.8-61-1.8-91.3-3.6 34-31.2 84.1-45.6 128.4-29.3 11.7 4.4 22.7 10.8 32.1 19z"
        fill={getIconColor(color, 12, '#ED4233')}
      />
      <path
        d="M601.2 309.7h-1.5c-90.3 3.4-66.6 31.7-129.2 76.6-10 7.1-17.7 9.1-25.5 8.8h-1.1c-0.4 0-0.8-0.1-1.2-0.1-0.7-0.1-1.3-0.1-1.9-0.2l-1.8-0.3h-0.2c-0.3 0-0.6-0.1-0.9-0.2-0.8-0.1-1.7-0.3-2.5-0.5-0.3-0.1-0.7-0.1-1.1-0.2-0.9-0.2-1.8-0.4-2.8-0.6-1.2-0.3-2.3-0.5-3.5-0.8s-2.4-0.6-3.7-0.8c-1.9-0.4-3.9-0.8-5.9-1.2-2.4-15.3-1.1-31.1 4.5-46.2 19.3-52.3 82.5-77.2 141.2-55.5 14 5 26.5 12.4 37.1 21.2z"
        fill={getIconColor(color, 13, '#F9724C')}
      />
      <path
        d="M635.5 422.3c-19.3 52.3-82.5 77.2-141.2 55.5-41.7-15.4-69.9-50.1-75.9-87.7 20.3 3.7 31.6 10.9 52-3.8 62.6-44.8 38.8-73.2 129.2-76.6h1.5c34.1 28.4 49.1 72.7 34.4 112.6z"
        fill={getIconColor(color, 14, '#ED4233')}
      />
      <path
        d="M894.1 349c-1.1-16-10.1-30.8-18-43.9l-1.5-2.6c-9.5-15.7-20.9-31.1-33.9-45.9-25.5-28.9-57.1-54.8-93.7-77-80.5-48.8-179-77-277.4-79.2-50.8-1.1-98.3 4.9-141 17.8-54.7 16.6-91.7 39-112.9 68.7-15.9 22.2-18.6 47.7-7.5 70.1 8.6 17.3 22.3 30.5 38.5 37.2 9.9 4.1 18.4 5.9 25.2 5.3 4-0.4 7.6-2.7 9.3-6.2 1.7-3.4 1.5-7.2-0.5-10.5-2.9-4.7-7.5-5.1-9.8-5.3-3.1-0.3-6.4-0.6-9.6-1.4-13.3-3.6-24.7-12.9-32.1-26.3-5.5-9.8-7.3-19.5-5.4-28.8 1.9-9.2 7-18.5 15.1-27.8 12.5-14.1 29.9-26.3 53.2-37.3 17.9-8.5 37.9-15.5 59.6-21 88.4-22.1 191.4-15.1 290 19.8 46.5 16.5 88.1 37.9 123.7 63.7 40.3 29.1 71.7 63.1 93.4 101l0.7 1.2c7.6 13.1 14.7 25.5 12.1 39.5-3 16.1-14.4 30.2-24 40.7-14 15.3-31.1 29.7-55.3 46.8-19 13.4-31.4 34.1-42.4 54.2-3 5.4-5.9 11-8.7 16.4-2.8 5.4-5.7 10.9-8.6 16.2l-1.1 2c-4.8 8.7-9.8 17.6-16.6 24.3-3 2.9-9.1 7.2-16.4 3.8-3.1-1.5-5.5-4.6-8.1-7.9-1.7-2.2-3.5-4.5-5.7-6.5-7.7-7.1-18.7-10.9-28.7-10-4.3 0.4-8.1 3.3-9.7 7.2-1.5 3.7-0.8 7.8 1.8 10.9l0.1 0.1c3.4 3.8 8.3 4.1 11.9 4.2 1.3 0.1 2.7 0.1 3.6 0.4 4.6 1.3 7.5 4.8 10.9 9 1 1.2 1.9 2.3 3 3.5 7.1 8 16.5 12.2 27.3 12.2 22.5 0 35.5-23.1 42.4-35.4 4.8-8.2 9.2-16.7 13.4-24.9 6.5-12.6 13.3-25.5 21.3-37.4 4.9-7.3 11.6-16.6 20.2-23 3.7-2.8 7.6-5.7 11.3-8.4 5.6-4.1 11.4-8.3 17-12.8 22.4-18 37.4-33.5 48.4-50.1 11.2-16.4 16.2-32.1 15.2-46.6zM564.9 664.4c-3.8-0.2-7.9 2-10.8 5.8-6.5 8.6-12.6 16.1-20.7 19.6-6.2 2.7-12.7 1.3-19.9-4.4-5.1-4.1-9.4-9-13.9-14.2-2.9-3.4-6-6.8-9.2-10-4.4-4.5-11.3-9.7-19.4-9.7-5 0-9.8 2.2-13.7 6.4-6.7 7-10.3 16.6-13.5 25.1-0.6 1.7-1.3 3.4-1.9 5.1-0.5 1.2-1 2.5-1.5 3.9-2.2 5.7-4.6 12-7.9 16.7-4.1-7.6-9.8-15.5-20.1-16.7-12.7-1.4-22 8.8-27.8 16.7-7.2 9.6-13.1 20.4-18.7 30.9L364 743c-3.7 6.8-7.3 13.7-10.8 20.4l-4.2 8.1-0.5 0.9c-7.9 15-16.8 31.9-33.8 32.5-8.2 0.3-17.7-2.1-27.4-7-4.8-2.4-9.1-5.1-12.8-8-0.3-0.2-0.5-0.4-0.8-0.7-2.9-2.3-7-5.6-11.9-4.9-1.9 0.3-4.6 1.2-6.9 4.4-6.5 8.8 2.7 15.9 6.1 18.6l0.4 0.3c4.9 3.8 10.3 7.1 15.9 10 12.5 6.2 24.6 9.3 36.1 9.3 27 0 41.6-20.8 53.3-43.1 2.8-5.2 5.6-10.5 8.3-15.6 2.7-5.1 5.4-10.3 8.2-15.4 1.1-2 2.2-4.1 3.4-6.2 4.9-9.1 10-18.4 16.3-26.3l0.5-0.6c1.1-1.5 4.6-5.9 6.3-6 1.8 0.6 4.7 7.4 5.7 9.6 0.8 1.8 1.5 3.4 2.2 4.7 3.2 5.4 7.4 7 10.3 7.3 7.9 0.9 15.1-5.8 17.9-8.7 7.3-7.9 11.5-18.2 15.2-27.3l0.8-2c0.4-1.1 0.9-2.2 1.3-3.3 1.7-4.2 3.2-8.2 5-12.1 0.3-0.6 0.5-1.2 0.8-1.9 0.8-1.9 1.9-4.4 3.1-6 1 0.8 2.3 2.2 2.9 2.9 0.4 0.5 0.8 0.9 1.1 1.2 2.3 2.4 4.5 5 6.7 7.4 1.1 1.3 2.3 2.6 3.4 3.9 12.6 13.9 32.2 31.1 56.1 20.7 11.7-5.1 20.4-14.8 25.9-21.7 0.3-0.4 0.7-0.9 1.1-1.3 3.1-3.7 8.9-10.6 4.1-17.9-2.2-3-5.1-4.7-8.4-4.8zM231 371.5c-5-1.9-10.5-0.2-13.5 4.3-1.9 2.9-3.2 6-4.4 9.1-0.6 1.4-1.1 2.7-1.7 4-0.9 2-1.8 3.9-2.7 5.9-0.9 2-1.8 3.9-2.7 5.9-3.4 7.5-7 15.2-10.4 22.9-5.9 13.1-12.3 27.5-19.3 43.9-22.8 52.9-40.5 97.3-55.6 139.7-12.8 36-21.6 64.1-28.4 90.9-6.9 27.1-11.2 54.7-12.9 84.3-1.7 28.1-1.1 50.6 1.7 70.7 1.9 13 4.3 26.7 11.5 37.1 6.8 10 18 15.8 30.7 15.8 10.7 0 22.2-3.6 34.2-10.7 12.1-7.1 23.1-16.7 32.5-28.5 0.4-0.5 0.9-1.1 1.5-1.8 4.1-4.8 11-12.9 7.1-20.7-2.6-5-8.8-7.2-14-5-3.6 1.5-5.6 4.7-7 7-0.4 0.7-0.8 1.3-1.2 1.8l-0.1 0.1c-7.8 11-17.7 20.3-28.5 27.1-10.5 6.5-19.6 9.4-27.1 8.6-7.8-0.9-12.2-6.6-15.6-20.3-2.3-9.6-3.8-20.5-4.5-34.3-0.9-17.9-0.5-36.9 1.4-58.1 1.1-13.3 2.8-29.1 6.2-44.8 2.3-10.5 4.8-21.3 7.6-31.8 7.5-27.9 17.3-58.1 30.9-95.1 16.3-44.4 35.9-92.3 59.7-146.3 6.6-14.7 13.4-30 20.1-44.9 2-4.2 4-8.5 5.8-12.6 0.4-0.9 0.9-1.8 1.5-2.8 1.6-2.9 3.4-6.3 3.9-9.8 0.8-5-1.9-9.8-6.7-11.6z"
        fill={getIconColor(color, 15, '#934A19')}
      />
    </svg>
  );
};

IconfoodPizza.defaultProps = {
  size: 18,
};

export default IconfoodPizza;
