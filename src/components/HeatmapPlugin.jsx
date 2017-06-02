/* eslint-disable */

import React from 'react';
import HeatmapJS from 'heatmap.js';

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
};

class Heatmap extends React.Component {
  componentDidMount() {
    const heatmapInstance = HeatmapJS.create({
      container: document.querySelector(`.heatmap${this.props.width}${this.props.height}`),
    });

    const data = this.props.points.filter(point => point.touchX > 0 && point.touchY > 0).map(point => ({
      x: point.touchX * this.props.width,
      y: point.touchY * this.props.height,
      value: 1,
    }));

    heatmapInstance.setData({
      max: 29,
      data,
    });
  }

  render() {
    const { width, height, points } = this.props;

    return (
      <div style={Object.assign(styles.container, { width, height })}>
        <div style={Object.assign(styles.ad, { backgroundImage: `url(/assets/images/ads/${width}x${height}.png)` })} />
        <div className={`heatmap${width}${height}`} style={styles.ad}></div>
      </div>
    );
  }
}

Heatmap.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  points: React.PropTypes.arrayOf(React.PropTypes.shape({
    touchX: React.PropTypes.string.isRequired,
    touchY: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Heatmap;
