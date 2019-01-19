import React, { Component } from 'react';
import{
    Row,
    Col,
    Button,
    Form,
    Input,
    Icon,
    Radio,
    Select,
    DatePicker,
    Upload,
    Spin,
    message
} from 'antd';

class DataForm extends Component {
    constructor(props) {
        super();
        this.state = {
            patientId: props.patientId,
            fields: props.fields,
            fileList: [],
            waiting: false,
        };

        this._processFileAndUpload = this._processFileAndUpload.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this._uploadData(values);
                message.success('Data successfully added!');
                //this.props.history.push('/patients');
            }
        });
    }

    _processFileAndUpload(gaitDataFile) {
        // Use reader.result
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = [];
                var buffer = [];
                reader.result.split(',')
                .forEach((x) => {
                    if(x.length > 0) 
                        buffer.push(x);
                    if(buffer.length >= 7) {
                        data.push(buffer);
                        buffer = [];
                    }
                });
                //console.log(data);
                resolve(data);
            };
            reader.onerror = reject;
            reader.readAsText(gaitDataFile);
        });
    }
    
    //TODO: refactor into data logic container component (parent)
    _uploadData(values) {
        //console.log(values);
        var dateUploaded = new Date();
        var data = {
            data: {
                name: values['dataset name'],
                dateUploaded: dateUploaded,
                tugDuration: values['timed up and go duration'],
                recentFalls: values['recent falls'],
                medications: values.medications,
                psychological: values.psychological,
                AMTS: values['cognitive status'],
                riskFactor: this.state.fields[2].fields.map(f => values[f.label.toLowerCase()])
                    .reduce((acc, v) => v !== undefined ? acc + v : acc, 0)
            }
        };
        //console.log(data);
        //need to unpack the file values from csv into arrays
        var gaitDataFile = values['gait data file'].file;
        //console.log(gaitDataFile);
        this.setState({ waiting: true });
        this._processFileAndUpload(gaitDataFile)
        .then((gaitData) => {
            fetch(`http://localhost:9000/api/patient/${this.state.patientId}/data`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data, gaitData: gaitData})
            }).then(function(json) {
                console.log(json);
                console.log('post fetch')
            })

            console.log('uploading...')
        })
        .finally(() => this.setState({ waiting: false }))
    }

    _buildFormItemView(field)  {
        switch(field.inputType) {
            case "radio":
                return (
                    <Radio.Group>
                    {field.options.map((o, i) => 
                        <Radio 
                        key={field.key+'_'+o.label}
                        value={o.value}>
                            {o.label}
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
                    {field.options.map((o, i) => 
                        <Select.Option 
                        key={o.label}
                        value={o.value}>
                            {o.label}
                        </Select.Option>
                    )}
                    </Select>
                )
            case "file":
                return(
                    <Upload 
                    name="gaitFile" 
                    listType="text" 
                    onRemove={(file) => {
                        this.setState((state) => {
                          const index = state.fileList.indexOf(file);
                          const newFileList = state.fileList.slice();
                          newFileList.splice(index, 1);
                          return {
                            fileList: newFileList,
                          };
                        });
                    }}
                    beforeUpload={(file) => {
                        this.setState(state => ({
                            fileList: [...state.fileList, file],
                        }));
                        return false;
                    }}>
                        <Button>
                            <Icon type="upload" /> Upload File
                        </Button>
                    </Upload>
                )
            default:
                return(
                    <Input key={field.label} extra={field.help}/>
                )
        }
    }

    _buildForm(fields, layout) {
        return <Form onSubmit={this.handleSubmit}>
        {fields.map((f) => 
            <Form.Item
            {...layout}
            key={f.label}
            label={f.label}
            extra={f.help}>
                {
                    this.props.form.getFieldDecorator(f.label.toLowerCase(), f.validationConfig) ( this._buildFormItemView(f) )
                }
            </Form.Item>
        )}
        </Form>;
    }
    
    render() {
        var normalItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            }
        }

        var wideItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        }

        return <div>
        {this.state.waiting ? <Spin /> : null}
        {this.state.fields.map((f) => 
            <Row>
                <Col span={16} style={{padding: "10px"}} key={f.header}>
                    <span style={{fontWeight: 'bold', fontSize: 18}}>{f.header}</span>
                    {this._buildForm(f.fields, f.size === 'wide' ? wideItemLayout : normalItemLayout)}
                </Col>
            </Row>
        )}
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

const BuiltDataForm = Form.create()(DataForm);

export default BuiltDataForm;