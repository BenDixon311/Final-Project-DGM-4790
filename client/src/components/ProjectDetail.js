import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const cardStyle= {
    maxWidth: 345,
    maxHeight: 1000
}

const cardMediaStyle = {
    height: 260
}

const rootStyle = {
    flexGrow: 1,
    padding: 20
    
}

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

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: 'white',
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },

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


class ProjectDetail extends Component {

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

      //THIS ALSO FILLS THE INITIAL STATE DATA - probably bad practice.
    handleOpen(imgurl, title, description, solo, devtype) {
        this.setState({ open: true, imgurl: imgurl, title: title, description: description, solo: solo, devtype: devtype });
        console.log(this.state.devtype, this.state.solo);
        
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };

    redirect = () => {
      window.location = "/HomeGraphql"
    }

    render() {
        const { classes } = this.props;

        const QUERY = gql`
        query {
            project(projectId: "${this.props.match.params.id}") {
              id
              title
              description
              solo
              devtype
              imgurl
            }
          } 
        `

        const UPDATE_MUTATION = gql`
        mutation {
          updateProject(id: "${this.props.match.params.id}",
           title: "${this.state.title}"
           description: "${this.state.description}"
           devtype: ${this.state.devtype}
           solo: ${this.state.solo}
           imgurl: "${this.state.imgurl}"
           
           ){
             title
             description
             devtype
             solo
             imgurl
           }
         }
        `

        const DELETE_MUTATION = gql`
        mutation {
          deleteProject(id: "${this.props.match.params.id}"){
            id
            title
          }
        }
        `


        return (
            <Query query={QUERY}>
                {({ loading, error, data }) => {
                 if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;
                

          return (
                <div style = {rootStyle}>
                <Grid container spacing = {40}
                    justify="center"
                    alignItems="center"
                >
                
                    
                    <Grid item xs={3}>
                        <Card style={cardStyle}>
                        <CardActionArea>
                            <CardMedia
                            style={cardMediaStyle}
                            image={data.project.imgurl}
                            title={data.project.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    {data.project.title}
                                </Typography>
                                <Typography component="h4">
                                    {data.project.description}
                                </Typography>
                                <Typography component="h5">
                                    {data.project.solo === true && (
                                      <p>Personal Project</p>
                                    )}
                                    {data.project.solo === false && (
                                      <p>Team Project</p>
                                    )}
                                </Typography>
                                <Typography component="h4">
                                    {data.project.devtype} Project
                                </Typography>

                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                    
                        <Button
                            size="small"
                            color="primary"
                            onClick = {() => this.handleOpen(data.project.imgurl, data.project.title, data.project.description, data.project.solo, data.project.devtype)}
                            >
                            UPDATE
                        </Button>
                     
                        <Mutation
                          mutation = {DELETE_MUTATION}
                          onCompleted = {() => this.redirect()}
                          >
                            {DeleteProject => (
                                  <Button 
                                  onClick = {() => DeleteProject()}
                                  size="small" 
                                  color="secondary"
                                  >
                                  DELETE
                                  </Button>
                                  
                                  )}
                        </Mutation>
                        
                            <Modal
                                aria-labelledby="update-form-title"
                                aria-describedby="update-form-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                            <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="h6" id="update-form-title">
                                   Update 
                                </Typography>
                                <Typography>

                                
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
                                                select
                                                value={this.state.solo}
                                                onChange = {this.handleChange('solo')}
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
                                          mutation = {UPDATE_MUTATION}
                                          onCompleted = {() => this.redirect()}
                                           >
                                            {UpdateProject => (
                                            <Button 
                                            
                                            variant="contained" 
                                            color="default" 
                                            className={classes.button}
                                            onClick = {() => UpdateProject()}
                                            
                                            >
                                                    Submit       
                                            </Button>
                                             )}
                                            </Mutation>
                                          
                                        </form>
                                         
                                        
                                </Typography>
                            </div>

                            </Modal>
                            
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                
                    <Button
                      color="primary"
                      size="large"
                      href={'/DevType/' + data.project.devtype}
                    >
                    View all {data.project.devtype} projects?

                    </Button>
                </Grid>
</Grid>
                </div>
          )
                }
            }
            </Query>
            
        )
    }
}


ProjectDetail.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(ProjectDetail);