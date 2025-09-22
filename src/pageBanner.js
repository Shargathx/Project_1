const fs = require("fs");
const path = require("path");

const currentUrl = function () {
    // liidame kättesaamatu piltide kausta veebi failidega
    let bannerPath = path.join(__dirname, "images");
    fs.readFile(bannerPath + currentUrl.pathname, (err, data) => {
        if (err) {
            throw (err);
        }
        else {
            res.writeHead(200, { "Content-type": "image/jpeg" });
            res.end(data);
        }
    });
}
res.end("Viga 404, ei leia sellist lehte!");


module.exports = { pageBanner };