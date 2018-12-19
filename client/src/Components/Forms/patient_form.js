import React, { Component } from 'react';
import{
    Row,
    Col,
    Button,
    Form,
    Input,
    Radio,
    Select,
    DatePicker
} from 'antd';
import moment from 'moment';

class PatientForm extends Component {
    constructor(props) {
        super();
        this.state = {
            fields: props.fields,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    _buildForm(fields, layout) {
        return <Form onSubmit={this.handleSubmit}>
        {fields.map((f) => 
            <Form.Item
            {...layout}
            key={f.label}
            label={f.label}>
                {
                    this.props.form.getFieldDecorator(f.label.toLowerCase(),
                    {
                        rules: [{required: true, message: "Field cannot be left empty!"}],
                        initialValue: f.inputType === "datepicker" ? moment('01-01-1980', "DD-MM-YYYY") : f.options ? f.options[0] : null,
                    }) (   
                        f.inputType === "radio" 
                        ? <Radio.Group>
                            {f.options.map((o) => 
                                <Radio 
                                key={o.toLowerCase()}
                                value={o.toLowerCase()}>
                                    {o}
                                </Radio>
                            )}
                            </Radio.Group>
                        : f.inputType === "datepicker"
                        ? <DatePicker 
                        key={f.label}
                        format="DD-MM-YYYY"/>
                        : f.inputType === "dropdown"
                        ? <Select>
                            {f.options.map((o) => 
                                <Select.Option 
                                key={o.toLowerCase()}
                                value={o.toLowerCase()}>
                                    {o}
                                </Select.Option>
                            )}
                            </Select>
                        : <Input key={f.label} />
                    )
                }
            </Form.Item>
        )}
        </Form>;
    }
    
    render() {
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

        return <div>
        <Row>
            {this.state.fields.map((f) => 
                <Col span={10} style={{padding: "10px"}}>
                    <span style={{fontWeight: 'bold', fontSize: 18}}>{f.header}</span>
                    {this._buildForm(f.fields, formItemLayout)}
                </Col>
            )}
        </Row>
        <Row>
            <Col 
            span={20}
            style={{textAlign: 'right'}}>
                <Button type="primary" onClick={this._childFormSubmit}>Submit</Button>
            </Col>
        </Row>
        </div> 
    }
}

const BuiltPatientForm = Form.create()(PatientForm);

export default BuiltPatientForm;