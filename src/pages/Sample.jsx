import * as React from 'react';
import {
    Grid,
    Button
} from '@mui/material';
import { AppConsumer } from '../context/AppContext';

class MyForms extends React.Component {
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
                    //spacing={24}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12} >
                        <h1>MyForms</h1>
                     
                      
                    </Grid>
                </Grid>

            </div>
        )//end return
    }//end render
}//end class

export default MyForms;