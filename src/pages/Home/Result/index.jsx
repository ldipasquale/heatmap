import React from 'react';
import PropTypes from 'prop-types';

import config from 'config';

import MultipleHeatmaps from './MultipleHeatmaps';
import SingleHeatmap from './SingleHeatmap';

const Result = ({ dataSource, isMultiple }) => {
  const Component = isMultiple ? MultipleHeatmaps : SingleHeatmap;

  return (
    <Component
      dataSource={dataSource}
      heatmapProps={config}
    />
  );
};

Result.propTypes = {
  isMultiple: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Result;
