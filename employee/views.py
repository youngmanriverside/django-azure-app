from django.shortcuts import render, HttpResponseRedirect
from .forms import EmployeeForm
from .models import Employee

# Create your views here.
def employee(request):
    if request.method == 'POST':
        form_employee = EmployeeForm(request.POST)
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        age = request.POST.get('age')
        unemployment_duration = request.POST.get('unemployment_duration')
        current_status = request.POST.getlist('current_status')
        identity = request.POST.getlist('identity')

        N_current_status = 4
        current_status += [''] * (N_current_status - len(current_status))
        current_status1, current_status2, current_status3, current_status4 = [current_status[i] for i in range(len(current_status))]

        N_identity = 8
        identity += [''] * (N_identity - len(identity))
        identity1, identity2, identity3, identity4, identity5, identity6, identity7, identity8 = [identity[i] for i in range(len(identity))]

        Employee.objects.create(
            name=name,
            gender=gender,
            age=age,
            unemployment_duration=unemployment_duration,
            current_status1=current_status1,
            current_status2=current_status2,
            current_status3=current_status3,
            current_status4=current_status4,
            identity1=identity1,
            identity2=identity2,
            identity3=identity3,
            identity4=identity4,
            identity5=identity5,
            identity6=identity6,
            identity7=identity7,
            identity8=identity8,
        )

        employee_list = Employee.objects.all()

        context = {
            'employee_list': employee_list,
        }

        return HttpResponseRedirect('applicants')

    else:
        form_employee = EmployeeForm()

        context = {
            'form_employee': form_employee,
        }

        return render(request, 'formEmployee.html', context)
    
def applicants(request):
    applicants_employee = Employee.objects.all()

    context = {
        'applicants_employee': applicants_employee,
    }
    return render(request, 'applicants.html', context)