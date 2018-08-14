/*
 *  --------------------------------------------------------------------------------
 *  TODO:
 *  FEATURES
 *  ###Open tabs with 1 lvNumber each from array (lvNumberActive)
 *  Auto registration with lvNumberActive
 *      chrome.storage.local.get only one from array and save it in lvNumberActive
 *      get server time for refresh (else: compare server time to local once)
 *      ###have lvNumberActive displayed in <title>
 *  Add urls to chrome.storage.local
 *  pass LVs to popup & open tabs after popup click
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
                if (output) {
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
                    for (let i = 0; lvLinks.length > i; i++) {
                        if (lvLinks[i].textContent === lvNumberActive) {
                            console.log(lvLinks[i].parentNode.parentNode); //row with lvNumberActive
                        }

                    }

                    if (lvNumberActive) {

                        console.log("active lv: "+lvNumberActive);
                        register(lvNumberActive);

                    }
                }




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


function register(lvNr) {

    //finetuneing: how many milliseconds earlier should it start?
    var startTimeMilliseconds = 200; //ms

    //row with lvNr in it
    var lvRow = $("tr:contains(" + lvNr + ")");

    //if there is lvNr on page
    if (lvRow.length > 0) {
        //form with "anmelden" button
        var lvRegisterForm = lvRow[0].getElementsByClassName("action")[0].getElementsByTagName('form')[0];

        //set startTimeHour
        var startTimeHour = lvRow[0].querySelector("[class=timestamp]").querySelectorAll("span")[0].innerHTML.split(" ")[2].split(":")[0];

        //anmelden button
        var button = lvRegisterForm[lvRegisterForm.length - 1];

        //displays green line
        $( ".yui-skin-sam" ).before('<div style="background-color:green;padding:10px;"> 🐝 LV ' + lvNr + ' -> CORRECT PAGE - leave this tab open it will refresh at ' +  startTimeHour + ' o&apos;clock</div>' );

        //check if Button is disabled
        if (button.disabled === true)
        {
            console.log("button disabled");

        }
        else
        {
            //in case of WARTELISTE
            if(button.value == 'cancel' || button.value == 'austragen')
            {
                console.log('cancel');
                $( ".yui-skin-sam" ).before('<div style="background-color:red;padding:10px;"> 🐝 LV ' + lvNr + ' -> you are on the waiting list... i am sorry</div>' );
            }
            else
            {
                lvRegisterForm.submit();
                console.log("button enabled & clicked");
            }
        }
        
        //Will refresh the page
        refreshAt(18 - 1, 50, 59, 1000 - startTimeMilliseconds);
        
    }
    else
    {
        console.log("wrong page!");

        $( ".yui-skin-sam" ).before('<div style="background-color:red;padding:10px;"> 🐝 LV ' + lvNr + ' -> INCORRECT PAGE - <a href="EA?R=322245" target="_blank"><button>new tab to search LV</button></a></div>' );
    }
}

//function to refresh the page at given time
    function refreshAt(hours, minutes, seconds, milliseconds) {
        var now = new Date();
        var then = new Date();

        if(now.getHours() > hours ||
            (now.getHours() == hours && now.getMinutes() > minutes) ||
            now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() > seconds ||
            now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() == seconds && now.getMilliseconds() >= milliseconds) {
            then.setDate(now.getDate() + 1);
        }
        then.setHours(hours);
        then.setMinutes(minutes);
        then.setSeconds(seconds);
        then.setMilliseconds(milliseconds);

        var timeout = (then.getTime() - now.getTime());
        setTimeout(function() { window.location.reload(true); }, timeout);
    }




/*FETCH SERVER TIME

//gets the Servers Time (async is deprecated jQuery issue)
function getServerTime() {
    return $.ajax({async: false}).getResponseHeader( 'Date' );
}


console.log('Server Time: ', getServerTime());
console.log('Locale Time: ', new Date(getServerTime()));

*/
