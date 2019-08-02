import React, {Component} from 'react';
import {connect} from "react-redux";
import {editPost} from '../../actions/postNewsAction';
import {Redirect} from 'react-router-dom';

class EditPost extends Component {
    state = {
        title: '',
        body: '',
        _id: ''
    };

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

    handleChange = (evt) => {
        let name = evt.target.name;
        this.setState({[name]: evt.target.value})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.editPost(this.state, this.props.token);
    };

    hasDel() {
        return !this.props.isAuth ? <Redirect to="/"/> : null
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {this.hasDel()}
                <button className='btn btn-dark mb-5 mt-3' onClick={this.props.history.goBack}>Вернутся назад</button>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Заголовок</label>
                    <input type="text" name="title" onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Введите заголовок" value={this.state.title}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Информация</label>
                    <textarea name='body' value={this.state.body} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>
                <button type="submit" className="btn btn-primary">Отредактировать</button>
            </form>
        );
    }
}

const mapStateToProps = ({token, posts, isAuth}, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        token,
        post: posts.find(({_id}) => _id === id),
        isAuth}
};

export default connect(mapStateToProps, {editPost})(EditPost);