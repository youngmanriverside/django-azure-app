import plotly.graph_objects as go

def plot(response_json):
    hearing_score = list()
    vision_score = list()
    content_score = list()
    try:
        hearing_score.append(response_json['聽覺評價']['聲調'])
        hearing_score.append(response_json['聽覺評價']['言語和聲紋'])
        hearing_score.append(response_json['聽覺評價']['語速'])

        vision_score.append(response_json['視覺評價']['微笑是否自然'])
        vision_score.append(response_json['視覺評價']['眼神交流'])
        vision_score.append(response_json['視覺評價']['肢體動作'])
        vision_score.append(response_json['視覺評價']['臉部情緒特徵'])
        vision_score.append(response_json['視覺評價']['衣著整潔'])

        content_score.append(response_json['言語內容']['前後矛盾'])
        content_score.append(response_json['言語內容']['表達邏輯'])
        content_score.append(response_json['言語內容']['言語用字'])
    except KeyError:
        print('KeyError occurs when parsing response')

    # Draw bar chart for hearing_score, vision_score, and content_score separately
    fig = go.Figure()
    fig.add_trace(go.Bar(x=['聲調', '言語和聲紋', '語速'], y=hearing_score, name='聽覺評價'))
    fig.add_trace(go.Bar(x=['微笑是否自然', '眼神交流', '肢體動作', '臉部情緒特徵', '衣著整潔'], y=vision_score, name='視覺評價'))
    fig.add_trace(go.Bar(x=['前後矛盾', '表達邏輯', '言語用字'], y=content_score, name='言語內容'))

    fig.update_layout(
        barmode='group',
        title='評價分數',
        xaxis_title='評價項目',
        yaxis_title='分數',
        width=500)


    return fig

