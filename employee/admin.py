from django.contrib import admin
from .models import Employee, employee_current, employee_identity

# Register your models here.
admin.site.register(Employee)
admin.site.register(employee_current)
admin.site.register(employee_identity)