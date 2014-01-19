console.log('CONTENT SCRIPT LOADED');

function privMessage(user, target) {
    // var urlParams = window.location.split('/');
    // console.log(urlParams)
    //var urlParams = window.location.href.split('/');


}
function setHandlers() {
    $("body .gi-color").on('click',function(){
       privMessage(me, el.someExt);
    });
}
function createChat(room) {
    // Create a new instance of the Chat widget
    var chat = new goinstant.widgets.Chat({
        room: room
    });

    // Initialize the Chat widget
    chat.initialize(function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
        $('.gi-chat').each(function(index){
            var width = 275;
            $(this).css('margin-right', width*(index+1));
        });
        console.log('created chat for room');
        console.log(room);
    });
}
function createUserList(room,side) {
    // Create a new instance of the UserList widget
    var userList = new goinstant.widgets.UserList({
        room: room,
        collapsed: false,
        position: side,
        userOptions: true,
        avatars: true
    });

    // Initialize the UserList widget
    userList.initialize(function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
        // Now it should render on the page with any connected users

        console.log('created user list for room');
        console.log(room);
    });
}
function connect(service, chan, side) {
    var url = 'https://goinstant.net/androolloyd/back-seat-gamer';
    
    //var urlParams = window.location.split('/');
    //
    // Connect to GoInstant
    goinstant.connect(url, function(err, platformObj, roomObj) {
        if (err) {
            console.log(err);
            throw err;
        }
        var serviceRoom = service + "-" + chan;
        var room = platformObj.room(serviceRoom);
        // join room and initialize the chat
        room.join(function(err, yourRoom, userData) {
            if (err) {
                console.log("Error joining room:", err);
                // Failed to join room; clean up or retry.
                return;
            }
            createChat(room);
            createUserList(room,side);
        });
    });
}
window.addEventListener("load", function() {

    var twitchUsername = window.location.pathname.replace('/', '');
    console.log('detected twitch username: ' + twitchUsername);

    connect("twitch",twitchUsername,"right");
//    connect("twitch","riotgames","left");
//    //connect("twitch","kaostv","left");

});






