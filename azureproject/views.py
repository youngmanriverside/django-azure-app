from django.shortcuts import render, redirect, HttpResponse
from .forms import plans_filter_form
from employee.models import Employee, employee_current, employee_identity
from plan.models import plan_employee, plan_employee_details
import os, json, tempfile
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
                    
                    # print(response)
                    # print(response.results)

                    transcript = ". ".join([result.alternatives[0].transcript for result in response.results])
                    print(transcript)

                    context = {
                        'transcript': transcript,
                    }

                    # return context to the template
                    return HttpResponse(json.dumps(context), content_type='application/json')


    return render(request, 'transcribe.html', {"Good": "Good"})



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

    user_qurey_form = plans_filter_form()

    context = {
        'user_qurey_form': user_qurey_form,
    }

    return render(request, 'benefit.html', context)


def home(request):
    return render(request, 'home.html')

def chatbot_new(request):
    return render(request, 'chatbot_new.html')

def chatbot(request):
    return render(request, 'chatbot.html')

def home2(request):
    return render(request, 'home2.html')