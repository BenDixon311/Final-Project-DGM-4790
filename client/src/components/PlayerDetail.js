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



class PlayerDetail extends Component {
    state = {
        playerData: [],
    }

    
    deletePlayer(id) {
        axios.delete(proxyurl + 'https://restful-crud-node-server.herokuapp.com/delete/' + id)
            .then(res => {
                window.location.reload();
            })
    }

    componentDidMount() {
        axios.get(proxyurl + 'https://restful-crud-node-server.herokuapp.com/name/' + this.props.match.params.name )
            .then(res => {
                const playerData = res.data;
                this.setState({ playerData });
                
            })
    }


    render() {
        return (
           
            <div>
                
                <Grid>
                    {this.state.playerData.map(player => 
                    <Grid item xs ={6}>
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardMedia
                            style={cardMediaStyle}
                            image={player.imgurl}
                            title={player.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    {player.name}
                                </Typography>
                                <Typography component="h4">
                                    {player.team}
                                </Typography>
                                <Typography component="h5">
                                    {player.position}
                                </Typography>

                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button 
                            onClick = {() => {this.deletePlayer(player._id)}}
                            size="small" 
                            color="primary"
                            >
                            DELETE
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                    )}
                </Grid>

            </div>
        )
    }
}


export default PlayerDetail;