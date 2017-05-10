/* eslint-disable */

import React from 'react';

import Heatmap from 'components/Heatmap';

import csv32050 from 'data/320x50.csv';
import csv320480 from 'data/320x480.csv';
import csv300250 from 'data/300x250.csv';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Heatmap
          url='http://localhost:8080/assets/images/ads/300x250.jpg'
          width={300}
          height={250}
          points={csv300250}
          style={{
            overlay: 0.8,
          }}
          pointStyle={{
            color: '#eb2c12',
            opacity: 0.06,
          }}
        />
      </div>
    );
  }
}
