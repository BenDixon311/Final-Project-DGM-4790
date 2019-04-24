import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

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

  function formSubmit(id) {
       var action_src = "https://restful-crud-node-server.herokuapp.com/update/" + id;
       var form = document.getElementById('update-form');
       form.action = action_src;
    }   

class PlayerDetail extends Component {
    state = {
        playerData: [],
        open: false,
        name: '',
        number: 0,
        team: '',
        position: '',
        imgurl: '',
        _id: '',
        
    }

  

    
    
    handleOpen = () => {
        this.setState({ open: true });
        
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
    deletePlayer(id) {
        axios.delete(proxyurl + 'https://restful-crud-node-server.herokuapp.com/delete/' + id)
            .then(res => {
                window.location.reload();
            })
    }

    updatePlayer(id) {
        axios.put(proxyurl + 'https://restful-crud-node-server.herokuapp.com/update/' + id, {
            name: this.state.name,
            number: this.state.number,
            team: this.state.team,
            position: this.state.position,
            imgurl: this.state.imgurl
        }).then(res => {
            window.location.reload();
        });

       
    }

    componentDidMount() {
        axios.get(proxyurl + 'https://restful-crud-node-server.herokuapp.com/name/' + this.props.match.params.name )
            .then(res => {
                const playerData = res.data;
                this.setState({ _id: playerData[0]._id, name: playerData[0].name, number: playerData[0].number, team: playerData[0].team, position: playerData[0].position, imgurl: playerData[0].imgurl });
            })

            
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
      };



    render() {
        const { classes } = this.props;
        return (
           
            <div>
                
                <Grid>
                    
                        
                    <Grid item xs ={6}>
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardMedia
                            style={cardMediaStyle}
                            image={this.state.imgurl}
                            title={this.state.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    {this.state.name}
                                </Typography>
                                <Typography component="h4">
                                    {this.state.team}
                                </Typography>
                                <Typography component="h5">
                                    {this.state.position}
                                </Typography>

                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button 
                            onClick = {() => {this.deletePlayer(this.state._id)}}
                            size="small" 
                            color="primary"
                            >
                            DELETE
                            </Button>

                            <Button
                            onClick = {this.handleOpen}
                            >
                            UPDATE
                            </Button>
                            <Modal
                                aria-labelledby="update-form-title"
                                aria-describedby="update-form-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                            <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="h6" id="update-form-title">
                                   Update {this.state.name} 
                                </Typography>
                                <Typography>
                                        <form className = {classes.container} noValidate autoComplete="off" action = {this.state.url}  method = "POST">
                                            
                                            <TextField 
                                                value={this.state.name}
                                                onChange={this.handleChange('name')}
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
                                                value={this.state.number}
                                                onChange = {this.handleChange('number')}
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
                                                value={this.state.team}
                                                onChange = {this.handleChange('team')}
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
                                                value={this.state.position}
                                                onChange = {this.handleChange('position')}
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

                                            <Button 
                                            type = "button" 
                                            variant="contained" 
                                            color="default" 
                                            className={classes.button}
                                            onClick = {() => {this.updatePlayer(this.state._id)}}
                                            
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

PlayerDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

const PlayerDetailWrapped = withStyles(styles)(PlayerDetail);

export default PlayerDetailWrapped;