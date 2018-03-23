/*
 *  LPIS ANMELDESKRIPT CHROME EXTENSION
 *
 *  --------------------------------------------------------------------------------
 *  TODO:
 *  FEATURES
 *  Open tabs with 1 lvNumber each from array (lvNumberActive)
 *  Auto registration with lvNumberActive
 *      chrome.storage.local.get only one from array and save it in lvNumberActive
 *      get server time for refresh
 *      have lvNumberActive displayed in <title>
 *
 *  AESTHETICS
 *  Make popup.html and popup.js something that was not hacked together in 5 minutes
 *  Improve documentation
 *  Ensure ES6 usage
 *  Prettify/Improve UX
 *  --------------------------------------------------------------------------------
 */


//Asynchronous calls to get user information and lvNumberActive from storage
//TODO: 1 lvNumber per tab -> lvNumberActive
chrome.storage.local.get('lvNumbers', function(result) {
    console.log('Initial LV numbers:');
    var output = result['lvNumbers'];
    console.log(output);


    chrome.storage.local.get('studentNumber', function(result) {
        console.log('Student Number:');
        var output = result['studentNumber'];
        console.log("h"+output);


        chrome.storage.local.get('studentPassword', function(result) {
            console.log('Student Password:');
            var output = result['studentPassword'];
            console.log(output);

            //runtime code goes here
            addCheckboxes();
            addSubmit();

        });
    });
});


//write to storage - ASYNC!
function chromeSet(key, value){

    chrome.storage.local.set({
        [key]:value
    }, function() {
        console.log('Output below saved to storage');
        console.log(value);
        chromeGet(key);
    });
}


//retrieve from storage - ASYNC!
function chromeGet(key){

    chrome.storage.local.get([key], function(result) {
            console.log('Output below retrieved from storage');
            var output = result[key];
            console.log(output);
        }
    );
}


//add checkboxes in each row and give onclick functionality
function addCheckboxes(){

    var td = document.querySelectorAll("[id^=SPAN]");
    for (var i = 0; i < td.length; i++){
        var element = document.createElement("input");
        element.setAttribute("value", "auto login");
        element.setAttribute("type", "checkbox");
        element.setAttribute("id", "cb"+i);
        element.onclick = checkBoxClick;
        td[i].parentNode.appendChild(element);
    }
}


//row color change functionality for checkboxes
function checkBoxClick(){

    var checkRow = this.parentNode.parentNode;

    //color blue not yet checked
    if(this.checked){checkRow.style.backgroundColor = 'powderBlue';}

    //check if grey or white and change back
    else {
        if (checkRow.className === "td1 "){checkRow.style.backgroundColor = '#FFFFFF';}
        else {checkRow.style.backgroundColor = '#F0F0F0';}
    }
}


//add submit button at the end of body and give onclick functionality
function addSubmit(){

    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Submit");
    element.onclick = submitClick;
    var tbl = document.querySelector("[class=b3k-data]");
    tbl.appendChild(element);
}

//saves ticked lvNumbers to storage
function submitClick(){

    var checkBoxes = document.querySelectorAll("[id^=cb]");
    var lvNumbers = [];

    for (var count = 0; checkBoxes.length > count; count++) {

        if (checkBoxes[count].checked) {
            var row = checkBoxes[count].parentNode.parentNode;
            var lvN = row.getElementsByTagName("a")[0].innerHTML;
            lvNumbers.push(lvN);
        }
    }

    chromeSet('lvNumbers', lvNumbers);
}


//gets the Servers Time (async is deprecated jQuery issue)
function getServerTime() {
    return $.ajax({async: false}).getResponseHeader( 'Date' );
}

/*
console.log('Server Time: ', getServerTime());
console.log('Locale Time: ', new Date(getServerTime()));

*/