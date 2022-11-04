//import axios from 'axios';
//import { IP } from '../Constants/Globals';

export const loginActionReducer = async (that, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    that.setState({ isAuth: true, user: user });

    // that.setState({ loginLoading: true });
    // const link = `${IP}/users/login`;
    // try {
    //     let res = await axios.post(link, { email, password });
    //     let user = res.data.data;
    //     console.log(user);
    //     localStorage.setItem('user', JSON.stringify(user));
    //     that.setState({ loginLoading: false, isAuth: true, loginMessage: '', user: user });
    // }
    // catch (error) {
    //     alert('Something went wrong !')
    //     that.setState({ loginLoading: false, loginMessage: '' });
    //     console.log(error);
    // }

}//end func

export const logoutActionReducer = async (that) => {
    // let user = JSON.parse(localStorage.getItem('user'));
    // const link = `${IP}/users/admin/logout`;
    // const token = `bearer ${user.token}`;
    // axios.defaults.headers.common['Authorization'] = token;
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // try{
    //     await axios.get(link);
    //     localStorage.removeItem('user');
    //     that.setState({ isAuth: false });
    // }
    // catch (error) {
    //     alert('Something went wrong !');
    //     console.log(error); 
    // }
    localStorage.removeItem('user');
    that.setState({ isAuth: false, user: null });
}//end func