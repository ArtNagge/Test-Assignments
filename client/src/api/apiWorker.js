import axios from "axios";

class ApiWorker {

    _url = 'http://localhost:3333/api/';

    //posts
    async getAllList() {
        const result = await axios.get(this._url + 'posts');
        return result.data;
    }

    async getFullPost(id) {
        const result = await axios.get(this._url + 'posts/' + id);
        return result.data;
    }

    async deletePost(id, token) {
        const result = await axios.delete(
            this._url + 'posts/' + id,
            {
                headers: {'Authorization': token}
            });
        return result.data;
    }

    async createPost(title, body, token) {
        const result = await axios.post(this._url + 'posts', {title, body}, {headers: {'Authorization': token}});
        return result.data;
    }

    async editPost(id, title, body, token) {
        const result = await axios.put(this._url + 'posts/' + id, {title, body}, {headers: {'Authorization': token}});
        return result.data;
    }

    //users
    async getInfoPlayer(email, pass) {
        const result = await axios.post(this._url + 'signin', {email, pass});
        return result.data;
    }
    async registerUser(name, email, pass) {
        const result = await axios.post(this._url + 'signup', {name, email, pass});
        return result.data;
    }

}

export default ApiWorker;