import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core/';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ColorizeIcon from '@material-ui/icons/Colorize';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [slotDate, setSlotDate] = useState(null)
  const [pinCode, setPinCode] = useState(null)
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    setSlotDate(today)
  }, [])

  const dateChangeHandler = (e) => {
    let today = new Date(e.target.value);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    setSlotDate(today)
  }
  const pinChangeHandler = (e) => {
    setPinCode(e.target.value)
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const clickHandler = () => {
    pinCode !== null &&
      axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin', {
        params: {
          pincode: pinCode,
          date: slotDate
        }
      })
      .then(function (response) {
        setSessions(response.data.sessions)
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  }

  function SlotsList() {
    const listItem = sessions!==null && sessions.map((session,i)=>
        <Grid item xs={12} md={6} key={i}>
        <Card className={classes.root}>
          <CardHeader
            title={session.name}
            subheader={<Chip
              label={session.vaccine}
              color="primary"
            />}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {
                session.address+", "+session.district_name+", "+session.state_name+", "+session.pincode
              }
            </Typography>
          </CardContent>
          <CardActions >
            {
              session.available_capacity === 0 ? 
              <Button variant="contained" color="secondary">
                Booked
              </Button> : 
              <Button variant="contained" color="primary" href="#">
                Book Now
              </Button>
            }
            <Button variant="contained" disabled>{session.min_age_limit+"+"}</Button>
            <Button variant="contained" disabled>{session.fee == 0 ? session.fee_type : session.fee}</Button>
         
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            {/* <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton> */}
          </CardActions>
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse> */}
        </Card>
      </Grid>
    )
      
    return listItem
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Find Slots
      </Typography>
      <Typography gutterBottom>
        You can find slots by Pincode
      </Typography>
      <Grid container spacing={3} className={classes.mainGrid}>
        <Grid item xs={12} md={6}>
          <TextField
            id="date"
            label="Slot Date"
            type="date"
            defaultValue={slotDate && slotDate.toString()}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={dateChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            required
            label="Pincode"
            fullWidth
            onChange={pinChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button color="primary" variant="outlined" fullWidth onClick={clickHandler}>Find Slots</Button>
        </Grid>
        <SlotsList />
      </Grid>
    </React.Fragment>
  );
}