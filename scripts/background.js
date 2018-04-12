chrome.runtime.onMessage.addListener(function(message){

    if (message.indexOf("newTab") !== -1){
        let url = message.replace('newTab','');
        chrome.tabs.create({ url: url, active: false });


    }

});