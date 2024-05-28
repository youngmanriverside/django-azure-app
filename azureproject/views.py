from django.shortcuts import render
from .forms import plans_filter_form
from employee.models import Employee, employee_current, employee_identity
from plan.models import plan_employee, plan_employee_details
from itertools import chain


def index(request):
    if request.method == 'POST':
        # Get the employee object
        name = request.POST.get('employee')
        employee = Employee.objects.get(name=name)
        employee_current_list = list(employee_current.objects.values_list('current_status', flat=True).filter(employee_name=employee))
        employee_identity_list = list(employee_identity.objects.values_list('identity', flat=True).filter(employee_name=employee))

        # Get the plan_employee object
        # Filter the plan_employee object by current_status list
        plan_employee_current_status_list = plan_employee.objects.filter(required_employee_current__in=employee_current_list)

        # Filter the plan_employee object by identity list

        # Concatenate the plan_employee objects

        # Get the plan_employee_details object
        # Filter the plan_employee_details object by plan_employee object
        all_plan_employee_details_list = plan_employee_details.objects.all()

        context = {
            'employee': employee,
            'employee_current_list': employee_current_list,
            'employee_identity_list': employee_identity_list,
            'plan_employee_current_status_list': plan_employee_current_status_list,
            'all_plan_employee_details_list': all_plan_employee_details_list,
        }

        return render(request, 'index.html', context)

    user_qurey_form = plans_filter_form()

    context = {
        'user_qurey_form': user_qurey_form,
    }

    return render(request, 'index.html', context)