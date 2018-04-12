var banana = "yellow";

chrome.storage.local.set({'color': banana}, function() {
    // banana save notification
    // console.log('Banana saved');
});

chrome.storage.local.get('color', function(result) {
    var bananaColor = result.color;
    window.alert(bananaColor);
});

