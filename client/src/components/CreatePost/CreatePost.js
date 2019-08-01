import React, {Component} from 'react';
import ApiWorker from '../../api/apiWorker';
import {connect} from "react-redux";
const api = new ApiWorker();

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
        api.createPost(this.state.title, this.state.body, this.props.token)
            .then(r => console.log(r))
            .then(() => alert('created'))
            .then(() => this.setState({title: '', body: ''}));
    };

    render() {
        return(
            <main>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name='title' placeholder='Заголовок' onChange={this.handleChange} value={this.state.title}/>
                        <textarea name='body' placeholder='Информация' onChange={this.handleChange} value={this.state.body}/>
                        <input type="submit" value='Создать'/>
                    </form>
                </div>
            </main>
        );
    }
}

export default connect(({token}) => {return {token}})(CreatePost);