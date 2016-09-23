'use strict';
var HTTP = require('node-rest-client').Client;
var Twitter = require('twitter');
var config = require('config');

const http = new HTTP();
const twitter = new Twitter(config.get('Twitter'));
const clientId =  config.get('Twitch.clientId')
var args = {
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json",
		"Client-ID": clientId
    }
};
exports.GetUser = function (member,twitter){
    return new Promise((ok) => {
        http.get(`https://api.twitch.tv/kraken/streams/${member}`, args, (data) => {
            ok(data.stream ? {
                "Name": twitter,
                "Preview": data.stream.preview.large,
                "MediaId": null
            } : null);
        });
    });
};
exports.UploadImage = function(user) {
    return new Promise((ok,no) => {
        http.get(user.Preview,data => {
            twitter.post('media/upload', {media: data}, (error, media) => {
                if(error) no();
                else {
                    user.MediaId = media.media_id_string;
                    ok(user);
                }
            });
        });
    });
};
exports.Tweet = function(status) {
    twitter.post('statuses/update', status, (e,t) => {
        if (!e) console.log(t);
    });
};
