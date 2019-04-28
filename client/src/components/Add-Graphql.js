import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';


const options = [
    {
      value: 'true',
      label: 'Personal Project'
    },
    {
      value: 'false',
      label: 'Team Project'
    }
  ];
  
  const devOptions = [
    {
      value: 'FRONT_END',
      label: 'Front End'
    },
    {
      value: 'BACK_END',
      label: 'Back End'
    },
    {
      value: 'DESIGN',
      label: 'Design'
    },
    {
      value: 'FULL_STACK',
      label: 'Full Stack'
    }
  ]

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


class AddGraphql extends Component{

  state = {
    open: false,
    imgurl: '',
    title: '',
    description: '',
    solo: true,
    devtype: 'BACK_END', //this is dummy data, I had an error when it was just an empty string ''
  
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  redirect = () => {
    window.location = "/"
  }

    
    render() {
        const { classes } = this.props;


        const CREATE_PROJECT = gql`
            mutation {
                createProject(
                    title: "${this.state.title}"
                    description: "${this.state.description}"
                    devtype: ${this.state.devtype}
                    solo: ${this.state.solo}
                    imgurl: "${this.state.imgurl}"
                ) {
                    title
                }
            }
        `

        return (
            <div style={rootStyle}>
                <h1>Add Project</h1>
                <form className = {classes.container} noValidate autoComplete="off">
                    <TextField 
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                        required
                        fullWidth
                        label="Title"
                        className={classes.textField}
                        type="text"
                        name="title"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                     value={this.state.description}
                     onChange = {this.handleChange('description')}
                        required
                        fullWidth
                        label="Description"
                        className={classes.textField}
                        type="text"
                        name="description"
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                    value={this.state.solo}
                    onChange = {this.handleChange('solo')}
                       select
                       required
                       fullWidth
                       label="Personal or Team Project?"
                       className={classes.textField}
                       margin="normal"
                       variant="filled"
                    >
                    {options.map(option => (
                                 <MenuItem key={option.value} value={option.value}>
                                   {option.label}
                                </MenuItem>
                                    ))}
                    </TextField>
                    <TextField 
                    select
                    value={this.state.devtype}
                    onChange = {this.handleChange('devtype')}
                        required
                        fullWidth
                        label="Development Type"
                        className={classes.textField}
                        type="text"
                        name="devtype"
                        margin="normal"
                        variant="filled"
                    >
                    {devOptions.map(option => (
                        <MenuItem key={option.value} value = {option.value}>
                          {option.label}
                        </MenuItem>
                         ))}
                    </TextField>
                    <TextField 
                    value={this.state.imgurl}
                    onChange = {this.handleChange('imgurl')}
                        required
                        fullWidth
                        label="Image URL"
                        className={classes.textField}
                        type="url"
                        name="imgurl"
                        margin="normal"
                        variant="filled"
                    />
                         <Mutation
                            mutation = {CREATE_PROJECT}
                            onCompleted = {() => this.redirect()}
                        >
                    {CreateProject => (
                        <Button 
                                            
                            variant="contained" 
                            color="default" 
                            className={classes.button}
                            onClick = {() => CreateProject()}
                                            
                        >
                        Submit       
                        </Button>
                        )}
                        </Mutation>
                                          
                </form>
            </div>
        )
    }
}

AddGraphql.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddGraphql);