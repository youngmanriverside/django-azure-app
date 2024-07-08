from django.shortcuts import render, redirect
from .forms import plans_filter_form, UploadVideoForm
from employee.models import Employee, employee_current, employee_identity
from employer.models import Employer
from plan.models import plan_employee, plan_employee_details
import requests, os, json, tempfile
import plotly.graph_objects as go
from google.cloud import speech

def transcribe(request):
    if request.method == 'POST':
        audio_file = request.FILES['audio_file']        
        
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=True) as tmp_file:
            for chunk in audio_file.chunks():
                tmp_file.write(chunk)

            tmp_file.flush()
            with open(tmp_file.name, "rb") as file_for_transcription:
                content = file_for_transcription.read()
                print(file_for_transcription)

                # Save the audio file to the local directory
                with open('static/audio/test.webm', 'wb+') as destination:
                    for chunk in audio_file.chunks():
                        destination.write(chunk)
                

                    #setting Google credential
                    os.environ['GOOGLE_APPLICATION_CREDENTIALS']= 'google_secret_key.json'
                    # create client instance 
                    client = speech.SpeechClient()

                    audio = speech.RecognitionAudio(content=content)

                    config = speech.RecognitionConfig(
                        enable_automatic_punctuation=True,
                        # audio_channel_count=2,
                        language_code="en-US",
                    )

                    # Sends the request to google to transcribe the audio
                    response = client.recognize(request={"config": config, "audio": audio})
                    
                    print(response)
                    print(response.results)

                    transcript = ", ".join([result.alternatives[0].transcript for result in response.results])
                    print(transcript)
                


    return render(request, 'transcribe.html', {"Good": "Good"})

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


def benefit(request):
    if request.method == 'POST':
        type = request.POST.get('type')
        if type == '民眾':
            # Get the employee object
            name = request.POST.get('employee')
            if not name:
                return redirect('/benefit')
            employee = Employee.objects.get(name=name)
            employee_current_list = list(employee_current.objects.values_list('current_status', flat=True).filter(employee_name=employee))
            employee_identity_list = list(employee_identity.objects.values_list('identity', flat=True).filter(employee_name=employee))

            # Get the plan_employee object
            # Filter the plan_employee object by current_status list, gender and age
            plan_employee_list1 = plan_employee.objects.filter(required_employee_current__in=employee_current_list)
            
            if employee.gender == '男':
                plan_employee_list1 = plan_employee_list1.exclude(required_employee_gender='女')
            
            plan_employee_list1 = plan_employee_list1.filter(employee_age_lower_bound__lte=employee.age)
            plan_employee_list1 = plan_employee_list1.filter(employee_age_upper_bound__gte=employee.age)

            # Filter the plan_employee object by identity list

            # Concatenate the plan_employee objects

            # Get the plan_employee_details object
            # Filter the plan_employee_details object by plan_employee object
            all_plan_employee_details_list = plan_employee_details.objects.all()

            context = {
                'employee': employee,
                'employee_current_list': employee_current_list,
                'employee_identity_list': employee_identity_list,
                'plan_employee_list1': plan_employee_list1,
                'all_plan_employee_details_list': all_plan_employee_details_list,
            }

            return render(request, 'benefit.html', context)
        
        elif type == '雇主':
            name = request.POST.get('employer')
            if not name:
                return redirect('/benefit')
            employer = Employer.objects.get(name=name)



            context = {
                'employer': employer,
            }

            return render(request, 'benefit.html', context)

    user_qurey_form = plans_filter_form()

    context = {
        'user_qurey_form': user_qurey_form,
    }

    return render(request, 'benefit.html', context)


def home(request):
    return render(request, 'home.html')

def interview(request):
    return render(request, 'interview.html')

def demo(request):
    return render(request, 'demo.html')

def chatbot(request):
    return render(request, 'chatbot.html')

def home2(request):
    return render(request, 'home2.html')