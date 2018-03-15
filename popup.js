document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("popupSubmit").onclick = yolo;


    chromeGet();

});


function chromeGet(){
    chrome.storage.local.get(['lvNumbers'], function(result) {
            var output = result['lvNumbers'];

            document.getElementById("lvNumbers").innerHTML += "Active Registrations: <br>";
            for (var i = 0; output.length > i; i++){
                document.getElementById("lvNumbers").innerHTML += output[i] + "<br>";
            }
        }
    );
}

function yolo(){

    /*
    {
        var elements = document.getElementById("popupForm").elements;
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }

        document.body.innerHTML += JSON.stringify(obj);
    }
    */

    var elements = document.getElementById("popupForm").elements;
    var studentName = elements[0].value;
    var studentPassword = elements[1].value;

    chromeSet('studentName', studentName);
    chromeSet('studentPassword', studentPassword);

}

function chromeSet(key, value){
    chrome.storage.local.set({
        [key]:value
    }, function() {

       // chromeGetty(key);

    });
}

/*
function chromeGetty(key){
    chrome.storage.local.get(key, function(result) {
            var output = result[key];
            }
    );
}
*/