import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Card,
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
import { withRouter } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CreateForm extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            questionModalVisible: false,
            questionToBeAddedLabel: '',
            questionToBeAddedType: 'INPUT',
            questionToBeAddedSubType: 'SIMPLE',
            questionToBeAddedRadioOptions: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4'
            ],

            // LIVE FIELDS
            questionnaire: [],
            formName: 'My First Form',
            formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            formPrivacy: 'PUBLIC',

            // TEST FIELDS
            // questionnaire: [
            //     {
            //         type: 'INPUT',
            //         subType: 'SIMPLE',
            //         lablel: 'What is your favouraite color?'
            //     },
            //     {
            //         type: 'INPUT',
            //         subType: 'MULTILINE',
            //         lablel: 'Write a short bio about yourself.'
            //     },
            //     {
            //         type: 'RADIO',
            //         lablel: 'Write a short bio about yourself.',
            //         options: [
            //             'Option 1',
            //             'Option 2',
            //             'Option 3',
            //             'Option 4'
            //         ]
            //     }
            // ],
            // formName: 'My First Form',
            // formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
            // formPrivacy: 'PUBLIC',
        }
    }

    openQuestionModal = (type) => this.setState({
        questionModalVisible: true,
        questionToBeAddedType: type
    });

    closeQuestionModal = () => this.setState({
        questionModalVisible: false,
        questionToBeAddedRadioOptions: [
            'Option 1',
            'Option 2',
            'Option 3',
            'Option 4'
        ],
        questionToBeAddedLabel: ''
    });

    addToQuestionaire = () => {
        const {
            questionnaire,
            questionToBeAddedLabel,
            questionToBeAddedType,
            questionToBeAddedSubType,
            questionToBeAddedRadioOptions
        } = this.state;
        if (questionToBeAddedLabel == '') {
            return;
        }
        let question = {
            type: questionToBeAddedType,
            subType: questionToBeAddedSubType,
            lablel: questionToBeAddedLabel,
        };
        if (questionToBeAddedType === 'RADIO') {
            question = {
                ...question,
                options: questionToBeAddedRadioOptions
            };
            delete question['subType'];
        }
        this.setState({
            questionModalVisible: false,
            questionToBeAddedRadioOptions: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4'
            ],
            questionToBeAddedLabel: '',
            questionnaire: [...questionnaire, question]
        });
    }//end

    removeQuestion = (question) => {
        this.setState({
            questionnaire: this.state.questionnaire.filter(el => el.lablel !== question.lablel)
        })
    }//end

    createForm = async () => {
        const {
            formName,
            formDescription,
            formPrivacy,
            questionnaire
        } = this.state;
        if (formName === '' || formDescription === '' || questionnaire.length <= 0) {
            return;
        }
        this.setState({ loading: true });
        const link = `${IP}/form/create`;
        const token = `bearer ${this.context.user.token}`;
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        const body = {
            name: formName,
            description: formDescription,
            privacy: formPrivacy,
            questionnaire: questionnaire
        };

        console.log('T -> ', token);
        try {
            const response = await axios.post(link, body);
            const { data } = response;
            console.log('res -> ', data);
            this.setState({ loading: false });
            alert('Your form has been created!');
            this.props.history.push('my-forms');
        }
        catch (e) {
            alert(e.response.data);
            this.setState({ loading: false });
            console.log('e -> ', e.response.data);
        }
    }//end

    render() {
        const { loading } = this.state;
        return (
            <>
                <div style={{ padding: 16 }}>
                    <Grid
                        container
                        // spacing={24}
                        alignItems="center"
                        justify="center"
                    >
                        {loading && <Box sx={{
                            width: '100%',
                            marginTop: 2
                        }}>
                            <LinearProgress variant="indeterminate" />
                        </Box>}
                        <Grid item xs={6} >
                            <h1>Create a New Form</h1>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Form Preview
                            </Typography>
                            {this.renderFormPreview()}
                        </Grid>
                        <Grid item xs={6}
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{
                                alignSelf: 'flex-start'
                            }}>
                            {this.renderFormFields()}
                        </Grid>
                    </Grid>
                    {this.renderFABs()}
                </div>
                {this.questionModalVisible()}
            </>
        )//end return
    }//end render

    renderFABs = () => {
        return (
            <Fab
                mainButtonStyles={{
                    backgroundColor: PRIMARY_COLOR
                }}
                actionButtonStyles={{
                    backgroundColor: SECONDARY_COLOR
                }}
                icon={<AddIcon />}
                alwaysShowTitle={true}
            >
                <Action
                    text="Radio Buttons"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onClick={() => this.openQuestionModal('RADIO')}
                >
                    <ListIcon />
                </Action>
                <Action
                    text="Input Text"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onClick={() => this.openQuestionModal('INPUT')}
                >
                    <KeyboardIcon />
                </Action>
            </Fab>
        )
    } //end

    renderFormPreview = () => {
        const {
            formName,
            formDescription,
            formPrivacy,
            questionnaire
        } = this.state;
        return (
            <Card sx={{
                width: '80%',
                minHeight: 400,
                padding: 4,
                backgroundColor: '#e8eaf6'
            }}>
                <Typography variant="h5" component="div">
                    {formName}
                </Typography>

                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                >
                    {formDescription}
                </Typography>

                <div style={{
                    display: 'flex',
                    marginBottom: 4,
                    alignItems: 'center'
                }}>
                    <strong><p style={{
                        marginRight: 4,
                        color: PRIMARY_COLOR,
                    }}>Privacy</p></strong>
                    {formPrivacy === 'PUBLIC' ? <PublicIcon /> : <PrivateIcon />}
                </div>

                <Divider />

                {questionnaire.length <= 0
                    ? <Typography style={{ marginTop: 32 }} variant="body2">
                        When you start adding questions from + button, they will appear here.
                    </Typography>
                    : <>
                        {questionnaire.map((question, index) => {
                            return (
                                <Question
                                    key={index}
                                    data={question}
                                    lastIndex={questionnaire.length - 1 === index}
                                    removeQuestion={()=>this.removeQuestion(question)}
                                />
                            )
                        })}
                    </>}

                {questionnaire.length > 0 && <Button
                    disabled={true}
                    type="submit"
                    fullWidth
                    variant="contained"
                    // sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    size="large"
                >
                    Submit
                </Button>}
            </Card>
        )
    }//end

    questionModalVisible = () => {
        const {
            questionModalVisible,
            questionToBeAddedLabel,
            questionToBeAddedType,
            questionToBeAddedSubType,
            questionToBeAddedRadioOptions
        } = this.state;
        if (questionModalVisible) {
            return (
                <Dialog
                    //fullScreen
                    open={questionModalVisible}
                    onClose={this.closeQuestionModal}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.closeQuestionModal}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Add Question
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={this.addToQuestionaire}>
                                Add
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Typography
                        variant="h6"
                        component="div"
                        style={{
                            marginLeft: 16,
                            marginRight: 16,
                            marginTop: 16
                        }}>
                        Set your question's text label, input type, and click save to add it to your form
                    </Typography>

                    <TextField
                        variant="outlined"
                        label="Question"
                        placeholder="e.g: What is your favouraite color?"
                        fullWidth={false}
                        autoFocus={true}
                        style={{ margin: 16 }}
                        value={questionToBeAddedLabel}
                        onChange={(e) => this.setState({ questionToBeAddedLabel: e.target.value })}
                    />

                    {questionToBeAddedType === 'INPUT'
                        ? <>
                            <FormControl style={{
                                marginLeft: 16,
                                marginRight: 16,
                                marginBottom: 16
                            }}>
                                <FormLabel>Answer Input Type</FormLabel>
                                <RadioGroup
                                    value={questionToBeAddedSubType}
                                    onChange={(e) => this.setState({ questionToBeAddedSubType: e.target.value })}
                                >
                                    <FormControlLabel value="SIMPLE" control={<Radio />} label="Simple Input" />
                                    <FormControlLabel value="MULTILINE" control={<Radio />} label="Multiline Input" />
                                </RadioGroup>
                            </FormControl>
                        </>
                        : questionToBeAddedType === 'RADIO'
                            ? <>
                                {questionToBeAddedRadioOptions.map((item, index) => {
                                    return (
                                        <TextField
                                            key={index}
                                            variant="outlined"
                                            label="Question"
                                            placeholder={`Add option #${index + 1}`}
                                            fullWidth={false}
                                            style={{ margin: 16 }}
                                            value={questionToBeAddedRadioOptions[index]}
                                            onChange={(e) => {
                                                let temp = [...questionToBeAddedRadioOptions];
                                                temp[index] = e.target.value;
                                                this.setState({ questionToBeAddedRadioOptions: temp });
                                            }}
                                        />
                                    )
                                })}

                            </>
                            : null}
                </Dialog>
            )
        }
    }//end

    renderFormFields = () => {
        const {
            formName,
            formDescription,
            formPrivacy
        } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '80%',
                marginTop: '8%',
            }}>
                <TextField
                    variant="outlined"
                    label="Name"
                    placeholder="Name of your form"
                    fullWidth={true}
                    style={{ margin: 16 }}
                    value={formName}
                    onChange={(e) => this.setState({ formName: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    placeholder="Description of your form"
                    fullWidth={true}
                    style={{ margin: 16 }}
                    multiline={true}
                    rows={8}
                    value={formDescription}
                    onChange={(e) => this.setState({ formDescription: e.target.value })}
                />

                <FormControl style={{
                    marginLeft: 16,
                    marginRight: 16,
                    // marginBottom: 16
                }}>
                    <FormLabel>Select privacy</FormLabel>
                    <RadioGroup
                        value={formPrivacy}
                        onChange={(e) => this.setState({ formPrivacy: e.target.value })}
                    >
                        <FormControlLabel value="PUBLIC" control={<Radio />} label="Public" />
                        <FormControlLabel value="PRIVATE" control={<Radio />} label="Private" />
                        {/* <FormControlLabel value="RESTRICTED" control={<Radio />} label="Invite Only" /> */}
                    </RadioGroup>
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    // sx={{ mt: 3, mb: 2 }}
                    style={{ margin: 16 }}
                    color="primary"
                    size="large"
                    onClick={this.createForm}
                >
                    Create Form
                </Button>
            </div>
        )
    }//end

}//end class

export default withRouter(CreateForm);