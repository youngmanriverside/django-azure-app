from django.db import models

# Create your models here.
class Employer(models.Model):
    name = models.CharField(max_length=100)
    employment_insurance = models.BooleanField(default=True)
    temp_agency = models.BooleanField(default=False)
