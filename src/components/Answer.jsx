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

const Answer = ({ data, lastIndex, onEvent }) => {
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
                        variant="outlined"
                        //label={data.lablel}
                        //placeholder="e.g: What is your favouraite color?"
                        placeholder={data.lablel}
                        fullWidth={true}
                        //autoFocus={true}
                        style={{ marginBottom: 16 }}
                        multiline={data.subType === 'MULTILINE' ? true : false}
                        rows={data.subType === 'MULTILINE' ? 4 : 1}
                        value={data.answer}
                        //onChange={(e) => onEvent(e.target.value, data.type, data.answer)}
                        onChange={(e) => onEvent(e.target.value)}
                    />
                </>
                : data.type === 'RADIO'
                    ? <>
                        <FormControl
                            style={{
                                marginLeft: 16,
                                marginRight: 16,
                                marginBottom: 16
                            }}>
                            <RadioGroup
                                value={data.answer}
                                onChange={(e) => onEvent(e.target.value)}
                            >
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

export default Answer;