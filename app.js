var HTTP = require('node-rest-client').Client;
var Twitter = require('twitter');
var config = require('config');

const http = new HTTP();
const twitter = new Twitter(config.get('Twitter'));
const members = config.get('Twitch.members');

var args = {
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json"
    }
};

Promise.all(Object.keys(members).map((m) =>{
    return new Promise((ok) => {
        http.get(`https://api.twitch.tv/kraken/streams/${m}`,args,(data) => {
            ok(data.stream ? {
                "Name": members[m],
                "Preview": data.stream.preview.large
            } : null);
        })
    })
})).then((online) => {
    var any = online.filter(on => !!on);
    console.log(any);
    if (any.length) {
        UploadImages(any.map(on => on.Preview))
            .then(medias => {
                var twitters = any.reduce((o,k) => o + `${k.Name} `,'');
                var status = {
                    status: `These Girls on Fire are live right now! ${twitters}`,
                    media_ids: medias.reduce((o,k) => o + `${k.media_id_string},`, '')
                };
                console.log(status);
                twitter.post('statuses/update', status, (e,t) => {
                    if (!e) console.log(t);
                });
            });
    }
});
function UploadImages(previews) {
    return Promise.all(previews.map(p => new Promise((ok,no) => {
        http.get(p,data => {
            twitter.post('media/upload', {media: data}, (error, media) => {
                if(error) no();
                else ok(media);
            });
        })
    })));
}
