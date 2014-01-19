chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id, {action:'logo-clicked'}, function(){
        // message sent
        console.log('message sent to tab ' + tab.id);
    })
});