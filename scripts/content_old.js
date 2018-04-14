var lvNumberActive = sessionStorage.getItem("lvStorage");
;

var td = document.querySelectorAll("[id^=SPAN]");
for (var i = 0; i < td.length; i++)
{
    var element = document.createElement("input");
    element.setAttribute("value", "auto login");
    element.setAttribute("type", "button");
    element.setAttribute("id", "alb");
    element.style = "background-color:powderblue;";
    element.onclick = autoLoginInit;
    element.submitForm = td[i];
    td[i].parentNode.appendChild(element);
}



//if document is ready
$( document ).ready(function() {

    //loop all lvNr & check if it's on page
    for (var i = 0; i < lvNr.length; i++) {

        //display lvNr
        log("LV " + lvNr[i]);

        //row with lvNr in it
        var lvRow = $("tr:contains(" + lvNr[i] + ")");

        //if there is lvNr on page
        if (lvRow.length > 0) {

            //displays green line
            $( ".yui-skin-sam" ).before('<div style="background-color:green;padding:10px;">LV ' + lvNr[i] + ' -> CORRECT PAGE - leave this tab open</div>' );

            //form with "anmelden" button
            var lvRegisterForm = lvRow[0].getElementsByClassName("action")[0].getElementsByTagName('form')[0];

            //save button in variable
            var button = lvRegisterForm[lvRegisterForm.length - 1];

            //check if Button is disabled
            if (button.disabled === true)
            {
                log("button disabled");

            }
            else
            {
                //in case of WARTELISTE
                if(button.value == 'cancel' || button.value == 'austragen')
                {
                    log('cancel');
                    $( ".yui-skin-sam" ).before('<div style="background-color:red;padding:10px;">LV ' + lvNr[i] + ' -> you are on the waiting list... i am sorry</div>' );
                }
                else
                {
                    lvRegisterForm.submit();
                    log("button enabled & clicked");
                }
            }
        }
        else
        {
            log("wrong page!");

            $( ".yui-skin-sam" ).before('<div style="background-color:red;padding:10px;">LV ' + lvNr[i] + ' -> INCORRECT PAGE - <a href="EA?R=322245" target="_blank"><button>new tab to search LV</button></a></div>' );
        }
    }
});


/*
Here the script redirects you to the loginpage and then signs you in with your password and matrikelnummer
*/

//redirect to LPIS if you are on logged out page
if (window.location.href == "https://www.wu.ac.at/studierende/tools-services/lpis/" || window.location.href == "https://www.wu.ac.at/en/students/tools-services/lpis/") window.location.href = "https://lpis.wu.ac.at/lpis/";

//Login
var loginForm = document.getElementById("login");
if (loginForm) {
    var matrNr = $("[accesskey*='u']")[0];
    matrNr.value = matrikelnumber;

    var pw = $("[accesskey*='p']")[0];
    pw.value = password;

    var loginButton = $("[value*='Login'],[value*='login']")[0];
    loginButton.click();
}











function autoLoginInit() {
    lvNumberActive = this.submitForm.parentNode.parentNode.querySelector("a").textContent;
    sessionStorage.setItem("lvStorage", submitFormActive);
    //set registration time
    regTimeActive = this.submitForm.parentNode.getElementsByTagName("span")[0].innerHTML.slice(-5).substring(0, 2);
    //set active


    //display values for testing
    //console.log(submitButtonActive, submitFormActive, lvNumberActive, regTimeActive, alActive);


    //remove autoLogin buttons
    var alButtons = document.querySelectorAll("[id^=alb]");
    for (var i = 0; i < alButtons.length; i++) {
        alButtons[i].remove()
    }

    //display lv Number in title
    changeTitle("autoLogin " + lvNumberActive);


    //display active text next to button
    var activeText = document.createElement("p");
    activeText.style = "color: green; background-color:powderblue;"; //TODO: use stylesheet
    activeText.innerHTML =
        "Auto-login active, do not close this tab!" +
        "<br><br>" +
        "If you want to register for another course, please " +
        "<a target=\"_blank\" href=\"https://www.w3schools.com\">open a new tab</a>.";  //TODO: add correct URL
    this.submitForm.parentNode.appendChild(activeText);

    //add cancel button
    var cancelButton = document.createElement("input");
    cancelButton.setAttribute("value", "cancel");
    cancelButton.setAttribute("type", "button");
    cancelButton.onclick = cancel;
    activeText.appendChild(cancelButton);


}

function cancel()
{
    window.setTimeout(window.location.reload.bind(window.location), 10);
    lvNumberActive = "";
    sessionStorage.clear();

    //display values for testing
    //console.log(submitButtonActive, submitFormActive, lvNumberActive, regTimeActive, alActive);
}

function changeTitle(titleText)
{
    var title = document.querySelector("title");
    title.innerHTML = titleText;
}