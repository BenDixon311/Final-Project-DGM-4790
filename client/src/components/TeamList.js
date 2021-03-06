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

const proxyurl = "https://cors-anywhere.herokuapp.com/";

class TeamList extends Component {

state = {
    playerData: []
}

    componentDidMount() {
        axios.get(proxyurl + 'https://restful-crud-node-server.herokuapp.com/team/' + this.props.match.params.team )
        .then(res => {
            const playerData = res.data;
            this.setState({ playerData })
        })
    }

    render() {
        return (
            <div style={rootStyle}>
                <Grid container spacing = {40}>
                
                { this.state.playerData.map(player =>
                    <Grid item xs={3}>
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
                                <Typography component = "h5">
                                    {player.number}
                                </Typography>
                                <Typography gutterBottom component="h5">
                                    {player.position}
                                </Typography>
                                <Typography component="h4">
                                    <Button
                                    variant="outlined"
                                    size="large"
                                    color="primary"
                                    fullWidth
                                    href={'/team/' + player.team}
                                    >{player.team}</Button>
                                </Typography>
                                
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button 
                            size="small" 
                            color="primary"
                            href={'/PlayerDetail/' + player.name}
                            >
                            Learn More
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

export default TeamList;