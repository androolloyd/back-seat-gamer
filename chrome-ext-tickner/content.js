console.log('CONTENT SCRIPT LOADED');

window.addEventListener("load", function() {

    var url = 'https://goinstant.net/androolloyd/back-seat-gamer';
    var site = null;
    var siteRoom = null;
    var giRoom = null;
    switch (window.location.hostname) {
        case 'twitch.tv':
        case 'www.twitch.tv':
        case 'back-seat-gamer.herokuapp.com':
            site = 'twitch';
            siteRoom = window.location.pathname.replace('/', '');
            giRoom = site + '-' + siteRoom;
            break;
    }
    console.log(giRoom);

    console.log(goinstant);

    // Connect to GoInstant
    goinstant.connect(url, function(err, platformObj, roomObj) {
        if (err) {
            console.log(err);
            throw err;
        }

        var room = platformObj.room(giRoom);

        // join room and initialize the chat
        room.join(function(err, yourRoom, userData) {
            if (err) {
                console.log("Error joining room:", err);
                // Failed to join room; clean up or retry.
                return;
            }

            console.log(room);

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
            });



            //
            // NOTIFICATIONS
            //
            // Create a new instance of the Notifications widget
            var notifications = new goinstant.widgets.Notifications();

            // Get all notifications
            notifications.subscribe(room, function(err) {
                if (err) {
                    throw err;
                }
                // We're now receiving notifications
                console.log('setup to receive notifications')
            });

            var sendNotification = function(){
                // Set options for the notification we're about to publish
                var options = {
                    room: room,
                    type: 'success',
                    message: 'Success: Message delivered',
                    displayToSelf: true
                };

                // Send a single notification
                notifications.publish(options, function(err) {
                    if (err) {
                        throw err;
                    }
                    // Notification has been sent
                });
            }





            // Create a new instance of the UserList widget
            var userList = new goinstant.widgets.UserList({
                room: room,
                collapsed: false,
                position: 'right'
            });

            // Initialize the UserList widget
            userList.initialize(function(err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                // Now it should render on the page with any connected users

                $(function(){
                    $('.gi-color').click(function(){
                        console.log('clicked');
                        sendNotification();
                    });
                });
            });


        });

    });
});


