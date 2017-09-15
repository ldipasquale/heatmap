import React from 'react';
import PropTypes from 'prop-types';

import Heatmap from 'components/Heatmap';

const getDimensions = (dataSource) => {
  for (let i = dataSource.length - 1; i >= 0; i -= 1) {
    const row = dataSource[i];

    if (row.width !== undefined) {
      return {
        width: parseInt(row.width, 10),
        height: parseInt(row.height, 10),
      };
    }
  }

  return {
    width: 0,
    height: 0,
  };
};

const SingleHeatmap = ({ dataSource, heatmapProps }) => (
  <div>
    <Heatmap
      id={dataSource[0].id}
      points={dataSource}
      {...getDimensions(dataSource)}
      {...heatmapProps}
    />
  </div>
);

SingleHeatmap.propTypes = {
  heatmapProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataSource: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SingleHeatmap;

