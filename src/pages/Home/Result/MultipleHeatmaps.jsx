import React from 'react';
import PropTypes from 'prop-types';

import Heatmap from 'components/Heatmap';

class MultipleHeatmaps extends React.Component {
  constructor(props) {
    super(props);

    this.ads = [];
  }

  componentWillMount() {
    const adIds = {};

    this.props.dataSource.forEach(point => {
      if (typeof adIds[point.creative_id] === 'undefined') {
        this.ads.push({
          id: point.creative_id,
          width: parseInt(point.width, 10),
          height: parseInt(point.height, 10),
          points: [],
        });

        adIds[point.creative_id] = this.ads.length - 1;
      } else if (isNaN(this.ads[adIds[point.creative_id]].width) && point.width !== null) {
        this.ads[adIds[point.creative_id]].width = parseInt(point.width, 10);
        this.ads[adIds[point.creative_id]].height = parseInt(point.height, 10);
      }

      this.ads[adIds[point.creative_id]].points.push({
        touchX: point.touchX,
        touchY: point.touchY,
        clicks: point.clicks,
        installs: point.installs ? point.installs : 0,
      });
    });
  }

  render() {
    return (
      <div>
        {this.ads.filter(ad => ad.id !== '').map(ad => (
          <div
            key={ad.id}
            style={{ display: 'inline-block' }}
          >
            <Heatmap
              id={ad.id}
              points={ad.points}
              width={ad.width || 0}
              height={ad.height || 0}
              {...this.props.heatmapProps}
            />
          </div>
        ))}
      </div>
    );
  }
}

MultipleHeatmaps.propTypes = {
  heatmapProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataSource: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MultipleHeatmaps;
