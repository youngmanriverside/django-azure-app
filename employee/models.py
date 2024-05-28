from django.db import models

# Create your models here.
class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=100)
    age = models.IntegerField()
    education = models.CharField(max_length=100, null=True, blank=True)
    unemployment_duration = models.CharField(max_length=100)

    class Meta:
        unique_together = ('name', 'gender', 'age', 'education', 'unemployment_duration')

    def __str__(self):
        return f'{self.id} {self.name}'
    

class employee_current(models.Model):
    employee_name = models.ForeignKey(Employee, on_delete=models.CASCADE)
    current_status = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'{self.employee_name} {self.current_status}'

class employee_identity(models.Model):
    employee_name = models.ForeignKey(Employee, on_delete=models.CASCADE)
    identity = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'{self.employee_name} {self.identity}'