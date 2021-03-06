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
    getStreamData();
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
                streamerList[i].streamURL = "https://twitch.tv/" + streamerNames[i];
                if (data.stream !== null) { // streamer is online, so populate metadata
                    streamerList[i].game = data.stream.game;
                    streamerList[i].online = true;
                    streamerList[i].viewers = data.stream.viewers;
                    console.log(streamerList[i].streamerName + ", " +
                        streamerList[i].game + ", " +
                        streamerList[i].viewers + ", " +
                        streamerList[i].streamURL);
                }
            }).done(function () {
                populateAndRender(i);
            });
        })(i);
    }
    return true;
}

function populateAndRender(index) {
    var html = "";
    if (streamerList[index].online) {
        html += "<div class='col-md-12 col-lg-4'>" +
                    "<a class='stream-link' href="+ streamerList[index].streamURL +" target='_blank'><div class='stream-box'>" +
                        "<h4 class='stream-box-streamer text-center'>" + streamerList[index].streamerName + "</h4>" +
                        "<h5 class='stream-box-status text-center'>" + streamerList[index].game + "</h5>" +
                        "<div class='stream-info'>" +
                            "<div class='live-icon live-icon-online'></div>" +
                            "<h6>" + streamerList[index].viewers + " watching </h6>" +
                        "</div>" +
                    "</div></a>" +
                "</div>";
    } else {
        html += "<div class='col-md-12 col-lg-4'>" +
                    "<a class='stream-link' href="+ streamerList[index].streamURL +" target='_blank'><div class='stream-box'>" +
                        "<h4 class='stream-box-streamer text-center'>" + streamerList[index].streamerName + "</h4>" +
                        "<h5 class='stream-box-status text-center'>Offline</h5>" +
                        "<div class='stream-info'>" +
                            "<div class='live-icon live-icon-offline'></div>" +
                        "</div>" +
                    "</div></a>" +
                "</div>";
    }
    if (index <= 2) {
        $("#list_of_streams-1").append(html);
    } else if (index <= 5) {
        $("#list_of_streams-2").append(html);
    } else $("#list_of_streams-3").append(html);

    // create hover animations for the newly added stream-box
    $(".stream-box").hover(function() {
        // entering the area
        $(this).css({
            "background-color": "rgba(12, 12, 12, 0.3)"
        }, 100);

    }, function () {
        // leaving the area
        $(this).css({
            "background-color": "inherit"
        }, 100);
    });
    $(".stream-link").css({"text-decoration":"none"});
}