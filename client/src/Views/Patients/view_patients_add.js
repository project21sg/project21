import React, { Component } from 'react';
import{
    Row,
    Col,
    Button,
    Form,
    Input
} from 'antd';

import MainPatientPanel from '../../Components/Panels/main_panel';

class AddPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTabId: "ng"
        }

    }

    render() {
        var s = this.state;
        var formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            }
        }
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                <Row>
                    <Col span={10} style={{padding: "10px"}}>
                        <span style={{fontWeight: 'bold', fontSize: 18}}>Patient Particulars</span>
                        <Form>
                            <Form.Item 
                            {...formItemLayout}
                            label="Name">
                                <Input />
                            </Form.Item>
                            <Form.Item
                            {...formItemLayout}
                            label="NRIC">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Gender">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Date of Birth">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Contact">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Address">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Zip Code">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Occupation">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Marital Status">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Known Health Issues">
                                <Input />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={10} style={{padding: "10px"}}>
                        <span style={{fontWeight: 'bold', fontSize: 18}}>Next of Kin</span>
                        <Form>
                            <Form.Item 
                            {...formItemLayout}
                            label="Name">
                                <Input />
                            </Form.Item>
                            <Form.Item
                            {...formItemLayout}
                            label="Relation to Patient">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Address">
                                <Input />
                            </Form.Item>
                            <Form.Item 
                            {...formItemLayout}
                            label="Contact">
                                <Input />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col 
                    span={20}
                    style={{textAlign: 'right'}}>
                        <Button type="primary">Submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddPatientsView;