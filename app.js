var Client = require('node-rest-client').Client;

var client = new Client();

const members = {
    "YellowKillerBee": "@yellowkillerbee",
    "KungFuFruitCup": "@kungfufruitcup",
    "AverageTrey" : "@AverageTrey"
};

var args = {
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json"
    }
};

Object.keys(members).forEach((m) => {
    client.get(`https://api.twitch.tv/kraken/streams/${m}`, args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
    });
});
