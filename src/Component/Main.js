import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import sha256 from 'sha256';
import axios from 'axios';

import MobileAuth from './MobileAuth';
import ConfirmOtp from './ConfirmOtp';
import Dashboard from './Dashboard';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Registration', 'Verification', 'Find Slot'];

function getStepContent(step,mobile,handleMobileInput,handleOtpInput) {
    switch (step) {
        case 0:
            return <MobileAuth onMobileInput={handleMobileInput}/>;  
        case 1:
            return <ConfirmOtp mobile={mobile} onOtpInput={handleOtpInput}/>;
        case 2:
          return <Dashboard />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Main() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const [mobile, setMobile] = useState(null)
    const [txnId, setTxnId] = useState(null)
    const [otp, setOtp] = useState(null)
    const [token, setToken] = useState(null)
    
    const handleOtpInput = (otp) => {
        setOtp(sha256(otp))
    }
    const handleMobileInput = (mobile) => {
        setMobile(mobile)
    }
    const handleNext = () => {
        if (activeStep===0 && mobile !== null) {
            axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
                "mobile": mobile
            })
            .then(function (response) {
                setTxnId(response.data.txnId)
            })
            .catch(function (error) {
                console.error("error", error);
            });
        }
        if (activeStep===1 && otp !== null && txnId !== null){
            axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP', {
                "otp": otp,
                "txnId": txnId
            })
            .then(function (response) {
                setToken(response.data.token)
                console.log("response", response);
            })
            .catch(function (error) {
                console.error("eorror", error);
            });
        }
        // switch(activeStep){
        //     case 0:
                
        //         return ;  
        //     case 1:
                
        
        //         return ;
            // case 2:
            //     if(slotDate !== null && pinCode !== null){
            //         axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin', {
            //             params: {
            //                 pincode:110001,
            //                 date:'31-03-2021'
            //             }
            //           })
            //           .then(function (response) {
            //             console.log(response);
            //           })
            //           .catch(function (error) {
            //             console.error(error);
            //           })
            //     }
            //     return ;
            // default:
            //     throw new Error('Unknown step');
        // }
       
       
        setActiveStep(activeStep + 1);


    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        CoWin Clone
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep,mobile,handleMobileInput,handleOtpInput)}
                                <div className={classes.buttons}>
                                    {
                                        activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )
                                    }
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}