from django.db import models

# Create your models here.
class Employer(models.Model):
    name = models.CharField(max_length=100, db_column='單位名稱')
    organization = models.CharField(max_length=100, db_column='單位類型')
    employment_insurance = models.CharField(max_length=100, db_column='是否為就保單位')
    subsidy_requirement = models.CharField(max_length=100, null=True, blank=True, db_column='補助需求項目')
