import * as React from 'react';
import {
    Box,
    Paper,
    Grid,
    Item,
    Button,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { AppConsumer } from '../context/AppContext';
import { IP } from '../constants/Globals';
import axios from 'axios';

class Profile extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        }//end state
    }//end constructor

    componentDidMount() {
        this.fetchProfile();
    }//end didMount

    fetchProfile = async () => {
        this.setState({ loading: true });
        const link = `${IP}/auth/get-profile`;

        const token = `bearer ${this.context.user.token}`;
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        try {
            const response = await axios.get(link);
            const { data } = response;
            // console.log('user -> ', data);
            this.setState({ loading: false, user: data });
        }
        catch (e) {
            alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e.response.data);
        }
    }//end

    render() {
        const { loading, user } = this.state;
        return (
            <div style={{ padding: 16 }}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} >
                        <h1>Profile</h1>

                        {loading && <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="indeterminate" />
                        </Box>}

                        {user && <h3>User Details</h3>}

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Key</TableCell>
                                        <TableCell align="center">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user && Object.keys(user).map((key, index) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell align="center">{key}</TableCell>
                                                <TableCell align="center">
                                                    {(typeof user[key] === 'boolean') ? (user[key] ? 'Yes' : 'No') : user[key]}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>




                    </Grid>
                </Grid>

            </div>
        )//end return
    }//end render

}//end class

export default Profile;