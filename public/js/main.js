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
        // $("body").append(html);
        appendReply(html);
        appendReply(query);
        // $("body").append("<p>" + query + "</p>");
                
    });
});

//create reply function that appends a div to the conversation window given a message
function appendReply(message) {
  $("#messaging").append("<row><div id='reply'>"+message+"</div></row>");
  var objDiv = document.getElementById("messaging");
  objDiv.scrollTop = objDiv.scrollHeight;
  //$("#conversationContainer").insertBefore( "<row><div id='reply'> Reply from farmer </div></row>" , $("#conversationContainer").firstChild);
};

//create reply function that appends a div to the conversation window given a message
function appendQuestion(message) {
  $("#messaging").append("<row><div id='question'>"+message+"</div></row>");
  var objDiv = document.getElementById("messaging");
  objDiv.scrollTop = objDiv.scrollHeight;
      //$('#conversationContainer').animate({ scrollBottom: $(document).height()-$(window).height() }, 500);
  //$("#conversationContainer").insertBefore( "<row><div id='reply'> Reply from farmer </div></row>" , $("#conversationContainer").firstChild);
};

