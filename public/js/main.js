$(document).ready(function () {
   // $.get('/chat/hello', function (res) {
   //     console.log(res);
   //     $("body").append("<p>" + res + "</p>");
   // })

    //append image
    $("#camera").click(function() {
        //file loacted images/pgtips.jpg

        var html = '<img src="images/pgtips.jpg" class="convo-image"/>';
        var query = "This is PG Tips, Raspberry, 40 bags. £3.49";
        $("body").append(html);
        $("body").append("<p>" + query + "</p>");
                
    });
});