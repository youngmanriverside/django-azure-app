from django.shortcuts import render
from .forms import UploadVideoForm
import requests, json
import plotly.graph_objects as go

# Create your views here.
def analysis(request):
    if request.method == 'POST':
        # Send post request to https://wda-gemini-api.azurewebsites.net/video
        # with local video file example-1.mp4
        # Get the response from the API
        # Pass the response to the template

        # Get the video file from the form
        form = UploadVideoForm(request.POST, request.FILES)
        if form.is_valid():
            video_file = request.FILES['video_file']


            url = 'https://wda-gemini-api.azurewebsites.net/video'
            files = {
                'video': video_file,
                }
            response = requests.post(url, files=files)

            print(response.text)

            # convert response.text to json
            response = json.loads(response.text)
            

            radar_data = list()
            radar_data.append(response["動作"]["評分"])
            radar_data.append(response["台風"]["評分"])
            radar_data.append(response["情緒"]["評分"])
            radar_data.append(response["聲調"]["評分"])
            radar_data.append(response["表情"]["評分"])
            radar_data.append(response["言語"]["評分"])
            
            radar_index = ['動作', '台風', '情緒', '聲調', '表情', '言語']

            print(radar_data)
            print(radar_index)

            fig = go.Figure()
            
            # Draw radar chart
            fig.add_trace(go.Scatterpolar
            (
                r=radar_data,
                theta=radar_index,
                fill='toself',
            ))

            fig.update_layout(
                polar=dict(
                    radialaxis=dict(
                        visible=False,
                    )),
                showlegend=False,
                margin=dict(l=30, r=30, t=15, b=15),
                paper_bgcolor = '#4ecdc4',
                height=350,
                width=350
            )

            graph_json = fig.to_json()

            context = {
                'response': response, # response is a dictionary
                'graph_json': graph_json,
            }

            # Write the video file to the local directory staic/user/user.mp4
            with open('static/videos/user/user.mp4', 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)


            return render(request, 'analysis.html', context)
        
    form = UploadVideoForm()

    json_data = {
        "動作": {
            "評分": 0.5,
            "建議": "建議"
        },
        "台風": {
            "評分": 0.5,
            "建議": "建議"
        },
        "情緒": {
            "評分": 0.5,
            "建議": "建議"
        },
        "聲調": {
            "評分": 0.5,
            "建議": "建議"
        },
        "表情": {
            "評分": 0.5,
            "建議": "建議"
        },
        "言語": {
            "評分": 0.5,
            "建議": "建議"
        }
    }

    context = {
        'form': form,
        'json_data': json_data,
    }
    return render(request, 'analysis.html', context)


def interview(request):
    from .models import interview_question

    questions = interview_question.objects.all()

    # Get one question from questions randomly
    import random
    question = random.choice(questions).question

    print(question)

    context = {
        'question': question,
    }
    return render(request, 'interview.html', context)