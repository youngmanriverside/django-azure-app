$(document).ready(function() {
    // get context from analysis.html
    var response = $("#video-analysis-response").text();
    
    console.log(typeof(response));
    // variable to store the scores in json format
    var scores = {
        '動作': 0,
        '台風': 0,
        '情緒': 0,
        '聲調': 0,
        '表情': 0,
        '言語': 0,
        '總結建議': ''
    };

    // scores['動作'] += response.動作.評分
    // scores['台風'] += response.台風.評分
    // scores['情緒'] += response.情緒.評分
    // scores['聲調'] += response.聲調.評分
    // scores['表情'] += response.表情.評分
    // scores['言語'] += response.言語.評分
    // scores['總結建議'] = response.總結建議

    

    // console.log(scores);

});