import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Card,
    Paper,
    Chip,
    CardContent,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Slide,
    Dialog,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PublicIcon from '@mui/icons-material/Visibility';
import PrivateIcon from '@mui/icons-material/VisibilityOff';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import Question from '../components/Question';
import axios from 'axios';
import {
    IP,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from '../constants/Globals';
import { AppConsumer } from '../context/AppContext';
import { withRouter, Link } from 'react-router-dom';

class FormSubmissions extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            submissions: []
        }
    }

    componentDidMount() {
        this.fetchFormSubmissions();
    }//end

    fetchFormSubmissions = async () => {
        this.setState({ loading: true });
        const query = this.props.location.search;
        const formId = query.slice(4, query.length);
        // console.log('formId -> ', formId);
        const link = `${IP}/submissions`;
        //const user = localStorage.getItem('user');
        const token = `bearer ${this.context.user.token}`;
        //const token = `bearer ${user.token}`;
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        try {
            const response = await axios.post(link, { formId: formId });
            const { data } = response;
            console.log('submissions -> ', data.submissions);
            this.setState({
                loading: false,
                submissions: data.submissions
            });
        }
        catch (e) {
            //alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e);
        }
    }//end

    render() {
        const { loading, submissions} = this.state;
        return (
            <div style={{
                padding: 16
            }}>
                <Grid
                    container
                    //spacing={24}
                    alignItems="center"
                    justify="center"
                >
                {loading && <Box sx={{
                    width: '100%',
                    marginTop: 2
                }}>
                    <LinearProgress variant="indeterminate" />
                </Box>}
                    <Grid item xs={12} >
                        <h1>Form Submissions</h1>

                        {submissions && submissions.length >0 && <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Submitted By</TableCell>
                                    <TableCell align="center">Submitted At</TableCell>
                                    <TableCell align="center">View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {submissions.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="center">{item.submittedBy}</TableCell>
                                            <TableCell align="center">
                                                {`${new Date(item.createdAt).toDateString()} at ${new Date(item.createdAt).toTimeString()} `}
                                            </TableCell>
                                            <TableCell align="center">
                                        
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                      
                    </Grid>
                </Grid>

            </div>
        )//end return
    }//end render
}//end class

export default FormSubmissions;