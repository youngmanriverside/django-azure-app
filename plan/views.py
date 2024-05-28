from django.shortcuts import render
from .models import plan_employee

# Create your views here.
def plans(request):
    plans_employee = plan_employee.objects.all()

    context = {
        'plans_employee': plans_employee
    }
    return render(request, 'plans.html', context)