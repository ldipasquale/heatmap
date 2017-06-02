import React from 'react';

const styles = {
  container: {
    background: '#222',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  ad: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundSize: 'cover',
  },
  point: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    marginLeft: '-5px',
    marginTop: '-5px',
    borderRadius: '100%',
    background: 'rgba(230, 60, 37, .008)',
  },
};

const renderPoint = (point) => {
  if (point.touchY && point.touchX) {
    const pointStyle = Object.assign({}, styles.point);
    pointStyle.top = `${point.touchY * 100}%`;
    pointStyle.left = `${point.touchX * 100}%`;

    return (
      <div style={pointStyle} />
    );
  }

  return false;
};

const Heatmap = ({ width, height, points }) => (
  <div style={Object.assign(styles.container, { width, height })}>
    <div style={Object.assign(styles.ad, { backgroundImage: `url(/assets/images/ads/${width}x${height}.png)` })} />

    {points.map(point => renderPoint(point))}
  </div>
);

Heatmap.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  points: React.PropTypes.arrayOf(React.PropTypes.shape({
    touchX: React.PropTypes.string.isRequired,
    touchY: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Heatmap;
