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

      this.element.style.opacity = '1';
      xFrom = e.clientX;
      yFrom = e.clientY;
      calcArea();
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

      this.props.onSelect({
        x: xFrom / this.props.width,
        y: yFrom / this.props.height,
      },
      {
        x: xTo / this.props.width, 
        y: yTo / this.props.height,
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
            border: '1px solid #fff',
            background: 'rgba(255, 255, 255, .3)',
            position: 'absolute',
            top: '0',
            borderRadius: '5px',
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
