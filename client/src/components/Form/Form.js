import React, {Component} from 'react';
import {connect} from "react-redux";
import {loginUser} from '../../actions/infoUserActions';
import ApiWorker from '../../api/apiWorker';
import { withCookies } from 'react-cookie';
import { Link } from "react-router-dom";

const api = new ApiWorker();

class Form extends Component {

    state = {
        email: '',
        pass: ''
    };

    handleChange = (evt) => {
        let name = evt.target.name;
        this.setState({[name]: evt.target.value})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        api.getInfoPlayer(this.state.email, this.state.pass)
            .then(r => {
                this.props.loginUser(r);
                this.props.cookies.set('info', {login: r.login, token: r.token}, { path: '/', httpOnly: false, maxAge: 3600 * 24 * 7 });
                window.location.reload();
            });
    };

    render() {
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Логин" />
                    <textarea value={this.state.pass} onChange={this.handleChange} name="pass" placeholder="Пароль" />
                    <input type="submit" value="Авторизироваться" />
                </form>
                <Link className={'register'} to={'/register'}>Зарегистрироваться</Link>
            </>
        )
    }

}
export default connect(null, {loginUser})(withCookies(Form));