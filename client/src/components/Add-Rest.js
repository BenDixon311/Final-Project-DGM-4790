import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
      },
    leftIcon: {
        marginRight: theme.spacing.unit,
      },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
    iconSmall: {
        fontSize: 20,
      },
  });

  const rootStyle = {

    padding: 20
}



class AddRest extends Component{

  redirect = (e) => {
    window.location = "/";
    e.preventDefault();
  }

  state = {
    isDisabled: false,
    name: '',
    number: 0,
    position: '',
    team: '',
    imgurl: ''
  }

    
    render() {
       

        const { classes } = this.props;
        return (
            <div style={rootStyle}>
              <h1>Add NBA Player</h1>
                <form className = {classes.container} noValidate autoComplete="off" action = "https://restful-crud-node-server.herokuapp.com/create" method = "POST">
                  
                    <TextField 
                        required
                        fullWidth
                        label="Name"
                        className={classes.textField}
                        type="text"
                        name="name"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Number"
                        className={classes.textField}
                        type="number"
                        name="number"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Team"
                        className={classes.textField}
                        type="text"
                        name="team"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Position"
                        className={classes.textField}
                        type="text"
                        name="position"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Image URL"
                        className={classes.textField}
                        type="url"
                        name="imgurl"
                        margin="normal"
                        variant="filled"
                    />

                    <Button 
                    type = "submit" 
                    variant="contained" 
                    color="default" 
                    className={classes.button}
                    onSubmit= {() => this.redirect()}
                    
                    >
                            Submit       
                    </Button>
                </form>
            </div>
        )
    }
}

AddRest.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddRest);