import React, { Component } from 'react';

import XLSX from 'xlsx';

class UploadView extends Component {
    constructor(props) {
        super();
        this.state = {
            uploadedFileName: "Select file..."
        }
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
			this.setState({
                parsedWorkbook: oFile,
			});
		};
		this.setState({
            uploadedFiles: event.target.files,
            uploadedFileName: event.target.files[0].name //big assumption that at least 1 file is uploaded
		});
		fileReader.readAsArrayBuffer(event.target.files[0]); //actual trigger
	}

    render() {
        var s = this.state;
        return(
            <div>
                34
                {/* <Card interactive elevation={Elevation.TWO}> 
                    <Label>Upload File</Label>
                    <FileInput text={s.uploadedFileName} onInputChange={this.processFileData}/>
                </Card> */}
            </div>
        );
    }
}

export default UploadView;