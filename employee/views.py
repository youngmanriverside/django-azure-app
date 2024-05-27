from django.shortcuts import render
from .forms import EmployeeForm

# Create your views here.
def employee(request):
    if request.method == 'POST':
        form_employee = EmployeeForm(request.POST)
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        age = request.POST.get('age')
        unemployement_duration = request.POST.get('unemployement_duration')
        current_status = request.POST.getlist('current_status')
        identity = request.POST.getlist('identity')

        print(name)
        print(current_status)


    else:
        form_employee = EmployeeForm()

        context = {
            'form_employee': form_employee,
        }

        return render(request, 'formEmployee.html', context)