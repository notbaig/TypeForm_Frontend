import * as React from 'react';
import {
    Typography,
    Divider,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
} from '@mui/material';

const Question = ({ data, lastIndex }) => {
    return (
        <>
            <Typography
                variant="body2"
                style={{ marginTop: 16 }}
            >
                {data.lablel}
            </Typography>

            {data.type === 'INPUT'
                ? <>
                    <TextField
                        disabled={true}
                        variant="outlined"
                        label={data.lablel}
                        placeholder="e.g: What is your favouraite color?"
                        fullWidth={true}
                        autoFocus={true}
                        style={{ marginBottom: 16 }}
                        multiline={data.subType === 'MULTILINE' ? true : false}
                        rows={data.subType === 'MULTILINE' ? 4 : 1}
                    />
                </>
                : data.type === 'RADIO'
                    ? <>
                        <FormControl
                            disabled={true}
                            style={{
                                marginLeft: 16,
                                marginRight: 16,
                                marginBottom: 16
                            }}>
                            <RadioGroup>
                                {data.options.map((option, index) => {
                                    return (
                                        <FormControlLabel
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </>
                    : null
            }
            {!lastIndex && <Divider />}
        </>
    )
}

export default Question;