import React from 'react';
import { Link } from "react-router-dom";
import {logoutUser} from '../../actions/infoUserActions';
import {withCookies} from 'react-cookie'
import {connect} from "react-redux";

const Header = (props) => {

    const {isAuth} = props;

    const logout = () => {
        props.cookies.remove('info');
        props.logoutUser();
    };

    const isAuthorize = (auth) => {
        return auth ? (
            <>
                <Link className="p-2 text-dark" to="/create">Создать пост</Link>
                <Link className="p-2 text-dark" to="/" onClick={logout}>Выйти</Link>
            </>
        ) : <Link className="p-2 text-dark" to='/login'>Войти</Link>;
    };

    return(

        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Yan test page</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">Главная</Link>
                { isAuthorize(isAuth) }
            </nav>
        </div>
    )
};

const mapStateToProps = ({isAuth}) => {
    return {isAuth}
};

export default connect(mapStateToProps, {logoutUser})(withCookies(Header));