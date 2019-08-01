import { createStore } from 'redux';

const initialState = {
    login: null,
    token: null,
    posts: []
};
// вместо одного большого редьюсера можно было бы использовать
// более красивый вариант - композицию,
// но я решил слишком сильно не раскидывать файлы и уместил все в одном месте
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET:POSTS_LIST':
            return Object.assign({}, state, {posts: action.payload});

        case 'CHANGE:POSTS_LIST':
            const el = state.posts.find(({_id}) => _id === action.payload);
            const key = state.posts.findIndex(({_id}) => _id === el._id);
            const arr = [
                ...state.posts.slice(0, key),
                ...state.posts.slice(key+1)
            ];
            return Object.assign({}, state, {posts: arr});

        case 'POST:LOGIN_USER':
            return Object.assign({}, state, {login: action.payload.login, token: action.payload.token});

        default:
            return state

    }
};

export default createStore(reducer);