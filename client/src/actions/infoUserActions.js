const loginUser = (payload) => {
    return {
        type: 'POST:LOGIN_USER',
        payload
    }
};

const logoutUser = () => {
    return {type: 'POST:LOGOUT_USER'}
};

export {
    logoutUser,
    loginUser
};