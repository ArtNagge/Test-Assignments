import React, {useState} from 'react';
import {connect} from "react-redux";
import {loginUser} from '../../actions/infoUserActions';
import ApiWorker from '../../api/apiWorker';
import { withCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom';

const api = new ApiWorker();

function Form(props) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleChange = (evt) => {
        let name = evt.target.name;
        switch (name) {
            case "email":
                setEmail(evt.target.value);
                break;
            case "pass":
                setPass(evt.target.value);
                break;
            default:
                return null
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        api.getInfoPlayer(email, pass)
            .then( r => {
                props.loginUser(r);
                props.cookies.set('info', {login: r.login, token: r.token}, { path: '/', httpOnly: false, maxAge: 3600 * 24 * 7 })
            });
    };

    const hasDel = () => {
        return props.isAuth ? <Redirect to="/"/> : null
    };

    return(
        <form onSubmit={handleSubmit}>
            {hasDel()}
            <div className="form-group">
                <label htmlFor="exampleInputEmail">E-mail</label>
                <input type="text" name="email" required onChange={handleChange} className="form-control" id="exampleInputEmail" value={email}/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleInputPassword">Пароль</label>
                <input type="password" name="pass" required onChange={handleChange} className="form-control" id="exampleInputPassword" value={pass}/>
            </div>
            <button type="submit" className="btn btn-primary">Авторизироваться</button>
            <Link to='/register' className="btn btn-outline-primary ml-2">Зарегистрироваться</Link>
        </form>
    )
}

const mapStateToProps = ({isAuth}) => {
    return {isAuth}
};

export default connect(mapStateToProps, {loginUser})(withCookies(Form));