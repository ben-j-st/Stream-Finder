import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textColor: {
        color: "black",
    }
}));


function InputField(props) {
    const {name, label, value, onChange, required, error=null, autoFocus, type} = props
    const classes = useStyles();

    return (
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
                className:classes.textColor
            }}
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            

            {...(required) && {required}}
            {...(autoFocus) && {autoFocus}}
            {...(type) && {type: "Password"}}
            {...(error && {error: true,helperText:error})}
        />
    )
}

export default InputField