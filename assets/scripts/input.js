$(document).ready(function(){
    // prevent letters from being typed into editable content
    $("#change").keypress(function(e) {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    });
})