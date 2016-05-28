var TTV = require('node-rest-client').Client;
var Twitter = require('twitter');

const ttv = new TTV();
const twitter = new Twitter();

const members = {
    "YellowKillerBee": "@yellowkillerbee",
    "KungFuFruitCup": "@kungfufruitcup",
    "MissKaddyKins" : "@misskaddykins"
};

var args = {
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json"
    }
};

Promise.all(Object.keys(members).map((m) =>{
    return new Promise((ok) => {
        ttv.get(`https://api.twitch.tv/kraken/streams/${m}`,args,(data) => {
            ok(data.stream ? {
                "Name": members[m],
                "Preview": data.stream.preview.large
            } : null);
        })
    })
})).then((online) => {
    var any = online.filter(on => !!on);
    if (any.length) {
        var twitters = any.reduce((o,k) => o + `${k.Name} `,'');
        var links = any.reduce((o,k) => o + `${k.Preview} `,'');
        console.log(`These Girls on Fire are live right now! ${twitters} ${links}`);
    }
});
