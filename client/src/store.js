import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    login: null,
    token: null,
    isAuth: false,
    posts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET:POSTS_LIST':
            return Object.assign({}, state, {posts: action.payload});

        case 'DELETE:POST':
            const el = state.posts.find(({_id}) => _id === action.payload);
            const key = state.posts.findIndex(({_id}) => _id === el._id);
            const arr = [
                ...state.posts.slice(0, key),
                ...state.posts.slice(key+1)
            ];
            return Object.assign({}, state, {posts: arr});

        case 'PUT:POST':
            const post = state.posts.find(({_id}) => _id === action.payload._id);
            const index = state.posts.findIndex(({_id}) => _id === post._id);
            const newArr = transform(state.posts, action.payload, index);
            return Object.assign({}, state, {posts: newArr});

        case 'ADD:POST':
            const newArray = transform(state.posts, action.payload, -1);
            return Object.assign({}, state, {posts: newArray});

        case 'POST:LOGIN_USER':
            return Object.assign({}, state, {login: action.payload.login, token: action.payload.token, isAuth: true});

        case 'POST:LOGOUT_USER':
            return Object.assign({}, state, {login: null, token: null, isAuth: false});

        default:
            return state

    }
};

function transform(allPosts, item, idx) {
    if (idx<0) {
        return [
            ...allPosts,
            item
        ]
    }
    return [
        ...allPosts.slice(0, idx),
        item,
        ...allPosts.slice(idx+1)
    ]
}

export default createStore(
    reducer,
    applyMiddleware(thunk)
);