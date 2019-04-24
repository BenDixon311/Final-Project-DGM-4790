import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  }; 

function Header(props) {
  
  const { classes } = props;

        return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                API FUNTIME
              </Typography>
              <Button color="inherit" href={'/'}>REST API Home</Button>
              <Button color="inherit" href={'/AddRest'}>REST API Add</Button>
              <Button color="inherit" href={'/HomeGraphql'}>GraphQL Home</Button>
              <Button color="inherit" href={'/AddGraphql'}>GraphQL Add</Button>
            </Toolbar>
          </AppBar>
        </div>
        )
    }

  

  Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Header);