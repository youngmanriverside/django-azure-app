from django.shortcuts import render, redirect
from .forms import plans_filter_form
from employee.models import Employee, employee_current, employee_identity
from employer.models import Employer
from plan.models import plan_employee, plan_employee_details
import requests
import json

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

def chatbot_old(request):
    if request.method == 'POST':
        # get the name of the employee from value of select option
        name = request.POST.get('employee')
        employee_example = Employee.objects.get(name=name)
        employee_current_list = list(employee_current.objects.values_list('current_status', flat=True).filter(employee_name=employee_example))
        employee_identity_list = list(employee_identity.objects.values_list('identity', flat=True).filter(employee_name=employee_example))
        
        employees = Employee.objects.all()

        context = {
            'employees': employees,
            'employee_example': employee_example,
            'employee_current_list': employee_current_list,
            'employee_identity_list': employee_identity_list,
        }
        
        return render(request, 'chatbot.html', context)
    employees = Employee.objects.all()

    context = {
        'employees': employees,
    }
    return render(request, 'chatbot.html', context)

def analysis(request):
    if request.method == 'POST':
        # Send post request to https://wda-gemini-api.azurewebsites.net/video
        # with local video file example-1.mp4
        # Get the response from the API
        # Pass the response to the template
        url = 'https://wda-gemini-api.azurewebsites.net/video'
        files = {'video': open('example-1.mp4', 'rb')}
        response = requests.post(url, files=files)

        # convert response.text to json
        response = json.loads(response.text)


        context = {
            'response': response, # response is a dictionary
        }

        return render(request, 'analysis.html', context)
    return render(request, 'analysis.html')

def home(request):
    return render(request, 'home.html')

def interview(request):
    return render(request, 'interview.html')

def demo(request):
    return render(request, 'demo.html')

def chatbot(request):
    return render(request, 'chatbot.html')