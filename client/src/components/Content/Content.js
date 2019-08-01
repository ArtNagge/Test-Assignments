import React from 'react';
import {connect} from "react-redux";
import {setPostsList} from '../../actions/postNewsAction';
import ApiWorker from '../../api/apiWorker';
import { Link } from "react-router-dom";

const api = new ApiWorker();

class Content extends React.Component {

    componentDidMount() {
        const {posts, setPostsList} = this.props;
        if (!posts.length) api.getAllList().then(res => setPostsList(res));
    }

    render() {
        return this.props.posts.map((item, idx) => (
            <Link to={`/post/${item._id}`} key={idx}>
                <div>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>
            </Link>
        ))
    }
}

export default connect(({posts}) => {return {posts}}, {setPostsList})(Content);