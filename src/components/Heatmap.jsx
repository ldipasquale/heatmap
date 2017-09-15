/* eslint-disable */
/* global Image */

import React from 'react';
import PropTypes from 'prop-types';
import Color from 'Color';

import AreaSelect from './AreaSelect';

const styles = {
  container: {
    background: '#222',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

const getTotalFromPoints = (points, key) => {
  return points.reduce((accumulator, point) => {
    if (point[key]) {
      return accumulator + parseInt(point[key]);
    }

    return accumulator;
  }, 0);  
}

class Heatmap extends React.Component {
  constructor(props) {
    super(props);

    this.totalClicks = getTotalFromPoints(props.points, 'clicks');
    this.totalInstalls = getTotalFromPoints(props.points, 'installs');

    this.calculateMetricsOnArea = this.calculateMetricsOnArea.bind(this);

    this.drawHeatmap = this.drawHeatmap.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.drawOverlay = this.drawOverlay.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');

    if (this.props.id || this.props.url) {
      const getImageUrl = id => `https://safiro.jampp.com/creative/preview/${id}.img`;

      this.background = new Image();
      this.background.src = this.props.id ? getImageUrl(this.props.id) : this.props.url;

      this.background.onload = this.drawHeatmap;
    } else {
      this.drawHeatmap();
    }
  }

  calculateMetricsOnArea(from, to) {
    const points = this.props.points.filter(point => {
      return (
        parseFloat(point.touchX) >= from.x &&
        parseFloat(point.touchY) >= from.y &&
        parseFloat(point.touchX) <= to.x &&
        parseFloat(point.touchY) <= to.y
      );
    });

    const clicks = getTotalFromPoints(points, 'clicks');
    const installs = getTotalFromPoints(points, 'installs');

    let clicksPercentage = 0;
    if (this.totalClicks > 0 & clicks > 0) {
      clicksPercentage = (clicks / this.totalClicks).toFixed(2);
    }

    console.log(`Clicks: ${clicks} (${clicksPercentage}%)`);

    if (installs > 0) {
      console.log(`Installs: ${installs} (${installsPercentage}%)`);
      console.log('CVR: ' + installs / clicks * 100 + '%');

      let installsPercentage = 0;
      if (this.totalInstalls > 0) {
        installsPercentage = (installs / this.totalInstalls).toFixed(2);
      }
    }

    console.log('-----------------');
  }

  drawHeatmap() {
    if (this.background) {
      this.drawBackground();
    }

    if (this.props.style.overlay) {
      this.drawOverlay();
    }

    if (this.props.points) {
      // draw clicks
      this.drawPoints(this.props.points, 'clicks', this.props.clickStyle);

      // draw installs
      this.drawPoints(this.props.points, 'installs', this.props.installStyle);
    }
  }

  drawBackground() {
    const ratio = 2;

    this.canvas.width *= ratio;
    this.canvas.height *= ratio;

    this.context.scale(ratio, ratio);

    this.context.drawImage(this.background, 0, 0, this.props.width, this.props.height);
  }

  drawOverlay() {
    this.context.fillStyle = `rgba(0, 0, 0, ${this.props.style.overlay})`;
    this.context.fillRect(0, 0, this.props.width, this.props.height);
  }

  drawPoints(data, key, style) {
    const points = data.filter(point => parseFloat(point.touchX) > 0 && parseFloat(point.touchY) > 0 && parseInt(point[key]) > 0);

    if (points.length > 0) {
      const getPointOpacity = (amount, opacity) => {
        if (amount > avgAmount) {
          return Math.log10(totalAmount / amount) ** -1 * opacity;
        }

        return opacity / 2;
      };

      const getPointColor = amount => {
        // const saturationValue = (1 - Math.log10(avgAmount / amount) ** -1) / 10;

        const pointColor = color;

        return `rgba(${pointColor.values.rgb[0]}, ${pointColor.values.rgb[1]}, ${pointColor.values.rgb[2]}, ${getPointOpacity(amount, pointColor.values.alpha)})`;
      };

      const getPointRadius = amount => {
        const radius = Math.log10(radiusFactor * amount) * style.radius;

        if (amount < avgAmount || radius < 0) {
          return style.radius;
        }

        return radius;
      };

      const color = Color(style.color).alpha(style.opacity);

      const totalAmount = points.reduce((accumulator, point) => accumulator + parseInt(point[key]), 0);
      const minAmount = points[0][key];
      const maxAmount = points[points.length - 1][key];
      const midAmount = (maxAmount + minAmount) / 2;
      const avgAmount = (totalAmount / points.length).toFixed(2);

      const radiusFactor = totalAmount / midAmount;

      points
        .map(point => {
          this.context.beginPath();
          this.context.arc(point.touchX * this.props.width, point.touchY * this.props.height, getPointRadius(point[key]), 0, 2 * Math.PI);
          this.context.fillStyle = getPointColor(point[key]);
          this.context.fill();
          this.context.strokeStyle = 'transparent';
          this.context.stroke();
        });
    }
  }

  render() {
    return (
      <div
        style={Object.assign(styles.container, {
          width: this.props.width,
          height: this.props.height,
          margin: '1px',
        })}
      >
        <AreaSelect
          width={this.props.width}
          height={this.props.height}
          onSelect={this.calculateMetricsOnArea}
        >
          <canvas
            ref={element => this.canvas = element}
            width={this.props.width}
            height={this.props.height}
            style={Object.assign(styles.container, {
              width: this.props.width,
              height: this.props.height,
            })}
          />
        </AreaSelect>
      </div>
    );
  }
}

Heatmap.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  style: PropTypes.shape({
    overlay: PropTypes.number,
  }),
  clickStyle: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.number,
  }),
  installStyle: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.number,
  }),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    clicks: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    installs: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    touchX: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    touchY: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
};

Heatmap.defaultProps = {
  id: null,
  url: null,
  style: {
    overlay: 1,
  },
  clickStyle: {
    color: '#eb2c12',
    radius: 8,
    opacity: 0.015,
  },
  installStyle: {
    color: '#12c742',
    radius: 4,
    opacity: 0.5,
  },
};

export default Heatmap;
