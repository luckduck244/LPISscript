//on popup load
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("popupSubmit").onclick = popupSubmit;

        displayActive();

});


//Displays currently active lvNumbers
function displayActive(){
    chrome.storage.local.get(['lvNumbers'], function(result) {
            var output = result['lvNumbers'];

            document.getElementById("lvNumbers").innerHTML += "Active Registrations: <br>";
            for (var i = 0; output.length > i; i++){
                document.getElementById("lvNumbers").innerHTML += output[i] + "<br>";
            }
        }
    );
}


//takes form value and writes it to storage
function popupSubmit(){

    var elements = document.getElementById("popupForm").elements;
    var studentNumber = elements[0].value;
    var studentPassword = elements[1].value;

    chromeSet('studentNumber', studentNumber);
    chromeSet('studentPassword', studentPassword);
}


function chromeSet(key, value){

    chrome.storage.local.set({
        [key]:value
    }, function() {

    });
}