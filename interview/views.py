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


            url = 'https://wda-gemini-api.azurewebsites.net/video'
            files = {
                'video': video_file,
                }
            response = requests.post(url, files=files)

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