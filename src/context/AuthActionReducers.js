export const loginActionReducer = async (that, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    that.setState({ isAuth: true, user: user });
}//end func

export const logoutActionReducer = async (that) => {
    localStorage.removeItem('user');
    that.setState({ isAuth: false, user: null });
}//end func