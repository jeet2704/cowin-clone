import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      paddingTop: '20px',
    },
  }));
  

export default function MobileAuth(props) {
const classes = useStyles();
const changeHandler = (e) => {
  props.onMobileInput(e.target.value)
}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register or SignIn for Vaccination
      </Typography>
      <Typography gutterBottom>
        An OTP will be sent to your mobile number for verification
      </Typography>
      <Grid container spacing={3} className={classes.mainGrid}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="mobileNumber"
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            autoComplete="given-name"
            onChange={changeHandler}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}