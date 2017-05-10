/* global Image */

import React from 'react';
import PropTypes from 'prop-types';
import Color from 'Color';

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

    if (this.props.style.overlay) {
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
    this.context.fillStyle = `rgba(0, 0, 0, ${this.props.style.overlay})`;
    this.context.fillRect(0, 0, this.props.width, this.props.height);
  }

  drawPoints() {
    const color = Color(this.props.pointStyle.color).alpha(this.props.pointStyle.opacity);

    this.props.points.map(point => {
      this.context.beginPath();
      this.context.arc(point.touchX * point.deviceWidth, point.touchY * point.deviceHeight, 5, 0, 2 * Math.PI);
      this.context.fillStyle = `rgba(${color.values.rgb[0]}, ${color.values.rgb[1]}, ${color.values.rgb[2]}, ${color.values.alpha})`;
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
  style: PropTypes.shape({
    overlay: PropTypes.number,
  }),
  pointStyle: PropTypes.shape({
    color: PropTypes.string,
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
  style: {
    overlay: 0,
  },
  pointStyle: {
    color: '#eb2c12',
    opacity: 0.03,
  },
};

export default Heatmap;
