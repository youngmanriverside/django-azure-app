$(function(){
    $("#submitmsg").click(chatWithLLM);
    $("#usermsg").keypress(function(e){
        if(e.which == 13){
            chatWithLLM();
        }
    });
});

function chatWithLLM(){
    var usermsg = $("#usermsg").val();
    $("#chatbox").append("我 : "+usermsg+"\n");
    var data = {
        usermsg: usermsg
    };
    // $.ajax(
    //     {
    //         url: "http://127.0.0.1:5000/call_llm",
    //         type: 'POST',
    //         data: JSON.stringify(data),
    //         contentType: 'application/json',
    //         Headers: {
    //             'Access-Control-Allow-Origin': '*'
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             $("#chatbox").append("AI : "+data+"\n");
    //             //make teacher scroll to the bottom
    //             $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    //         },
    //     }
    // )
    $.post("https://wda-gemini-api.azurewebsites.net/call_llm", data, function(data){
        $("#chatbox").append("AI : "+data+"\n");
        //make teacher scroll to the bottom
        $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    });
    $("#usermsg").val("");
    //make teacher scroll to the bottom
    $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
}