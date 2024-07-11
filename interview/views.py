from django.shortcuts import render
from .forms import UploadVideoForm
import requests, json
from .graph import plot

# Create your views here.
def analysis(request):
    form = UploadVideoForm()
    if request.method == 'POST':

        # Get the video file from the form
        form = UploadVideoForm(request.POST, request.FILES)
        if form.is_valid():
            video_file = request.FILES['video_file']

            prompt = '''
                1. 請針對面試者下列的表現做出評分(1-10分):
                - 視覺評價: 臉部情緒特徵、肢體動作、眼神交流、微笑是否自然、衣著整潔等。
                - 言語內容: 1. 言語用字: 是否得體、2. 表達邏輯: 是否清晰、通順，抑或前後矛盾。
                - 聽覺評價: 1.語速: 是否太快/太慢、2. 聲調: 是否沉穩/太高/太低、3. 言語和聲紋: 能否展現自信、大方、好相處的態度，抑或畏縮、沒自信。
                
                2. 請列出面試者的優點、缺點、整體表現、改進建議。
                請以繁體中文及json格式呈現回答。
            '''

            url = 'https://wda-gemini-api.azurewebsites.net/video'
            files = {
                'video': video_file,
                }
            data = {
                'prompt': prompt,
            }
            response = requests.post(url, files=files, data=data)

            if response.status_code == 200:                
                # convert response.text to json
                response_json = json.loads(response.text)

                print(response_json)
                
                fig = plot(response_json)

                graph_json = fig.to_json()

                context = {
                    'response_json': response_json, # response is a dictionary
                    'graph_json': graph_json,
                }

                # Write the video file to the local directory staic/user/user.mp4
                with open('static/videos/user/user.mp4', 'wb+') as destination:
                    for chunk in video_file.chunks():
                        destination.write(chunk)

                return render(request, 'analysis.html', context)
            else:
                context = {
                    'form': form,
                    'error': 'Error occurs when uploading the video file. Please try again later.'
                }
                return render(request, 'analysis.html', context)
        

    context = {
        'form': form,
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