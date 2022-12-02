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
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import Question from '../components/Question';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/Globals';
import { AppConsumer } from '../context/AppContext';

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
            questionnaire: [
                {
                    type: 'INPUT',
                    subType: 'SIMPLE',
                    lablel: 'What is your favouraite color?'
                },
                {
                    type: 'INPUT',
                    subType: 'MULTILINE',
                    lablel: 'Write a short bio about yourself.'
                },
                {
                    type: 'RADIO',
                    lablel: 'Write a short bio about yourself.',
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3',
                        'Option 4'
                    ]
                }
            ],
            // questionnaire: [],
            questionToBeAddedLabel: '',
            questionToBeAddedType: 'INPUT',
            questionToBeAddedSubType: 'SIMPLE',
            questionToBeAddedRadioOptions: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4'
            ],
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
                        <Grid item xs={12} >
                            <h1>Create a New Form</h1>
                            {loading && <Box sx={{
                                width: '100%',
                                marginBottom: 2
                            }}>
                                <LinearProgress variant="indeterminate" />
                            </Box>}
                            {this.renderFormPreview()}
                        </Grid>
                    </Grid>
                    {this.renderFABs()}
                </div>
                {this.renderModal()}
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
        const { questionnaire } = this.state;
        return (
            <Card sx={{
                width: '40%',
                minHeight: 400,
                padding: 4,
                backgroundColor: '#e8eaf6'
            }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Form Preview
                </Typography>

                <Typography variant="h5" component="div">
                    Add Questions
                </Typography>

                {questionnaire.length <= 0
                    ? <Typography variant="body2">
                        When you start adding questions from + button, they will appear here.
                    </Typography>
                    : <>
                        {questionnaire.map((question, index) => {
                            return (
                                <Question
                                    key={index}
                                    data={question}
                                    lastIndex={questionnaire.length - 1 === index}
                                />
                            )
                        })}
                    </>}

                <Button
                    disabled={true}
                    type="submit"
                    fullWidth
                    variant="contained"
                    // sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    size="large"
                >
                    Submit
                </Button>
            </Card>
        )
    }//end

    renderModal = () => {
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

}//end class

export default CreateForm;