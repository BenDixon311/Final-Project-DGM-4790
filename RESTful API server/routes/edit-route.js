const express = require('express');
const playerController = require('../controllers/edit-player');

const router = express.Router();

router.get('/', playerController.getAllPlayers);

router.get('/name/:name', playerController.getOnePlayer);

router.get('/team/:team', playerController.getTeam);

router.put('/update/:id', playerController.updatePlayer);

router.delete('/delete/:id', playerController.deletePlayer);

router.post('/create', playerController.addPlayer);


module.exports = router;