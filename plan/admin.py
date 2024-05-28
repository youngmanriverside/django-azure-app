from django.contrib import admin
from .models import plan_employee, plan_employee_details

# Register your models here.
admin.site.register(plan_employee)
admin.site.register(plan_employee_details)