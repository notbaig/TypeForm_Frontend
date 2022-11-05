import * as React from 'react';
import {
    Box,
    Grid,
    Paper,
    Button,
    TextField,
    Typography,
    CssBaseline,
    LinearProgress
} from '@mui/material';
import axios from 'axios';
import { IP } from '../constants/Globals';
import { AppConsumer } from '../context/AppContext';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            // email: 'baigmustafa47@gmail.com',
            // password: 'abc12345',
            loading: false
        }
    }//end constructor

    login = async () => {
        const { email, password } = this.state;
        if (email === '' || password === '') {
            return;
        }
        this.setState({ loading: true });
        const link = `${IP}/auth/login`;
        try {
            const response = await axios.post(link, { email, password });
            const { data } = response;
            console.log('res -> ', data);
            this.setState({ loading: false });
            this.context.login(data);
        }
        catch (e) {
            alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e.response.data);
        }
    }//end

    render() {
        return (
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {this.renderLEFT()}
                {this.renderRIGHT()}
            </Grid >
        );
    }//end render

    renderLEFT = () => {
        return (
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/snNHKZ-mGfE)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        )
    }//end

    renderRIGHT = () => {
        return (
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                square
                elevation={6}
                component={Paper}
            >
                <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
                >
                    <Typography component="h1" variant="h3">TypeForm</Typography>
                    {/* <Typography component="h1" variant="h5">Web Dev Course Project</Typography> */}
                    <hr />
                    <Typography component="h1" variant="h6">Mustafa Baig (17908)</Typography>
                    <Typography component="h1" variant="h6">Ali Murtaza (17933)</Typography>

                    {this.renderForm()}

                </Box>
            </Grid>
        )
    }//end

    renderForm = () => {
        const {
            email,
            password,
            loading
        } = this.state;
        return (
            <Box
                noValidate
                sx={{ mt: 1 }}
            >
                {loading && <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="indeterminate" />
                </Box>}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="primary"
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    size="large"
                    onClick={this.login}
                >
                    Log In
                </Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    // sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    size="large"
                    onClick={() => this.props.history.push('/signup')}
                >
                    Sign Up
                </Button>

            </Box>
        )
    }//end

}//end class

export default withRouter(Login);