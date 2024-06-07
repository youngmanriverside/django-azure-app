from rest_framework import routers
from employee.viewsets import EmployeeViewSet

router = routers.DefaultRouter()
router.register('employee', EmployeeViewSet)