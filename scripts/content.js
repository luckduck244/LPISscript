/*
 *  --------------------------------------------------------------------------------
 *  TODO:
 *  FEATURES
 *  ###Open tabs with 1 lvNumber each from array (lvNumberActive)
 *  Auto registration with lvNumberActive
 *      chrome.storage.local.get only one from array and save it in lvNumberActive
 *      get server time for refresh (else: compare server time to local once)
 *      ###have lvNumberActive displayed in <title>
 *
 *  AESTHETICS
 *  Make popup.html and popup.js something that was not hacked together in 5 minutes
 *  Improve documentation
 *  Ensure ES6 usage
 *  Prettify/Improve UX
 *  --------------------------------------------------------------------------------
 */


if (window.location.href.charAt(window.location.href.length-5) === "?"){
    lvNumberActive = window.location.href.substr(window.location.href.length - 4);
    let emoji = "🦆";
    document.title = emoji + " LV reg: "+lvNumberActive;
}
else {lvNumberActive = "";}

chrome.storage.local.get('studentNumber', function(result) {
    console.log('Student Number:');
    let output = result['studentNumber'];
    console.log("h"+output);


    chrome.storage.local.get('studentPassword', function(result) {
        console.log('Student Password:');
        let output = result['studentPassword'];
        console.log(output);

            chrome.storage.local.get('lvNumbers', function(result) {
                console.log('Initial LV numbers:');
                let output = result['lvNumbers'];
                console.log(output);

                //runtime code goes here
                addCheckboxes();
                addSubmit();


                //clicks inital lvNumbers
                let lvLinks = document.querySelector("[class=b3k-data]").querySelectorAll("a");

                for (let i = 0; output.length > i; i++) {

                    for (let j = 0; lvLinks.length > j; j++) {
                        if (lvLinks[j].textContent === output[i]) {
                            let checkedRow = lvLinks[j].parentNode.parentNode;

                            console.log(checkedRow.querySelector("[id^=cb]"));
                            checkedRow.querySelector("[id^=cb]").click();
                        }

                    }
                }




                //select row from lvNumberActive
                for (let i = 0; lvLinks.length > i; i++){
                    if (lvLinks[i].textContent === lvNumberActive)
                        {
                            console.log(lvLinks[i].parentNode.parentNode); //row with lvNumberActive
                        }

                }



                console.log("active lv: "+lvNumberActive);





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
            let output = result[key];
            console.log(output);
        }
    );
}


//add checkboxes in each row and give onclick functionality
function addCheckboxes(){

    let td = document.querySelectorAll("[id^=SPAN]");
    for (let i = 0; i < td.length; i++){
        let element = document.createElement("input");
        element.setAttribute("value", "auto login");
        element.setAttribute("type", "checkbox");
        element.setAttribute("id", "cb"+i);
        element.onclick = checkBoxClick;
        td[i].parentNode.appendChild(element);
    }
}


//row color change functionality for checkboxes
function checkBoxClick(){

    let checkRow = this.parentNode.parentNode;

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

    let element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Submit");
    element.onclick = submitClick;
    let tbl = document.querySelector("[class=b3k-data]");
    if (document.querySelectorAll("[id^=cb]").length > 0){
        //prevents button from being displayed on login page - UGLY
        tbl.appendChild(element);}
}

//saves ticked lvNumbers to storage
function submitClick(){

    let checkBoxes = document.querySelectorAll("[id^=cb]");
    let lvNumbers = [];

    for (let i = 0; checkBoxes.length > i; i++) {

        if (checkBoxes[i].checked) {
            let row = checkBoxes[i].parentNode.parentNode;
            let lvN = row.getElementsByTagName("a")[0].innerHTML;
            lvNumbers.push(lvN);
        }
    }

    openTabs(lvNumbers);

    chromeSet('lvNumbers', lvNumbers);
}

function openTabs(lvN){


    for (let i = 0; lvN.length > i; i++){
    chrome.runtime.sendMessage("newTab"+window.location.href+"?"+lvN[i]);
    }

}




/*FETCH SERVER TIME

//gets the Servers Time (async is deprecated jQuery issue)
function getServerTime() {
    return $.ajax({async: false}).getResponseHeader( 'Date' );
}


console.log('Server Time: ', getServerTime());
console.log('Locale Time: ', new Date(getServerTime()));

*/
