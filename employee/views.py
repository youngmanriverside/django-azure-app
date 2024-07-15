from django.shortcuts import render, HttpResponseRedirect
from .forms import EmployeeForm
from .models import Employee, employee_current, employee_identity
from .choices import choices_current

# Create your views here.
def employee(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        current = request.POST.getlist('current_status')
        age = request.POST.get('age')
        education = request.POST.get('education')
        unemployment_duration = request.POST.get('unemployment_duration')

        # # Create the Employee object
        employee = Employee.objects.create(name=name, gender=gender, age=age, education=education, unemployment_duration=unemployment_duration)
        
        # # If age is 45-65, create employee_identity object with '就服法24-1條之對象'
        if int(age) >= 45 and int(age) <= 65:
            employee_identity.objects.create(employee_name=employee, identity='就服法24-1條之對象')
        
        # # Create the employee_current object
        current_status_list = request.POST.getlist('current_status')

        for current_status in current_status_list:
            employee_current.objects.create(employee_name=employee, current_status=current_status)

        # # Create the employee_identity object
        identity_list = request.POST.getlist('identity')
        
        # Check if '就服法24-1條之對象' is in the identity_list
        choices_24_1 = [
            'Lowincome',
            'Disability',
            'Onlyincome',
            'Aboriginal',
            'Longterm',
            'rehabilitation',
            'Abused',
            'Rejoinwomen',
        ]

        for identity in identity_list:
            if identity in choices_24_1:
                try:
                    employee_identity.objects.create(employee_name=employee, identity='就服法24-1條之對象')
                except:
                    continue
            else:
                employee_identity.objects.create(employee_name=employee, identity=identity)

        return HttpResponseRedirect('applicants')

    form_employee = EmployeeForm()

    context = {
        'form_employee': form_employee,
        'choices_current': choices_current,
    }

    return render(request, 'formEmployee.html', context)
    
def applicants(request):
    # Get all the Employee objects
    employee_list = Employee.objects.all()
    employee_current_list = employee_current.objects.all()
    employee_identity_list = employee_identity.objects.all()


    context = {
        'employee_list': employee_list,
        'employee_current_list': employee_current_list,
        'employee_identity_list': employee_identity_list,
    }
    return render(request, 'applicants.html', context)