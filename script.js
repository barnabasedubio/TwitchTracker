var listOfStreamers =
    ["summit1g", "lirik", "cohhcarnage",
    "freecodecamp", "imaqtpie", "rocketleague",
    "shlorox", "noobs2ninjas", "drunkdevs"];

var streamernames = [];

var apiURL = "https://wind-bow.glitch.me/twitch-api/streams/";
var streamData;
var testURL = apiURL + "lirik";

$(document).ready(function () {
    console.log("url: " + testURL);
    $.getJSON(testURL, function (data) {
        //console.log(data);
        lirik = data;
        console.log(lirik.stream.game);
    });
});

function getStreamData() {
    
}