import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Card,
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
    LinearProgress
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

class MyForms extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            forms: [],
        }
    }

    componentDidMount() {
        this.fetchForms();
    }//end

    fetchForms = async () => {
        this.setState({ loading: true });
        const link = `${IP}/form/my-forms`;

        const token = `bearer ${this.context.user.token}`;
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        try {
            const response = await axios.get(link);
            const { forms } = response.data;
            console.log('forms -> ', forms);
            this.setState({ loading: false, forms: forms });
        }
        catch (e) {
            alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e.response.data);
        }
    }//end

    render() {
        const { loading, forms } = this.state;
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
                        <h1>My Forms</h1>

                        {forms && forms.length > 0 && forms.map((form, index) => {
                            const {
                                _id,
                                name,
                                description,
                                privacy,
                                createdAt,
                                totalSubmissions
                            } = form
                            return (
                                <Card
                                    key={index}
                                    onClick={() => {

                                    }}
                                    style={{
                                        backgroundColor: '#e8eaf6'
                                    }}
                                >
                                    <CardContent>

                                        <div style={{
                                            display: 'flex',
                                            marginBottom: 4,
                                            alignItems: 'center'
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                style={{
                                                    marginRight: 4
                                                }}>{name}</Typography>
                                            {privacy === 'PUBLIC' ? <PublicIcon /> : <PrivateIcon />}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            marginBottom: 4,
                                            alignItems: 'center'
                                        }}>
                                            <Typography
                                                sx={{ fontSize: 14 }}
                                                color="text.secondary"
                                                style={{
                                                    marginRight: 4
                                                }}>{"Form Link:"}
                                            </Typography>
                                            <Link
                                                //to="/form" 
                                                //params={{ id: _id }}
                                                // to={{
                                                //     pathname: '/form',
                                                //     search: `?id=${_id}`
                                                // }}
                                                to={`/form?id=${_id}`}
                                                target="_blank"
                                            >
                                                <Typography
                                                    variant="h7"
                                                    component="div">
                                                    {`${IP}/form?id=${_id}`}
                                                </Typography>
                                            </Link>
                                        </div>

                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                        >
                                            {`${new Date(createdAt).toDateString()} at ${new Date(createdAt).toTimeString()} `}
                                        </Typography>

                                        <Chip
                                            label={`Total Submissions: ${totalSubmissions}`}
                                            style={{
                                                marginTop: 16
                                            }}
                                        />

                                    </CardContent>



                                </Card>
                            )
                        })}


                    </Grid>
                </Grid>

            </div>
        )//end return
    }//end render
}//end class

export default withRouter(MyForms);