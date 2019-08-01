import React from 'react';
import { Link } from "react-router-dom";
import {withCookies} from 'react-cookie'

const Header = (props) => {

    const {isAuth} = props;

    const isAuthorize = (auth) => {
        return auth ? (
            <>
                <Link to='/create'>CREATE POST</Link>
                <a href={'/'} onClick={async () => await props.cookies.remove('info')}>QUIT</a>
            </>
        ) : <Link to='/login'>LOGIN</Link>;
    };

    return(
        <header>
            <h2>Yan test page</h2>
            <ul>
                <Link to='/'>HOME</Link>
                { isAuthorize(isAuth) }
            </ul>
        </header>
    )
};

export default withCookies(Header);