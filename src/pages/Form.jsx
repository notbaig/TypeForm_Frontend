import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Card,
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
import Answer from '../components/Answer';
import axios from 'axios';
import {
    IP,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from '../constants/Globals';
import { AppConsumer } from '../context/AppContext';
import { withRouter, Link } from 'react-router-dom';


class Form extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: null,
            answers: [],
            submittedBy: '',
            formSubmitted: false
        }
    }

    componentDidMount() {
        this.fetchForm();
    }//end

    fetchForm = async () => {
        this.setState({ loading: true });
        const query = this.props.location.search;
        const formId = query.slice(4, query.length);
        // console.log('formId -> ', formId);
        const link = `${IP}/public/get-form`;
        try {
            const response = await axios.post(link, { formId: formId });
            const { data } = response;
            let temp = [...data.questionnaire];
            temp = temp.map((question) => {
                return {
                    ...question,
                    answer: ''
                }
            })
            console.log('answers -> ', temp);
            this.setState({
                loading: false,
                form: data,
                answers: temp
            });
        }
        catch (e) {
            //alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e);
        }
    }//end

    onEvent = (value, answerObject, index) => {
        let temp = [...this.state.answers];
        temp[index] = {
            ...answerObject,
            answer: value
        }
        this.setState({ answers: temp });
    }//end

    submitForm = async () => {
        const {
            form,
            answers,
            submittedBy
        } = this.state;
        const body = {
            formId: form._id,
            answers: answers,
            questionnaire: form.questionnaire,
            submittedBy: submittedBy
        };
        console.log('submissions -> ', body);
        const link = `${IP}/public/submit-form`;
        try {
            const response = await axios.post(link, body);
            const { data } = response;
            console.log('submission -> ', data);
            this.setState({
                loading: false,
                formSubmitted: true
            });
        }
        catch (e) {
            //alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e);
        }
    }//end

    render() {
        let {
            loading,
            form,
            answers,
            submittedBy,
            formSubmitted
        } = this.state;
        return (
            <div style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>

                {loading && <Box sx={{
                    width: '100%',
                    marginTop: 2
                }}>
                    <LinearProgress variant="indeterminate" />
                </Box>}

                {form && !formSubmitted && <Card sx={{
                    padding: 4,
                    width: '40%',
                    marginLeft: '2%',
                    backgroundColor: '#e8eaf6'
                }}>
                    <Typography
                        variant="h5"
                        component="div"
                        style={{ marginBottom: 4 }}
                    >
                        {form.name}
                    </Typography>

                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        style={{ marginBottom: 4 }}
                    >
                        {form.description}
                    </Typography>

                    <TextField
                        variant="outlined"
                        label={'Submitting as'}
                        placeholder="e.g: Your name or email"
                        fullWidth={true}
                        autoFocus={true}
                        style={{ marginBottom: 16 }}
                        value={submittedBy}
                        autoFocus={true}
                        onChange={e => this.setState({ submittedBy: e.target.value })}
                    />

                    <Divider />

                    {answers.map((answer, index) => {
                        return (
                            <Answer
                                key={index}
                                data={answer}
                                lastIndex={answers.length - 1 === index}
                                onEvent={(val) => this.onEvent(val, answer, index)}
                            />
                        )
                    })}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.submitForm}
                    >
                        Submit
                    </Button>

                </Card>}

                {formSubmitted && <>  <Typography
                    variant="h1"
                    component="div"
                    style={{ marginTop: 32 }}
                >
                    Thank You!
                </Typography>

                    <Typography
                        sx={{ fontSize: 24 }}
                        color="text.secondary"
                        style={{ marginTop: 8 }}
                    >
                        Your form has been submitted.
                    </Typography>
                </>}
            </div>
        )//end return
    }//end render
}//end class

export default Form;