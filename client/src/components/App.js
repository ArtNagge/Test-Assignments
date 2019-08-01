import React, {Component} from 'react';

import Header from "./Header";
import AuthPage from "../Pages/AuthPage";
import HomePage from "../Pages/HomePage";

import { withCookies } from 'react-cookie';
import {loginUser} from '../actions/infoUserActions';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import FullPost from "./FullPost";
import CreatePost from "./CreatePost";
import RegPage from "../Pages/RegPage";
import EditPost from "./EditPost";

class App extends Component {
    state = {isAuth: false};

    componentDidMount() {
        const {cookies, loginUser} = this.props;

        if(cookies.get('info')) {
            this.setState({isAuth: true});
            loginUser(cookies.get('info'))
        }
    }

    render() {
        const {isAuth} = this.state;
        return(
            <div className={'container'}>
                <Router>
                    <Header isAuth={isAuth}/>
                    <Route path={'/'} exact component={HomePage}/>
                    <Route path={'/post/:id'} render={routeProps => <FullPost isAuth={isAuth} {...routeProps}/>}/>


                    <Route path={'/create'} render={() => (isAuth ? (<CreatePost/>) : (<Redirect to="/"/>))}/>
                    <Route path={'/edit/:id'} render={(routeProps) => (isAuth ? (<EditPost {...routeProps}/>) : (<Redirect to="/"/>))}/>
                    {
                        //Тут имеется маленький косяк
                        //Как его решить, я пока способа не нашел, но пытаюсь
                        //При монтировании компонента нам прилетает "isAuth: false" и он мгновенно считывает роутинг тем самым делает редирект
                        //Если переходить на эту страницу не сразу по ссылке, а лишь посредством роутинга, то все отрабатывает так, как нужно
                    }
                    <Route path="/login" render={() => (!isAuth ? (<AuthPage/>) : (<Redirect to="/"/>))}/>
                    <Route path="/register" render={() => (!isAuth ? (<RegPage/>) : (<Redirect to="/"/>))}/>
                    {
                        //Тут аналогичная ситуация, но вроде как работает
                    }
                </Router>
            </div>
        )
    }
}

export default connect(null, {loginUser})(withCookies(App));
