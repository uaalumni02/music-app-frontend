var express = require('express');
var ejs = require('ejs');
var axios = require('axios');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/', (req, res) => {
    var artistname = req.body.artistname;
    var requestUrl = 'http://localhost:3000/api/music/search/:Name?q=' + artistname + '&limit=5';
    console.log(artistname);
    // 

});

app.get('/music', (req, res) => {
    var getURL = 'http://localhost:3000/api/music';
    return axios.get(getURL)
        .then(function (response) {
            var responseData = response.data;
            console.log(responseData)
            return res.status(200)
            .render('searchResults', { response: responseData });
                // .json(response.data);
        })
        .catch(function (error) {
            //console.log(error);
        });
    // Get all the music in the server and return them

});

app.get('/addmusic', (req, res) => {
    res.render('addArtist')
})

//get artist by id
app.get('/music/:id', (req, res) => {
    var getID = req.params.id;
    var getURL = 'http://localhost:3000/api/music/' + getID;
    return axios.get(getURL)
        .then(function (response) {
            var responseData = response.data;
            return res.status(200)
            .render('searchResults', { response: responseData });
            // .json(response.data);
            
        })
        .catch(function (error) {
           
        });
    

});

app.listen(8080, () => console.log('live on 8080'));