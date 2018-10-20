import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Elevation
} from '@blueprintjs/core';

class UploadView extends Component {
    constructor(props) {
        super();
        this.processFileData = this.processFileData.bind(this);
    }

	/**
	 * Parses the uploaded xlsx file and converts it into an array, updates state accordingly.
	 * @param {json} event 
	 */
	processFileData(event) {
		var fileReader = new FileReader();
		fileReader.onload = (e) => {
			var data = e.target.result;
			// pre-process data
			var bytes = new Uint8Array(data);
			var binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
			var oFile = XLSX.read(binary, {type: "binary", cellDates:true, cellStyles:true});
			// check for validation of emails
			this.setState({
				parsedWorkbook: oFile
			});
		};
		this.setState({
			uploadedFiles: event.target.files
		});
		fileReader.readAsArrayBuffer(event.target.files[0]);
	}

    render() {
        var s = this.state;
        return(
            <div>
                <Card interactive elevation={Elevation.TWO}> 
                    Upload File
                    <FileInput text="Select File" onInputChange={processFileData}/>
                </Card>
            </div>
        );
    }
}

export default UploadView;