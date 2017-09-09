// create stream object
var Stream = function() {
    this.streamerName = "";
    this.game = "";
    this.viewers = 0;
    this.online = false;
    this.streamURL = "";
};
// streamer variables for their Stream object
var summit1g = new Stream();
var lirik = new Stream();
var cohhcarnage = new Stream();
var freecodecamp = new Stream();
var imaqtipe = new Stream();
var rocketleague = new Stream();
var omatum_greg = new Stream();
var noobs2ninjas = new Stream();
var drunkdevs = new Stream();

// don't forget - js arrays are c-b-r, so this works
var streamerList = [summit1g, lirik, cohhcarnage,
                    imaqtipe, freecodecamp, rocketleague,
                    omatum_greg, noobs2ninjas, drunkdevs];
// used for the Stream.streamerName value and for apiURL
var streamerNames = ["summit1g", "LIRIK", "CohhCarnage",
                     "imaqtpie", "FreeCodeCamp", "RocketLeague",
                     "Omatum_Greg", "noobs2ninjas", "drunkdevs"];
// set the corresponding streamer names
for (var i = 0; i < streamerList.length; i++) {
    streamerList[i].streamerName = streamerNames[i];
}

var apiURL = "https://wind-bow.glitch.me/twitch-api/streams/";

$(document).ready(function () {
    if (getStreamData()) {
        // TODO
    }
});

/*
Iterate over streamerNames list and append the name to the API url.
get the JSON-data for every name and fill in the variables of each stream object.
 */
function getStreamData() {
    for (var i = 0; i < streamerList.length; i++) {
        (function (i) {
            var streamerApiURL = apiURL + streamerNames[i];
            $.getJSON(streamerApiURL, function(data) {
                if (data.stream !== null) { // streamer is online, so populate metadata
                    streamerList[i].game = data.stream.game;
                    streamerList[i].online = true;
                    streamerList[i].viewers = data.stream.viewers;
                    streamerList[i].streamURL = data.stream.channel.url;
                    console.log(streamerList[i].streamerName + ", " +
                        streamerList[i].game + ", " +
                        streamerList[i].viewers + ", " +
                        streamerList[i].streamURL);
                }
            });
        })(i);
    }
    return true; // in order to check if function is finished
}