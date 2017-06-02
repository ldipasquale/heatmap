/* eslint-disable */

import React from 'react';
import ReactRegionSelect from 'react-region-select';

import Heatmap from 'components/Heatmap';

import csv from 'data/2070529_20170531_variations.csv';

export default class MultipleHeatmaps extends React.Component {
  constructor(props) {
    super(props);

    this.ads = [];
  }

  componentWillMount() {
    const adIds = {};

    csv.map(point => {
      if (typeof adIds[point.creative_id] === 'undefined') {
        this.ads.push({
          id: point.creative_id,
          width: parseInt(point.width),
          height: parseInt(point.height),
          points: [],
        });

        adIds[point.creative_id] = this.ads.length - 1;
      }

      this.ads[adIds[point.creative_id]]['points'].push({
        touchX: point.touchx,
        touchY: point.touchy,
        clicks: point.clicks,
        installs: point.installs ? point.installs : 0,
      });
    });
  }

  render() {
    return (
      <div>
        {this.ads.map(ad => (
          <div style={{display: 'inline-block'}}>
            <Heatmap
              key={ad.id}
              id={ad.id}
              points={ad.points}
              width={ad.width}
              height={ad.height}
            />
          </div>
        ))}
      </div>
    );
  }
}
