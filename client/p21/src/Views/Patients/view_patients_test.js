import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Text
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
                <UploadView uploadDataHAX={this.props.uploadDataHAX}/>
            </Card>
        );
    }
}

export default PatientTestView;