import ApiWorker from '../api/apiWorker';
const api = new ApiWorker();

const setPostsList = () => {
    return (dispatch) => api.getAllList().then(payload => dispatch({type: 'SET:POSTS_LIST', payload}))
};

const deletePost = (payload, token) => {
    return (dispatch) => api.deletePost(payload, token).then(dispatch({type: 'DELETE:POST', payload})).then(() => alert('Запись удалена'))
};

const editPost = (payload, token) => {
    const {_id, title, body} = payload;
    return (dispatch) => api.editPost(_id, title, body, token).then(dispatch({type: 'PUT:POST', payload})).then(() => alert('Запись отредактирована'))
};

const addPost = (payload, token) => {
    const {title, body} = payload;
    return (dispatch) => api.createPost(title, body, token).then(result => dispatch({type: 'ADD:POST', payload: result.post})).then(() => alert('Запись создана'))
};

export {
    addPost,
    editPost,
    deletePost,
    setPostsList
};