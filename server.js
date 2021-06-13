// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
    let dateString = req.params.date;

    if (dateString == undefined) {
        const dateObject = new Date();
        var now = new Date;
        var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

        res.json({unix: dateObject.valueOf(), utc: utc_timestamp});
    } else {
        //A 4 digit number is a valid ISO-860if1 for the beginning of that year
        //5 digits or more must be a unix time, until we reach a year 10,000 problem
        if (/\d{5,}/.test(dateString)) {
            let dateInt = parseInt(dateString);
            //Date regards numbers as unix timestamps, strings are processed differently
            res.json({unix: dateInt, utc: new Date(dateInt).toUTCString()});
        } else {
            let dateObject = new Date(dateString);

            if (dateObject.toString() === "Invalid Date") {
                res.json({error: "Invalid Date"});
            } else {
                res.json({unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
            }
        }
    }

});


// listen for requests :)
const listener = app.listen(61784, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
