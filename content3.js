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
  //      element.submitForm = td[i];
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


function submitClick() {

    var checkBoxes = document.querySelectorAll("[id^=cb]");
    var rowsClicked = [];

for (var count = 0; checkBoxes.length > count; count++){

    if (checkBoxes[count].checked) {
        rowsClicked.push(checkBoxes[count].parentNode.parentNode);
    }




}

function chromeSet(){
    chrome.storage.local.set({
        list:rowsClicked
    }, function() {
        console.log("added to list");
    });
}


function chromeGet(){
    chrome.storage.local.get({
        list:[] //put defaultvalues if any
    }, function(data) {
            console.log(data.list.innerHTML);
        }
    );
}

    /*



    chrome.storage.local.set({'row': banana}, function() {
        // banana save notification
        // console.log('Banana saved');
    });

    chrome.storage.local.get('color', function(result) {
        var bananaColor = result.color;
        window.alert(bananaColor);
    });

    */

}