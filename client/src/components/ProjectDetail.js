import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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


const cardStyle= {
    maxWidth: 345,
    maxHeight: 500
}

const cardMediaStyle = {
    height: 260
}

const rootStyle = {
    flexGrow: 1
}

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
        solo: '',
        devtype: ''
    }

    //TODO: this isn't finished yet
    updateState(imgurl, title, description, solo, devtype) {
            this.setState({})
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
      };

    handleOpen = () => {
        this.setState({ open: true });
        
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };

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


        return (
            <Query query={QUERY}>
                {({ loading, error, data }) => {
                 if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;

          return (
                <div style = {rootStyle}>
                <Grid container spacing = {40}>
                
                {this.updateState(data.project.imgurl, data.project.title, data.project.description, data.project.solo, data.project.devtype)}
               
                    
                    <Grid item xs={10}>
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
                                    {data.project.solo}
                                </Typography>

                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                        <Button
                            
                            size="small"
                            color="primary"
                            onClick = {this.handleOpen}
                            >
                            UPDATE
                            </Button>

                            <Button 
                            //onClick = {() => {this.deletePlayer(this.state._id)}}
                            size="small" 
                            color="secondary"
                            >
                            DELETE
                            </Button>

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
                                        <form className = {classes.container} noValidate autoComplete="off" action = {this.state.url}  method = "POST">
                                            
                                            <TextField 
                                                //value={this.state.name}
                                               // onChange={this.handleChange('name')}
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
                                                //value={this.state.number}
                                                //onChange = {this.handleChange('number')}
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
                                               // value={this.state.team}
                                               // onChange = {this.handleChange('team')}
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
                                                //value={this.state.position}
                                               // onChange = {this.handleChange('position')}
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
                                               // value={this.state.imgurl}
                                                //onChange = {this.handleChange('imgurl')}
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
                                            type = "button" 
                                            variant="contained" 
                                            color="default" 
                                            className={classes.button}
                                            //onClick = {() => {this.updatePlayer(this.state._id)}}
                                            
                                            >
                                                    Submit       
                                            </Button>
                                        </form>
                                </Typography>
                            </div>

                            </Modal>
                        </CardActions>
                    </Card>
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