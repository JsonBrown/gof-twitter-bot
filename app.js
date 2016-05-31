var config = require('config');
var data = require('./data/web');
const members = config.get('Twitch.members');

Promise.all(Object.keys(members).map((m) => data.GetUser(m,members[m])))
    .then((users) => {
        var any = users.filter(online => !!online);
        if (any.length) {
            console.log(any);
            for(var i = 0; i < any.length; i=i+4) {
                Promise.all(any.slice(i, (i+4 > any.length) ? any.length : i+4).map(user => data.UploadImage(user)))
                .then((users) => Publish(users));
            }
        }
    });
function Publish(any) {
    var twitters = any.reduce((o,k) => o + `${k.Name} `,'');
    var status = {
        status: `These Girls on Fire are live right now! ${twitters}`,
        media_ids: any.reduce((o,k) => o + `${k.MediaId},`, '')
    };
    console.log(status);
    data.Tweet(status);
}
