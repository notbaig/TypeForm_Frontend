import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AppProvider, AppConsumer } from './context/AppContext';

import NavBar from './components/NavBar';

import Login from '../src/pages/Login';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/CreateForm';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../src/constants/Globals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const typeFormTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR
    },
    secondary: {
      main: SECONDARY_COLOR
    },
  },
});

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <AppConsumer>
      {({ isAuth }) => (
        <Route
          {...rest}
          render={(props) => isAuth === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
      )}
    </AppConsumer>
  )
}//end

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <AppConsumer>
      {({ isAuth }) => (
        <Route
          {...rest}
          render={(props) => isAuth === false
            ? <Component {...props} />
            : <Redirect to='/dashboard' />}
        />
      )}
    </AppConsumer>
  )
}//end

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={typeFormTheme}>
        <AppProvider>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/create-form" component={CreateForm} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PublicRoute exact path="/" component={Login} />
          </Switch>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}//end