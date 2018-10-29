import React, { Component } from 'react';
import {
    Button, 
    Card,
    Label
} from '@blueprintjs/core';

import UploadView from '../Upload/view_upload';

class PatientTestView extends Component {
    constructor(props) {
        super();
        this.state = {
        }
    }

    render() {
        var s = this.state;
        return(
            <Card>
                <Label><h4>Proceed by first uploading the recorded patient gait data, </h4></Label>
                <UploadView uploadDataHAX={this.props.uploadDataHAX}/>
                <div style={{marginTop: 20, justifyContent: "right"}}>
                    <Button text="Next" intent="success" onClick={() => {}}/>
                </div>
            </Card>
        );
    }
}

export default PatientTestView;