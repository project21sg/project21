import React, { Component } from 'react';
import{
    Row,
    Col,
    Button,
    Form,
    Input,
    Radio,
    Select,
    DatePicker,
    message
} from 'antd';

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
                this._uploadData(values);
                message.success('Patient successfully added!');
                this.props.history.push('/patients');
            }
        });
    }
    
    _uploadData(values) {
        var data = {
            patient: {
                name: values.name,
                nric: values.nric,
                gender: values.gender, 
                dateOfBirth: values['date of birth'],
                contact: values.contact,
                address: values.address, 
                zipCode: values['zip code'],
                occupation: values.occupation,
                maritalStatus: values['marital status'],
                knownHealthIssues: values['known health issues'],
                nokName: values['next of kin name'],
                nokRelation: values['relation to patient'],
                nokAddress: values['next of kin address'],
                nokContact: values['next of kin contact']
            } 
        };

        fetch('http://localhost:9000/api/patient/', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(json) {
            console.log(json);
        })
    }

    _buildFormItemView(field)  {
        switch(field.inputType) {
            case "radio":
                return (
                    <Radio.Group>
                    {field.options.map((o) => 
                        <Radio 
                        key={o.toLowerCase()}
                        value={o.toLowerCase()}>
                            {o}
                        </Radio>
                    )}
                    </Radio.Group>
                )
            case "datepicker":
                return(
                    <DatePicker 
                    key={field.label}
                    format="DD-MM-YYYY"/>
                )
            case "dropdown":
                return(
                    <Select
                    key={field.label}>
                    {field.options.map((o) => 
                        <Select.Option 
                        key={o.toLowerCase()}
                        value={o.toLowerCase()}>
                            {o}
                        </Select.Option>
                    )}
                    </Select>
                )
            default:
                return(
                    <Input key={field.label} />
                )
        }
    }

    _buildForm(fields, layout) {
        return <Form onSubmit={this.handleSubmit}>
        {fields.map((f) => 
            <Form.Item
            {...layout}
            key={f.label}
            label={f.label}>
                {
                    this.props.form.getFieldDecorator(f.label.toLowerCase(), f.validationConfig) ( this._buildFormItemView(f) )
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
                <Col span={10} style={{padding: "10px"}} key={f.header}>
                    <span style={{fontWeight: 'bold', fontSize: 18}}>{f.header}</span>
                    {this._buildForm(f.fields, formItemLayout)}
                </Col>
            )}
        </Row>
        <Row>
            <Col 
            span={20}
            style={{textAlign: 'right'}}>
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            </Col>
        </Row>
        </div> 
    }
}

const BuiltPatientForm = Form.create()(PatientForm);

export default BuiltPatientForm;