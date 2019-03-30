const Player = require('../models/player');

exports.addPlayer = (req, res, next) => {
    const name = req.body.name;
    const number = req.body.number;
    const team = req.body.team;
    const position = req.body.position;
    const player = new Player({ name: name, number: number, team: team, position: position });

    player
        .save()
        .then(result => {
            res.status(201).redirect('/');
            console.log('Player Created');
            
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOnePlayer = (req, res, next) => {
    const player = req.params.name;

    Player.find({
        name: player
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getTeam = (req, res, next) => {
    const teamName = req.params.team;

    Player.find({
        team: teamName
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getAllPlayers = async (req, res, next) => {
    try {
        const allPlayers = await Player.find()

        res.send(allPlayers);
    }
    catch(err) {
        console.log(err);
    }
};

exports.updatePlayer = (req, res, next) => {

    Player.findByIdAndUpdate(req.params.id,
        {$set: req.body}
    )
    .then(result => {
        res.status(200)
            .send('Updated Player')
    })
    .catch(err => {
        console.log(err);
    })
}

exports.deletePlayer = (req, res, next) => {
    const playerId = req.params.id;

    Player.findByIdAndDelete(playerId)
    .then(result => {
        res.status(200)
            .send({
                confirmation: 'Player Deleted'
            })
    })
    .catch(err => {
        console.log(err);
    })
}