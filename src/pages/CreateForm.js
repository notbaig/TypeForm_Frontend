import * as React from 'react';
import {
    Box,
    Paper,
    Grid,
    Item,
    Button
} from '@mui/material';
import { AppConsumer } from '../context/AppContext';

class CreateForm extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //console.log('u -> ', this.props.user);
    }

    render() {
        return (
            <div style={{
                padding: 16
            }}>
                <Grid
                    container
                    // spacing={24}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12} >
                        <h1>Create a New Form</h1>
                    </Grid>
                </Grid>

            </div>
        )//end return
    }//end render

}//end class

export default CreateForm;