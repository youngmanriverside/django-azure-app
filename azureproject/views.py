from django.shortcuts import render
from .forms import plans_filter_form
from employee.models import Employee


def index(request):
    # Qurey all available employees
    employee_list = Employee.objects.all().values_list('id', 'name')

    # Create a form for user to select employee
    form = plans_filter_form(request.POST)
    if form.is_valid():
        # Get the employee object
        employee = Employee.objects.get(id=form.cleaned_data['employee'])


    user_qurey_form = plans_filter_form()

    context = {
        'user_qurey_form': user_qurey_form,
    }

    return render(request, 'index.html', context)