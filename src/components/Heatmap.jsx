/* global Image */

import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    background: '#222',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

class Heatmap extends React.Component {
  constructor(props) {
    super(props);

    this.drawHeatmap = this.drawHeatmap.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.drawOverlay = this.drawOverlay.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');

    if (this.props.url) {
      this.background = new Image();
      this.background.src = this.props.url;

      this.background.onload = this.drawHeatmap;
    } else {
      this.drawHeatmap();
    }
  }

  drawHeatmap() {
    if (this.background) {
      this.drawBackground();
    }

    if (this.props.overlay) {
      this.drawOverlay();
    }

    this.drawPoints();
  }

  drawBackground() {
    if (this.background.width / this.props.width === this.background.height / this.props.height) {
      const ratio = this.background.width / this.props.width;

      this.canvas.width *= ratio;
      this.canvas.height *= ratio;

      this.context.scale(ratio, ratio);
    }

    this.context.drawImage(this.background, 0, 0, this.props.width, this.props.height);
  }

  drawOverlay() {
    this.context.fillStyle = 'rgba(0, 0, 0, .6)';
    this.context.fillRect(0, 0, this.props.width, this.props.height);
  }

  drawPoints() {
    this.props.points.map(point => {
      this.context.beginPath();
      this.context.arc(point.touchX * point.deviceWidth, point.touchY * point.deviceHeight, 5, 0, 2 * Math.PI);
      this.context.fillStyle = `rgba(230, 60, 37, ${this.props.pointStyle.opacity})`;
      this.context.fill();
      this.context.strokeStyle = 'transparent';
      this.context.stroke();
    });
  }

  render() {
    return (
      <canvas
        ref={element => this.canvas = element}
        width={this.props.width}
        height={this.props.height}
        style={Object.assign(styles.container, {
          width: this.props.width,
          height: this.props.height,
        })}
      />
    );
  }
}

Heatmap.propTypes = {
  url: PropTypes.string,
  overlay: PropTypes.bool,
  pointStyle: PropTypes.shape({
    opacity: PropTypes.number,
  }),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    touchX: PropTypes.string.isRequired,
    touchY: PropTypes.string.isRequired,
  })).isRequired,
};

Heatmap.defaultProps = {
  url: null,
  overlay: false,
  pointStyle: {
    opacity: 0.03,
  },
};

export default Heatmap;
