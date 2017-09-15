/* global FileReader */

import React from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile([file]) {
    const reader = new FileReader();

    reader.onload = () => this.props.onUploadFile(reader.result);
    reader.readAsText(file);
  }

  render() {
    return (
      <div>
        <ReactFileReader
          handleFiles={this.handleUploadFile}
          fileTypes={'.csv'}
        >
          <span
            className="jampp__Heatmap__Form__Button bttn-pill bttn-md"
          >
            Upload CSV
          </span>
        </ReactFileReader>
        <a
          className="jampp__Heatmap__Form__Button bttn-pill bttn-md"
          href="https://bdq.jampp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Generate CSV
        </a>
      </div>
    );
  }
}

Form.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
};

export default Form;
