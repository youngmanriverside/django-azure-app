function plotGraph(response_json) {
    
    console.log(response_json)

    // Replace ' with " in response_json
    response_json = response_json.replace(/'/g, '"')

    // Convert response_json to dictionary
    response_json = JSON.parse(response_json)

    // Data for radar charts
    auditory_categories = ["言語和聲紋", "語速", "音調"]
    auditory_values = [response_json["聽覺評價"]["言語和聲紋"], response_json["聽覺評價"]["語速"], response_json["聽覺評價"]["音調"]]

    visual_categories = ["眼神交流", "微笑是否自然", "肢體動作", "臉部情緒特徵", "衣著整潔"]
    visual_values = [response_json["視覺評價"]["眼神交流"], response_json["視覺評價"]["微笑是否自然"], response_json["視覺評價"]["肢體動作"], response_json["視覺評價"]["臉部情緒特徵"], response_json["視覺評價"]["衣著整潔"]]

    console.log(auditory_values)
    console.log(visual_values)
    // Plot radar charts for auditory and visual evaluation
    var data_auditory = [{
        type: 'scatterpolar',
        r: auditory_values,
        theta: auditory_categories,
        fill: 'toself',
        name: 'Auditory Evaluation'
    }];

    var data_visual = [{
        type: 'scatterpolar',
        r: visual_values,
        theta: visual_categories,
        fill: 'toself',
        name: 'Visual Evaluation'
    }];

    layout = {
        paper_bgcolor: 'rgba(255, 87, 51, 0)',
        polar: {
            radialaxis: {
              visible: false,
              range: [0, 100]
            },
            angularaxis: {
                visible: true,
                direction: "clockwise",
                period: 5
            }
        },
        width: 450,
        height: 350,
        margin: {
            l: 30,
            r: 30,
            b: 30,
            t: 30,
            pad: 4
        }, 
        title: {
            x: 0.5,
            xanchor: 'center',
        }
    }

    Plotly.newPlot('graph_auditory', data_auditory, layout);
    Plotly.newPlot('graph_visual', data_visual, layout);
}
