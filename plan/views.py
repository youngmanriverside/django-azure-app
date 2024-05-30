from django.shortcuts import render
from .models import plan_employee
from employer.models import plan_employer

# Create your views here.
def plans(request):
    plans_employee = plan_employee.objects.all()
    plans_employer = plan_employer.objects.all()

    context = {
        'plans_employee': plans_employee,
        'plans_employer': plans_employer
    }
    return render(request, 'plans.html', context)