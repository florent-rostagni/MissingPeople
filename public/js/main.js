$(document).ready(function () {
    $.get('/chat/hello', function (res) {
        console.log(res);
        $("body").append("<p>" + res + "</p>");
    })
});