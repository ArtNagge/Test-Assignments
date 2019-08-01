const setPostsList = (payload) => {
    return {
        type: 'SET:POSTS_LIST',
        payload
    }
};

const changePostsList = (payload) => {
    return {
        type: 'CHANGE:POSTS_LIST',
        payload: payload
    }
};

export {
    changePostsList,
    setPostsList
};