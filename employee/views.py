from django.shortcuts import render
from .forms import EmployeeForm

# Create your views here.
def employee(request):

    form_employee = EmployeeForm()

    context = {
        'form_employee': form_employee,
    }

    return render(request, 'formEmployee.html', context)