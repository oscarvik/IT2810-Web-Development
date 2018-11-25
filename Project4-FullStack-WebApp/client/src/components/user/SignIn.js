import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Form, FormGroup, Input, Button, Label, FormFeedback, Alert} from 'reactstrap';

import {SignInUser} from '../../actions/UserActions';

class SignIn extends Component {
    timer = null;

    state = {
        email: '',
        password:''
    };


    signIn = (e) => {
        e.preventDefault();
        this.props.signInUser(this.state.email, this.state.password);
    };

    handleFormChange = (e, newState) => {
        this.setState(newState)
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
            <div className={'container center-div'} >
                {this.props.message &&
                <Alert data-cy={"error-alert"} color={"danger"} style={{width:"50%"}}>{this.props.message}</Alert>}
                <Form onSubmit={this.signIn} style={{width: "50%"}}>
                  <h1>Sign in</h1>
                    <FormGroup>
                        <Label for={"email"}>Email Address</Label>
                        <Input
                            data-cy={"email-input"}
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
                            data-cy={"password-input"}
                            style={passwordStyle}
                            valid={this.state.password.length > 4 || !this.state.length}
                            invalid={!(this.state.password.length > 4)}
                            type={"password"}
                            placeholder={"Please type a password"}
                            onChange={e => this.handleFormChange(e, {password: e.target.value})}
                        />
                        <FormFeedback>You need at least 5 characters</FormFeedback>
                    </FormGroup>

                    <FormGroup className={"center-div"}>
                        <Button style={{width: "40%"}} disabled={!(validEmail && this.state.password.length > 4)}>
                            Sign In
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
        message: state.auth.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (email, password) => dispatch(SignInUser(email, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
