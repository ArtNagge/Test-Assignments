import React, {Component} from 'react';
import {connect} from "react-redux";
import {addPost} from '../../actions/postNewsAction';
import {Redirect} from 'react-router-dom';

class CreatePost extends Component {
    state = {
        title: '',
        body: ''
    };

    handleChange = (evt) => {
        let name = evt.target.name;
        this.setState({[name]: evt.target.value})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.addPost(this.state, this.props.token);
        this.setState({title: '', body: ''});
    };

    hasDel() {
        return !this.props.isAuth ? <Redirect to="/"/> : null
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {this.hasDel()}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Заголовок</label>
                    <input type="text" name="title" onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Введите заголовок" value={this.state.title}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Информация</label>
                    <textarea name='body' value={this.state.body} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>
                <button type="submit" className="btn btn-primary">Создать</button>
            </form>
        );
    }
}

const mapStateToProps = ({token, isAuth}) => {
    return {token, isAuth};
};

export default connect(mapStateToProps, {addPost})(CreatePost);