addCheckboxes();


function addCheckboxes()
{
    var td = document.querySelectorAll("[id^=SPAN]");
    for (var i = 0; i < td.length; i++)
    {
        var element = document.createElement("input");
        element.setAttribute("value", "auto login");
        element.setAttribute("type", "checkbox");
        element.setAttribute("id", "al"+i);
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

// function for submitbutton