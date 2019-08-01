import React, {Component} from 'react';
import {connect} from "react-redux";
import ApiWorker from '../api/apiWorker';
import {loginUser} from '../actions/infoUserActions';
import { withCookies } from 'react-cookie';

const api = new ApiWorker();

class RegPage extends Component {

    state = {
        login: '',
        email: '',
        pass: ''
    };

    handleChange = (evt) => {
        let name = evt.target.name;
        this.setState({[name]: evt.target.value})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        api.registerUser(this.state.login, this.state.email, this.state.pass)
            .then(r => {
                console.log(r);
                this.props.loginUser(r);
                this.props.cookies.set('info', {login: r.login, token: r.token}, { path: '/', httpOnly: false, maxAge: 3600 * 24 * 7 });
                window.location.reload();
            });
    };

    render() {
        return(
            <main>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.login} onChange={this.handleChange} name="login" placeholder="Логин" />
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="email" />
                    <input type="text" value={this.state.pass} onChange={this.handleChange} name="pass" placeholder="Пароль" />
                    <input type="submit" value="Send Request" />
                </form>
            </main>
        )
    }

}
export default connect(null, {loginUser})(withCookies(RegPage));