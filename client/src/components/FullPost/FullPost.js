import React, {Component} from 'react';
import ApiWorker from '../../api/apiWorker';
import {connect} from "react-redux";
import {changePostsList} from '../../actions/postNewsAction';
import { Link } from 'react-router-dom';
const api = new ApiWorker();

class FullPost extends Component {

    state = {};

    componentDidMount() {
        api.getFullPost(this.props.match.params.id)
            .then(r => this.setState(r));
    }

    deletePost() {
        api.deletePost(this.props.match.params.id, this.props.token)
            .then(() => {
                this.props.changePostsList(this.props.match.params.id);
                window.location.href = '/'
            });
    }

    render() {
        const {title, body} = this.state;
        const {isAuth} = this.props;
        return (
            <main>
                <div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
                {
                    isAuth
                        ? <div className={'controlPanel'}>
                            <button onClick={() => this.deletePost()}>Удалить запись</button>
                            <Link to={'/edit/' + this.props.match.params.id}>Редактировать запись</Link>
                        </div>
                        : null
                }
            </main>
        )
    }
}

export default connect(({token}) => {return {token}}, {changePostsList})(FullPost)