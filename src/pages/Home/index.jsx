import React from 'react';
import Papa from 'papaparse';
import ReactLoading from 'react-loading';

import Form from './Form';
import Result from './Result';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      isMultiple: false,
      isLoading: false,
    };

    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(file) {
    const parsedFile = Papa.parse(file, {
      header: true,
    });

    if (parsedFile) {
      this.setState({
        isLoading: true,
        isMultiple: parsedFile.data[0].creative_id !== undefined,
        file: parsedFile.data,
      });

      setTimeout(() => this.setState({
        isLoading: false,
      }), 3000);
    }
  }

  render() {
    if (!this.state.file) {
      return (
        <div className="jampp__Heatmap__Form">
          <Form onUploadFile={this.handleUploadFile} />
        </div>
      );
    }

    return (
      <div>
        {this.state.isLoading && (
          <div className="jampp__Heatmap__Loading">
            <ReactLoading
              type="bubbles"
              color="#36355B"
              width={150}
              height={150}
            />
          </div>
        )}

        <div className="jampp__Heatmap__Result">
          <Result
            dataSource={this.state.file}
            isMultiple={this.state.isMultiple}
          />
        </div>
      </div>
    );
  }
}
