import React, { Component } from 'react';
import axios from 'axios';



const proxyurl = "https://cors-anywhere.herokuapp.com/";

class HomeRest extends Component{
    state = {
        playerData: []
    }

    componentDidMount() {
        axios.get(proxyurl + 'https://restful-crud-node-server.herokuapp.com/')
            .then(res => {
                const playerData = res.data;
                this.setState({ playerData });
            })
    }


    render() {
        return (
            <div>
                <p>Hey whats up!</p>
                <ul>{ this.state.playerData.map(player => <li>Player Name: { player.name }</li>)}</ul>
            </div>
        )
    }
}

export default HomeRest;