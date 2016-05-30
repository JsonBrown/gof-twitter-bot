'use strict';
var HTTP = require('node-rest-client').Client;
var Twitter = require('twitter');
var config = require('config');

const http = new HTTP();
const twitter = new Twitter(config.get('Twitter'));
var args = {
    headers: {
        "Accept": "application/vnd.twitchtv.v3+json"
    }
};
exports.tell = {
    "GetUser": function (member){
        return new Promise((ok) => {
            http.get(`https://api.twitch.tv/kraken/streams/${m}`, args, (data) => {
                ok(data.stream ? {
                    "Name": members[m],
                    "Preview": data.stream.preview.large
                } : null);
            });
        });
    },
    "UploadImage": function(image) {
        return new Promise((ok,no) => {
            http.get(image,data => {
                twitter.post('media/upload', {media: data}, (error, media) => {
                    if(error) no();
                    else ok(media);
                });
            });
        });
    },
    "Tweet": function(status) {
        twitter.post('statuses/update', status, (e,t) => {
            if (!e) console.log(t);
        });
    }
};
