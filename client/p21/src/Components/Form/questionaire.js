import React, { Component } from 'react';
import {
    Alignment,
    Button,
    Card,
    FormGroup,
    InputGroup,
    RadioGroup,
    Radio,
    Switch,
    TextArea,
    Toaster,
    Position
} from '@blueprintjs/core';
import {withRouter} from 'react-router';

class QuestionaireForm extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTabId: "ng",
            questionaire: props.questionaire,
            success : false
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.submitForm = props.submitForm;
    }

    handleTabChange(e) {
        this.setState((prevState) => {
            return {
                selectedTabId: e.selectedTabId
            };
        })
    }

    generateQuestionaireForm() {
        return this.state.questionaire.map((category) => {
            return <Card  style={{ width: "100%"}} >
                    <h5>{category.category}</h5>
                    {category.fields.map((question) => {
                        if(question.type == "text-area") {
                            return (
                                <FormGroup label={question.label} helperText={question.hint}>
                                    <TextArea style={{width: "100%"}} />
                                </FormGroup>
                            );
                        } else if (question.type == "radio"){
                            return (
                                <RadioGroup label={question.label} helperText={question.hint}>
                                    {question.options.map((option) => <Radio label={option}/>)}
                                </RadioGroup>
                            );
                        } else if (question.type == "switch") {
                            return (
                                <Switch label={question.label}  helperText={question.hint}alignIndicator={Alignment.LEFT}/>
                            );
                        } else { //default to text
                            return (
                                <FormGroup label={question.label} helperText={question.hint}>
                                    <InputGroup id="" placeholder={question.label} />
                                </FormGroup>
                            );
                        }
                    }
                    )}
                </Card>
        });
    }

    render() {
        var s = this.state;
        return(
            <div style={{align: 'center', justifyContent: "center"}}>
                {this.generateQuestionaireForm()}
                <Card style={{width: "100%"}}>
                    <Button fill intent="primary" text="Submit" onClick={this.props.submitForm}/>
                </Card>
            </div>
        );
    }
}

export default QuestionaireForm;