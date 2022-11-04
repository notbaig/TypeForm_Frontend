import * as React from 'react';
import { loginActionReducer, logoutActionReducer } from './AuthActionReducers';

const AppContext = React.createContext();

class AppProvider extends React.Component {
    state = {
        user: null,
        isAuth: false,
        login: (user) => loginActionReducer(this, user),
        logout: () => logoutActionReducer(this),

    }//end state

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({ isAuth: true, user: JSON.parse(user) });
        }
        else {
            this.setState({ isAuth: false });
        }
    }
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }//end render

}//end class

const AppConsumer = AppContext.Consumer

export { AppProvider, AppConsumer }