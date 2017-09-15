/* eslint-disable */

import React from 'react';

class AreaSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let isCancelled = false;

    let xFrom = 0;
    let xTo = 0;
    let yFrom = 0
    let yTo = 0;

    const calcArea = () => {
      const xMin = Math.min(xFrom, xTo);
      const xMax = Math.max(xFrom, xTo);
      const yMin = Math.min(yFrom, yTo);
      const yMax = Math.max(yFrom, yTo);

      this.element.style.left = `${xMin}px`;
      this.element.style.top = `${yMin}px`;
      this.element.style.width = `${xMax - xMin}px`;
      this.element.style.height = `${yMax - yMin}px`;
    };

    this.target.onmousedown = e => {
      isCancelled = false;

      xFrom = e.clientX;
      yFrom = e.clientY;
      calcArea();

      setTimeout(() => this.element.style.opacity = '1', 100);
    };

    this.target.onmousemove = e => {
      if (!isCancelled) {
        xTo = e.clientX;
        yTo = e.clientY;
        calcArea();
      }
    };

    this.target.onmouseup = e => {
      isCancelled = true;

      this.element.style.opacity = '0';

      const xMin = Math.min(xFrom, xTo);
      const xMax = Math.max(xFrom, xTo);
      const yMin = Math.min(yFrom, yTo);
      const yMax = Math.max(yFrom, yTo);

      this.props.onSelect({
        x: xMin / this.props.width,
        y: yMin / this.props.height,
      },
      {
        x: xMax / this.props.width, 
        y: yMax / this.props.height,
      });
    };
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          width: `${this.props.width}px`,
          height: `${this.props.height}px`,
        }}
        ref={element => this.target = element}
      >
        <div
          style={{
            background: 'rgba(0, 162, 255, 0.4)',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '1',
            opacity: '0',
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
          }}
          ref={element => this.element = element}
        />
        {this.props.children}
      </div>
    );
  }
}

export default AreaSelect;
