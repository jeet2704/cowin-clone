import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        paddingTop: '20px',
    },
}));
export default function ConfirmOtp(props) {
    const classes = useStyles();
    const changeHandler = (e) => {
        props.onOtpInput(e.target.value)
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                OTP Verification
            </Typography>
            <Typography gutterBottom>
                An OTP has been sent to {props.mobile}
            </Typography>
            <Grid container spacing={3} className={classes.mainGrid}>
                <Grid item xs={12} md={12}>
                    <TextField
                        type="number"
                        required
                        label="OTP"
                        fullWidth
                        onChange={changeHandler}
                    />
                </Grid>
            </Grid>
            <Typography gutterBottom className={classes.mainGrid}> 
                here might be some delay in receiving the OTP due to heavy traffic
                verify and proceed
            </Typography>
        </React.Fragment>
    );
}