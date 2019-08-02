import React, {Component} from 'react';
import {connect} from "react-redux";
import ApiWorker from '../api/apiWorker';
import {loginUser} from '../actions/infoUserActions';
import { withCookies } from 'react-cookie';
import {Link, Redirect} from "react-router-dom";

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
                this.props.loginUser(r);
                this.props.cookies.set('info', {login: r.login, token: r.token}, { path: '/', httpOnly: false, maxAge: 3600 * 24 * 7 });
            });
    };

    hasDel() {
        return this.props.isAuth ? <Redirect to="/"/> : null
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {this.hasDel()}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">E-mail</label>
                    <input type="text" name="email" required onChange={this.handleChange} className="form-control" id="exampleInputEmail" value={this.state.email}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputLogin">Логин</label>
                    <input type="text" name="login" required onChange={this.handleChange} className="form-control" id="exampleInputLogin" value={this.state.login}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Пароль</label>
                    <input type="password" name="pass" required onChange={this.handleChange} className="form-control" id="exampleInputPassword" value={this.state.pass}/>
                </div>
                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                <Link to='/login' className="btn btn-outline-primary ml-2">Авторизация</Link>
            </form>
        )
    }

}

const mapStateToProps = ({isAuth}) => {
    return {isAuth}
};

export default connect(mapStateToProps, {loginUser})(withCookies(RegPage));