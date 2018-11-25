import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Form, FormGroup, Input, Button, Label, FormFeedback, Alert} from 'reactstrap';

import {CreateUser} from '../../actions/UserActions';

class SignUp extends Component {
    timer = null;

    state = {
        email: '@',
        password: '',
    };

    createUser = (e) => {
        e.preventDefault();
        this.props.createUser(this.state.email, this.state.password)
    };


    handleFormChange = (e, newState) => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => this.setState(newState), 800);

    };


    render() {
        const validEmail = this.state.email.includes('@');
        let emailStyle = this.state.email === '@' ? {"borderColor": "grey"} : {};
        let passwordStyle = !this.state.password ? {"borderColor": "grey"} : {};
        if (this.props.loggedIn) {
            return (
                <Redirect to={'/'}/>
            )
        }
        return (
            <div className={'container center-div'}>
                {this.props.message &&
                <Alert color={"danger"} style={{width: "50%"}}>{this.props.message}</Alert>}
                <Form onSubmit={this.createUser} style={{width: "50%"}}>
                  <h1>Sign up</h1>
                    <FormGroup>
                        <Label for={"email"}>Email Address</Label>
                        <Input
                            style={emailStyle}
                            valid={validEmail && !this.props.message}
                            invalid={!validEmail}
                            type={"email"}
                            placeholder={"Type in your email"}
                            onChange={e => this.handleFormChange(e, {email: e.target.value})}
                        />
                        <FormFeedback>{this.state.email.includes('@') ? null : "Not a valid email. you need @"}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"password"}>Password</Label>
                        <Input
                            style={passwordStyle}
                            valid={this.state.password.length > 4}
                            invalid={!(this.state.password.length > 4)}
                            type={"password"}
                            placeholder={"Please type a password"}
                            onChange={e => this.handleFormChange(e, {password: e.target.value})}
                        />
                        <FormFeedback>You need at least 5 characters</FormFeedback>
                    </FormGroup>

                    <FormGroup className={"center-div"}>
                        <Button style={{width: "40%"}} disabled={!(validEmail && this.state.password.length > 4)}>
                            Create User
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (email, password) => dispatch(CreateUser(email, password))
    }
};

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        loggedIn: state.auth.loggedIn,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
