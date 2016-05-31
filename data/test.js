'use strict';

exports.GetUser = function (member,twitter){
    return new Promise((ok) => {
       ok({"Name": twitter, "Preview": twitter +"_test.jpg", "MediaId": null});
    });
};
exports.UploadImage = function(user) {
    return new Promise((ok,no) => {
        user.MediaId = "111111111111" + user.Preview;
        ok(user);
    });
};
exports.Tweet = function(status) {
    console.log('tweet sent')
};
