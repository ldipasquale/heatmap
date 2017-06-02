/* eslint-disable */

import React from 'react';
import ReactRegionSelect from 'react-region-select';

import Heatmap from 'components/Heatmap';

import csv from 'data/20170501_20170601_guido.csv';

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
    const adIdDimension = {
      3974313: { w: 320, h: 480 },
      3974316: { w: 320, h: 480 },
      3974451: { w: 320, h: 480 },
      3974454: { w: 320, h: 480 },
      3974452: { w: 300, h: 250 },
      3974453: { w: 320, h: 50 },
      3974456: { w: 320, h: 50 },
      3974457: { w: 320, h: 480 },
      3974459: { w: 320, h: 50 },
      3974460: { w: 320, h: 480 },
      3974462: { w: 320, h: 50 },
      3974463: { w: 320, h: 480 },
      3974465: { w: 320, h: 50 },
      3974466: { w: 320, h: 480 },
      3974468: { w: 320, h: 50 },
      3974557: { w: 320, h: 480 },
      3974563: { w: 320, h: 480 },
      3974573: { w: 320, h: 480 },
      3974582: { w: 320, h: 480 },
    };

    const getAdDimension = id => adIdDimension[id];

    let adDimension;

    return (
      <div>
        {this.ads.map(ad => {
          adDimension = getAdDimension(ad.id);
          console.log(ad.id);

          return (
            <div style={{display: 'inline-block'}}>
              <Heatmap
                key={ad.id}
                id={ad.id}
                points={ad.points}
                width={adDimension.w}
                height={adDimension.h}
              />
            </div>
           )
        })}
      </div>
    );
  }
}
