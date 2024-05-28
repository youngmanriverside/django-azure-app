from django.shortcuts import render, HttpResponseRedirect
from .forms import EmployeeForm
from .models import Employee, employee_current, employee_identity

# Create your views here.
def employee(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        age = request.POST.get('age')
        unemployment_duration = request.POST.get('unemployment_duration')

        # Create the Employee object
        employee = Employee.objects.create(name=name, gender=gender, age=age, unemployment_duration=unemployment_duration)
        
        # Create the employee_current object
        current_status_list = request.POST.getlist('current_status')

        for current_status in current_status_list:
            employee_current.objects.create(employee_name=employee, current_status=current_status)

        # Create the employee_identity object
        identity_list = request.POST.getlist('identity')

        for identity in identity_list:
            employee_identity.objects.create(employee_name=employee, identity=identity)


        employee_list = Employee.objects.all()

        context = {
            'employee_list': employee_list,
        }

        return HttpResponseRedirect('applicants')

    form_employee = EmployeeForm()

    context = {
        'form_employee': form_employee,
    }

    return render(request, 'formEmployee.html', context)
    
def applicants(request):
    employee_list = Employee.objects.all()
    employee_current_list = employee_current.objects.all()
    employee_identity_list = employee_identity.objects.all()

    context = {
        'employee_list': employee_list,
        'employee_current_list': employee_current_list,
        'employee_identity_list': employee_identity_list,
    }
    return render(request, 'applicants.html', context)