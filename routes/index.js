const express = require('express');
const router = express.Router();

/* GET  => Great number game home page. */

router.get('/', (request, response) => {
    console.log('getting to index.....');
    if(!request.session.number){
        request.session.number = Math.floor(Math.random() * 100 + 1);
    }
    if(!request.session.guess){
        var guess = 'none';
    }
    else if(request.session.guess < request.session.number){
        var guess = 'low';
    }
    else if(request.session.guess > request.session.number){
        var guess = 'high';
    }
    else if(request.session.guess == request.session.number){
        var guess = 'correct';
    }
    response.render('index', { status: guess, guessed: request.session.guess, title: 'Great Number Game' });
});

router.post('/guess', (request, response) => {
    console.log('posting a guess to the game.....');
    request.session.guess = request.body.guessValue;
    response.redirect('/');
});

router.post('/reset', (request, response) => {
    console.log('resetting the session information for the game.....');
    // request.session.number = Math.floor(Math.random() * 100 + 1);
    request.session.destroy();
    response.redirect('/');
});

module.exports = router;