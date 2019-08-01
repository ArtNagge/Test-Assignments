import React, {Component} from 'react';
import ApiWorker from '../../api/apiWorker';
import {connect} from "react-redux";
const api = new ApiWorker();

class EditPost extends Component {
    state = {
        title: '',
        body: '',
        _id: ''
    };

    componentDidMount() {
        api.getFullPost(this.props.match.params.id)
            .then(r => this.setState(r));
    }

    handleChange = (evt) => {
        let name = evt.target.name;
        this.setState({[name]: evt.target.value})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        api.editPost(this.state._id, this.state.title, this.state.body, this.props.token)
            .then((r) => console.log(r))
            .then(() => alert('edited'))
            .then(() =>
                window.location.reload());
    };

    render() {
        return(
            <main>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name='title' placeholder='Заголовок' onChange={this.handleChange} value={this.state.title}/>
                        <input type="text" name='body' placeholder='Информация' onChange={this.handleChange} value={this.state.body}/>
                        <input type="submit" value='Отредактировать'/>
                    </form>
                </div>
            </main>
        );
    }
}

export default connect(({token}) => {return {token}})(EditPost);