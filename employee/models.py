from django.db import models

# Create your models here.
class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=100)
    age = models.IntegerField()
    education = models.CharField(max_length=100, null=True, blank=True)
    unemployment_duration = models.CharField(max_length=100)
    current_status1 = models.CharField(max_length=100, null=True, blank=True)
    current_status2 = models.CharField(max_length=100, null=True, blank=True)
    current_status3 = models.CharField(max_length=100, null=True, blank=True)
    current_status4 = models.CharField(max_length=100, null=True, blank=True)
    identity1 = models.CharField(max_length=100, null=True, blank=True)
    identity2 = models.CharField(max_length=100, null=True, blank=True)
    identity3 = models.CharField(max_length=100, null=True, blank=True)
    identity4 = models.CharField(max_length=100, null=True, blank=True)
    identity5 = models.CharField(max_length=100, null=True, blank=True)
    identity6 = models.CharField(max_length=100, null=True, blank=True)
    identity7 = models.CharField(max_length=100, null=True, blank=True)
    identity8 = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        unique_together = ('name', 'gender', 'age', 'education', 'unemployment_duration')

    def __str__(self):
        return f'{self.id} {self.name}'
