import React, {Component} from 'react';
import Header from "./Header";
import AuthPage from "../Pages/AuthPage";
import HomePage from "../Pages/HomePage";
import FullPost from "./FullPost";
import CreatePost from "./CreatePost";
import RegPage from "../Pages/RegPage";
import EditPost from "./EditPost";
import { withCookies } from 'react-cookie';
import {loginUser} from '../actions/infoUserActions';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from "react-redux";
import {setPostsList} from '../actions/postNewsAction';

class App extends Component {

    componentDidMount() {
        const {cookies, loginUser, posts, setPostsList} = this.props;
        if(cookies.get('info')) loginUser(cookies.get('info'));
        if (!posts.length) setPostsList();
        console.log('App', 'mounted')
    }

    componentDidUpdate() {
        console.log('App', 'update');
    }

    render() {
        return(
            <div className={'container'}>
                <div className="column align-items-start justify-content-center">
                    <Router>
                        <Header/>

                        <Route path={'/'} exact component={(routeProps) => <HomePage posts={this.props.posts} {...routeProps}/>}/>

                        <Route path={'/post/:id'} component={FullPost}/>
                        <Route path={'/create'} component={CreatePost}/>
                        <Route path={'/edit/:id'} component={EditPost}/>

                        <Route path="/login" component={AuthPage}/>
                        <Route path="/register" component={RegPage}/>
                    </Router>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {posts}
};

export default connect(mapStateToProps, {loginUser, setPostsList})(withCookies(App));
