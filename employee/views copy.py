from django.shortcuts import render, HttpResponseRedirect
from .models import *
from .forms import *

# Create your views here.
def employee(request):
    if request.method == 'POST':
        form_employee = EmployeeForm(request.POST)
        form_identity = IdentityForm(request.POST)
        form_current = CurrentForm(request.POST)
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        age = request.POST.get('age')
        unemployment_duration = request.POST.get('unemployment_duration')
        identity_list = request.POST.getlist('identity')
        current_list = request.POST.getlist('current')

        if form_employee.is_valid():
            form_employee = Employee.objects.create(name=name, gender=gender, age=age, unemployment_duration=unemployment_duration)
            form_employee.save()
            
        if form_identity.is_valid():
            # employee_name = form_employee.cleaned_data['name']
            # identity_list = form_identity.cleaned_data['identity']
            for identity in identity_list:
                # If employee_identity is not 'None' or 'Laidoff' or 'Disaster', then create a new employee_identity object
                if identity != 'None' and identity != 'Laidoff' and identity != 'Disaster' and identity != 'Newimmigrant' and identity != 'Sexuallyabused':
                    employee_identity = Employee_identity.objects.create(employee_name=name, identity='就服法24-1條')
                    employee_identity.save()
                else:
                    employee_identity = Employee_identity.objects.create(employee_name=name, identity=identity)
                    employee_identity.save()
                    
        if form_current.is_valid():
            # employee_name = form_employee.cleaned_data['name']
            # current_list = form_current.cleaned_data['current']
            for current in current_list:
                employee_current = Employee_current.objects.create(employee_name=name, current=current)
                employee_current.save()

        context = {
            'message': "Successfully submitted!"
        }
        return HttpResponseRedirect('applicants')

    form_employee = EmployeeForm()
    form_identity = IdentityForm()
    form_current = CurrentForm()

    context = {
        'form_employee': form_employee,
        'form_identity': form_identity,
        'form_current': form_current,
    }
    return render(request, 'formEmployee.html', context)

def applicants(request):
    applicants_employee = Employee.objects.all()
    applicants_current = Employee_current.objects.all()
    applicants_identity = Employee_identity.objects.all()

    context = {
        'applicants_employee': applicants_employee,
        'applicants_current': applicants_current,
        'applicants_identity': applicants_identity
    }
    return render(request, 'applicants.html', context)