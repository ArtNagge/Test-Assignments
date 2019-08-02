import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePost} from '../../actions/postNewsAction';
import { Link, Redirect } from 'react-router-dom';

class FullPost extends Component {

    state = {};

    componentDidMount() {
        this.mount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.mount(prevProps);
    }

    mount(prevProps) {
        const {post} = this.props;
        if (prevProps && prevProps.post === post) return false;
        this.setState(post);
    }

    deletePost() {
        const id = this.state._id;
        this.props.deletePost(id, this.props.token);
        this.setState({del: true});
    }

    hasDel() {
        return this.state.del ? <Redirect to="/"/> : null
    }

    render() {
        const {isAuth} = this.props;
        return (
            <div className="card mt-3">
                {this.hasDel()}
                <div className="card-body">
                    <h5 className="card-title">{this.state.title}</h5>
                    <p className="card-text">{this.state.body}</p>
                </div>
                {
                    isAuth
                        ? <div className = "btn-group" role="group" aria-label="Basic example">
                            <button type="button" onClick={() => this.deletePost()} className="btn btn-secondary">Удалить запись</button>
                            <Link to={'/edit/' + this.props.match.params.id} className="btn btn-secondary">Редактировать запись</Link>
                        </div>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = ({token, posts, isAuth}, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        token,
        post: posts.find(({_id}) => _id === id),
        isAuth}
};

export default connect(mapStateToProps, {deletePost})(FullPost)