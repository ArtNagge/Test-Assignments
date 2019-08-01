const loginUser = (payload) => {
    return {
        type: 'POST:LOGIN_USER',
        payload
    }
};

export {
    loginUser
};