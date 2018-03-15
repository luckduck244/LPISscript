chrome.storage.local.get('lvNumbers', function(result) {
    console.log('Initial LV numbers:');
    var output = result['lvNumbers'];
    console.log(output);


chrome.storage.local.get('studentName', function(result) {
    console.log('Student Number:');
    var output = result['studentName'];
    console.log("h"+output);

    chrome.storage.local.get('studentPassword', function(result) {
        console.log('Student Password:');
        var output = result['studentPassword'];
        console.log(output);


addCheckboxes();
submitAdd();




function addCheckboxes()
{
    var td = document.querySelectorAll("[id^=SPAN]");
    for (var i = 0; i < td.length; i++)
    {
        var element = document.createElement("input");
        element.setAttribute("value", "auto login");
        element.setAttribute("type", "checkbox");
        element.setAttribute("id", "cb"+i);
        element.onclick = checkBox;
        td[i].parentNode.appendChild(element);
    }
}

function checkBox()

{
    var checkRow = this.parentNode.parentNode;

    //color blue not yet checked
    if(this.checked){checkRow.style.backgroundColor = 'powderBlue';}

    //check if grey or white and change back
    else {
        if (checkRow.className === "td1 "){checkRow.style.backgroundColor = '#FFFFFF';}
        else {checkRow.style.backgroundColor = '#F0F0F0';}
    }
}

function submitAdd() {

    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Submit");
    element.onclick = submitClick;
    document.body.appendChild(element);

}





    });
});
});

    function submitClick() {

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

    function chromeSet(key, value){
        chrome.storage.local.set({
            [key]:value
        }, function() {
            console.log('Output below saved to storage');
            console.log(value);
            chromeGet(key);
        });
    }


    function chromeGet(key){
        chrome.storage.local.get([key], function(result) {
                console.log('Output below retrieved from storage');
                var output = result[key];
                console.log(output);
            }
        );
    }

    function getServerTime() {
  return $.ajax({async: false}).getResponseHeader( 'Date' );
}
console.log('Server Time: ', getServerTime());
console.log('Locale Time: ', new Date(getServerTime()));
