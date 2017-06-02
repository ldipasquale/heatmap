/* eslint-disable */

import React from 'react';
import ReactRegionSelect from 'react-region-select';

import Heatmap from 'components/Heatmap';

import csv from 'data/sin_publishers.csv';

export default class SingleHeatmap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Heatmap
          id='3836949'
          width={320}
          height={480}
          points={csv}
          style={{
            overlay: 0.9,
          }}
          clickStyle={{
            color: '#eb2c12',
            radius: 4,
            opacity: 0.5,
          }}
          installStyle={{
            color: '#12c742',
            radius: 4,
            opacity: 0.3,
          }}
        />
      </div>
    );
  }
}
